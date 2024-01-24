import { Component, FlowProps, Show, createSignal, onCleanup, onMount } from "solid-js";

type PathDivRef = { [a: string]: (HTMLDivElement | undefined) }

export const [path, setPath] = createSignal(window.location.pathname);
const [paths, setPaths] = createSignal<string[]>([]);
const pathDivRef: PathDivRef = {};

export function navigate(path: string, options?: { notPush?: boolean, setTransitionType?: string}) {
    // Fallback for browsers that don't support this API:
    if (!document.startViewTransition) {
        if (!options?.notPush) window.history.pushState({}, '', path);
        setPath(path);
        return;
    }

    if (options?.setTransitionType) {
        for (const [, value] of Object.entries(pathDivRef)) {
            if (value) {
                value.style.setProperty('view-transition-name', options.setTransitionType);
            }
        }
    } else {
        for (const [, value] of Object.entries(pathDivRef)) {
            if (value) {
                value.style.removeProperty('view-transition-name');
            }
        }
    }

    // With a transition:
    document.startViewTransition(async () => {
        if (!options?.notPush) window.history.pushState({}, '', path);
        
        setPath(path);
    });

}



const handleNav = (event: NavigateEvent) => {
    if (!event.destination.sameDocument) return;
    if (event.navigationType === 'push') {
        return;
    }
    let url = new URL(event.destination.url);
    // console.log(event)
    event.intercept({
        async handler() {
            if (event.navigationType === "traverse") {
                event.stopPropagation();
                navigate(url.pathname, { notPush: true });
            } else {
                navigate(url.pathname);
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

export function Route(props: { path: string | string[], component: Component }) {
    let ref: HTMLDivElement | undefined;
    if (typeof props.path === "string") {
        pathDivRef[props.path] = ref;
    } else {
        props.path.forEach(p => {
            pathDivRef[p] = ref;
        })
    }
    
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
            <div ref={ref}>
                <props.component />
            </div>
        </Show>
    )
}