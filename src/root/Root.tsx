import { FlowProps, Show, createSignal, onMount } from "solid-js";
import { effect } from "solid-js/web";
import { useRegisterSW } from "virtual:pwa-register/solid";
import BottomBar from "../components/BottomBar";
import NavBar from "../components/NavBar";
import { auth } from "../firebase/auth";
import { path } from "../router/MyRouter";
import { isInStandaloneMode } from "../utils/pwaUtils";
import ToastList from "./ToastList";
import { Dialog } from "./Dialog";

export type Action = {
    title: string,
    action: () => void
}

export let dialog: HTMLDialogElement | undefined;

export type Toast = {
    type: "success" | "prompt"
    title: string,
    description: string,
    action1?: Action,
    action2?: Action
}

export type ToastWrapper = {
    toast: Toast,
    id: number
}

export const [toasts, setToastsList] = createSignal<ToastWrapper[]>([]);

export function showToast(toast: Toast, options?: { time?: number }) {
    let { time = 2000 } = (options || {});
    let wrapper: ToastWrapper = { toast: toast, id: Math.random() }
    console.log(`time: ${time}`)
    setToastsList((list) => [...list, wrapper]);
    setTimeout(() => {
        console.log("remove")
        document.startViewTransition(() => {
            setToastsList((toast) => toast.filter((t) => t.id !== wrapper.id));
        })
    }, time);
}

export default function Nav(props: FlowProps) {
    function transformLocation(location: string) {
        if (location === "/") {
            return "/intencje";
        } else {
            return location;
        }
    }
    const [isLogged, setIsLogged] = createSignal(auth.currentUser !== null);
    const [selected, setSelected] = createSignal(transformLocation(location.pathname));

    const {
        //@ts-ignore
        offlineReady: [offlineReady, setOfflineReady], needRefresh: [needRefresh, setNeedRefresh], updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log("registered", r);
        },
        onRegisterError(e) {
            console.log("register error", e);
        },
    });

    effect(() => {
        setSelected(transformLocation(path()));
    })
    onMount(() => {
        
        showToast({
            type: "success",
            title: "Witaj!",
            description: "Witaj na stronie modlitwy wstawienniczej. Znajdziesz tutaj wszystkie potrzebne informacje."
        },
            { time: 9000 })
        showToast({
            type: "prompt",
            title: "Uwaga!",
            description: "Strona jest w fazie testów, więc mogą wystąpić błędy. Jeśli tak się stanie, prosimy o zgłoszenie tego faktu do organizatorów.",
            action1: {
                title: "Zgłoś błąd",
                action: () => {
                    window.open("google.com");
                }
            },
            action2: {
                title: "Zamknij",
                action: () => {
                    console.log("zamknij")
                }
            }
        },
            { time: 5000 })
        auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }
        }
        )
        var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')!;
        var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')!;

        // Change the icons inside the button based on previous settings
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            themeToggleLightIcon.classList.remove('hidden');
        } else {
            themeToggleDarkIcon.classList.remove('hidden');
        }

        var themeToggleBtn = document.getElementById('theme-toggle')!;

        function setTheme() {
            // toggle icons inside button
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');

            // if set via local storage previously
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }

                // if NOT set via local storage previously
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
        }

        themeToggleBtn.addEventListener('click', function () {
            if (!document.startViewTransition) {
                setTheme();
                return true;
            }


            // With a transition:
            document.startViewTransition(() => setTheme());
            return true;
        });
    })


    return (
        <>
            <Dialog />
            <NavBar isLogged={isLogged} selected={selected} />
            <div class={`flex gap-3 box-border py-3 px-4 flex-col toast-list-transition items-end fixed z-[55] w-full sm:w-auto start-1/2 sm:start-0 -translate-x-1/2 sm:translate-x-0 sm:end-0 ${isInStandaloneMode() ? "bottom-16 " : "bottom-0"}`}>
                <ToastList toasts={toasts} />
            </div>
            {props.children}
            <Show when={isInStandaloneMode()}>
                <BottomBar />
            </Show>
        </>


    )

}