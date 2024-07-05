import { Component, FlowProps, Show, Signal, createSignal, onCleanup, onMount } from "solid-js";
import Scroller from "../components/Scroller";
import { createStore } from "solid-js/store";
import { refs } from "../root/Refs";

type PathDivRef = { [a: string]: (HTMLDivElement | undefined) }

function parseStringToQuery(queryString: string) {
    let query: { [key: string]: string } = {};
    let pairs = (queryString[0] === '?'
        ? queryString.substr(1)
        : queryString
    ).split('&');
    for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

function parseQueryToString(query: { [key: string]: string }) {
    let search = new URLSearchParams(query).toString();
    return search;
}

export const [path, setPath] = createSignal(window.location.pathname);
const queryParams = createStore<{ [key: string]: string }>(parseStringToQuery(window.location.search));
export const [query] = queryParams;

export function setQueryParams(callback: (oldState: { [key: string]: string }) => { [key: string]: string | undefined }, options?: { notPush?: boolean }) {
    let newState = callback(query) as { [key: string]: string };
    let newStateCopy = { ...newState };
    Object.keys(newStateCopy).forEach(key => !newStateCopy[key] ? delete newStateCopy[key] : {});
    let search = parseQueryToString(newStateCopy);
    if(!options?.notPush) window.history.pushState({ setSearchParams: true }, '', `${window.location.pathname}?${search}`);
    let setQueryParams2 = queryParams[1]
    setQueryParams2(newState)
}

const [paths, setPaths] = createSignal<string[]>([]);
export const pathDivRef: PathDivRef = {};
const transitionObject: { [path: string]: string | null } = {};
const scrollerObject: { [path: string]: Signal<number> } = {};
const [transitionHappened, setTransitionHappened] = createSignal(false);

export function navigate(newPath: string, options?: { notPush?: boolean, query?: { [key: string]: string } }) {
    let queryString = parseQueryToString(options?.query ?? {});
    if (!(newPath === path())) {
        pathDivRef[path()]?.style.setProperty("view-transition-name", transitionObject[path()]);
    }
    setTransitionHappened(true);

    // Fallback for browsers that don't support this API:
    if (!document.startViewTransition || newPath === path()) {
        if (!options?.notPush) window.history.pushState({}, '', `${newPath}?${queryString}`);
        setPath(newPath);
        setQueryParams((state) => {
            let newState : { [key: string]: string | undefined } = {} ;
            for(let key of Object.keys(state)){
                newState[key] = undefined;
            }
            newState = {...newState, ...options?.query};
            return newState as { [key: string]: string };
        }, {notPush: true});
        return;
    }



    // With a transition:
    refs.NavRef?.style.setProperty("view-transition-name", "none");
    const transition = document.startViewTransition(async () => {
        if (!options?.notPush) window.history.pushState({}, '', `${newPath}?${queryString}`);
        setPath(newPath);
        setQueryParams((state) => {
            let newState : { [key: string]: string | undefined } = {} ;
            for(let key of Object.keys(state)){
                newState[key] = undefined;
            }
            newState = {...newState, ...options?.query};
            return newState as { [key: string]: string };
        }, {notPush: true});
    });

    transition.finished.then(() => {
        pathDivRef[path()]?.style.setProperty("view-transition-name", null);
        refs.NavRef?.style.setProperty("view-transition-name", null);
    })
}



const handleNav = (event: NavigateEvent) => {
    if (!event.destination.sameDocument) return;
    if (event.navigationType === 'push') {
        return;
    }
    let url = new URL(event.destination.url);
    let queryString = parseStringToQuery(url.search);
    event.intercept({
        async handler() {
            if (event.navigationType === "traverse") {
                event.stopPropagation();
                console.log("traverse")
                console.log(url.pathname)
                navigate(url.pathname, { notPush: true, query: queryString });
            } else {
                console.log("popstate")
                console.log(url.pathname)
                navigate(url.pathname, { query: queryString });
            }
        }
    })
}



export function Router(props: FlowProps<{ root: Component<FlowProps>, error?: Component }>) {
    function handleWhen() {
        return !paths().includes(path());
    }

    onMount(() => {
        if (window.navigation) {
            window.navigation.addEventListener('navigate', handleNav);
        }
    })

    onCleanup(() => {
        if (window.navigation) {
            window.navigation.removeEventListener('navigate', handleNav);
        }
    })

    return (
        <>
            <props.root>
                {props.children}
            </props.root>
            <Show when={handleWhen()}>
                {props.error ? <props.error /> : <div>404</div>}
            </Show>
        </>
    )
}

type RouteProps = { path: string | string[], component: Component, transitionType?: string }

export function Route(props: RouteProps) {

    function handleWhen() {
        if (typeof props.path === "string") {
            return props.path === path();
        } else {
            return props.path.includes(path());
        }
    }

    onMount(() => {
        let pathsFlatten: string[] = []
        if (typeof props.path === "string") {
            pathsFlatten.push(props.path);
        } else {
            pathsFlatten.push(...props.path);
        }
        setPaths((paths2) => [...paths2, ...pathsFlatten]);
    })


    return (
        <Show when={handleWhen()}>
            <RefSetter {...props} />
        </Show>
    )
}

function RefSetter({ path, transitionType, component: Component }: RouteProps) {
    let ref: HTMLDivElement | undefined;
    let signal = createSignal(window.scrollY);
    let currentSignal: Signal<number>;

    if (typeof path === "string") {
        transitionObject[path] = transitionType ?? null;
        if (!scrollerObject[path]) {
            scrollerObject[path] = signal;
        }
        currentSignal = scrollerObject[path];
    } else {
        path.forEach(p => {
            transitionObject[p] = transitionType ?? null;
            if (!scrollerObject[p]) {
                scrollerObject[p] = signal;
            }
        })
        currentSignal = scrollerObject[path[0]];
    }

    onMount(() => {
        if (ref) {
            if (typeof path === "string") {
                pathDivRef[path] = ref;
            } else {
                path.forEach(p => {
                    pathDivRef[p] = ref;
                })
            }
        }
    })

    return (
        <div ref={ref} style={{ "view-transition-name": transitionHappened() ? transitionType : undefined }}>
            <Scroller signal={currentSignal}>
                <Component />
            </Scroller>
        </div>
    )
}