import { navigate } from "./MyRouter";
import { FlowProps, createSignal, onMount } from "solid-js";
import { effect } from "solid-js/web";
import { auth } from "../firebase/auth";
import { path } from "./MyRouter";
import BottomBar from "./BottomBar"

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
    effect(() => {
        setSelected(transformLocation(path()));
    })
    onMount(() => {
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
            <header class="sticky top-0 z-50 flex flex-wrap md:justify-start md:flex-nowrap w-full bg-primary text-md py-4 dark:bg-blue-900">
                <nav class="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between" aria-label="Global">
                    <a class="italic md:order-1 flex-none text-xl sm:text-2xl font-semibold text-white text-wrap grow basis-0 cursor-pointer comfortaa-400" onclick={() => navigate("/")}>Modlitwa <span class="text-tertiary">wstawiennicza</span></a>
                    <div class="md:order-3 flex justify-end gap-x-2 grow basis-0">
                        <button type="button" class="transition-all md:hidden hs-collapse-toggle p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10" data-hs-collapse="#navbar-alignment" aria-controls="navbar-alignment" aria-label="Toggle navigation">
                            <svg class="transition hs-collapse-open:hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                            <svg class="transition hs-collapse-open:block hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                        <button type="button" class="transition-all p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10">
                            {isLogged() ? "Wyloguj" : "Zaloguj"}
                        </button>
                        <button title="Tryb jasny/ciemny" id="theme-toggle" type="button" class="transition-all p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-transparent text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10">
                            <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                            <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div id="navbar-alignment" class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:grow-0 md:basis-auto md:block md:order-2 md:mx-5">
                        <div class="flex flex-col gap-5 mt-5 md:flex-row md:items-center md:mt-0 md:ps-0">
                            <button type="button" class={`${selected() === "/intencje" ? "text-tertiary" : "text-white"} transition font-medium hover:text-lime-600 cursor-pointer`} onclick={()=>navigate("/intencje")}>Wyślij intencje</button>
                            <button type="button" class={`${selected() === "/uczestnicy" ? "text-tertiary" : "text-white"} transition font-medium  hover:text-lime-600 cursor-pointer`} onclick={()=>navigate("/uczestnicy")}>Panel uczestnika</button>
                        </div>
                    </div>
                </nav>
            </header>
            {props.children}
            <BottomBar />
        </>


    )

}