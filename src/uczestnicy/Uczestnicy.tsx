import { FlowProps } from "solid-js/types/server/rendering.js";
import Tabela from "./Tabela";
import { Match, Suspense, Switch, createEffect, createSignal } from "solid-js";
import { prepareData, data, isLoaded } from "../firebase/intentions";
import DialogFallback from "../root/DialogFallback";
import { isAuthorizedFunc, isLogged, isReady } from "../firebase/auth";
import HeaderFallback from "./HeaderFallback";

const ElementWrapper = (props: FlowProps<{ relative?: boolean }>) => <div classList={{ "relative": props.relative }} class="mx-auto min-w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl px-2 sm:px-0 py-4 sm:min-w-96">{props.children}</div>

type Element = "table" | "notLogged" | "error";

let loadingRef: HTMLDivElement | undefined;

const [showLoading, setShowLoading] = createSignal(true);
const [showElement, setShowElement] = createSignal<Element>("table");

export default function Uczestnicy() {


    createEffect(async () => {
        if (!isReady()) {
            setShowLoading(true)
        } else {
            if (isLogged()) {
                let isAuthorized = await isAuthorizedFunc()
                if (isAuthorized) {
                    setShowElement("table")
                } else {
                    setShowElement("error")
                }
            } else {
                setShowElement("notLogged")
            }
            await isLoaded
            if (showLoading()) {
                await loadingRef?.animate([
                    { "opacity": "1" },
                    { "opacity": "0" }
                ], 150).finished
                setShowLoading(false)
            }
        }
    })

    return <div class="min-h-screen">
        <div classList={{ "hidden": !showLoading() }} ref={loadingRef} class="fixed flex w-full flex-col justify-center items-center h-full  bg-gray-50 dark:bg-gray-900 z-[45]">
            <DialogFallback notMinHeight />
        </div>
        <div>
            <Switch>
                <Match when={showElement() === "table"}>
                    <ElementWrapper relative>
                            <Suspense fallback={<HeaderFallback />}>
                                <h2 class="text-2xl sm:text-3xl font-extrabold dark:text-white px-4 text-center">Oto Twoje intencje na następujący tydzień: <br /> <span class="text-tertiary">{prepareData(data()).date[0]} - {prepareData(data()).date[1]}</span></h2>
                            </Suspense>
                    </ElementWrapper>

                    <ElementWrapper>
                        <Tabela />
                    </ElementWrapper>
                </Match>

                <Match when={showElement() === "notLogged"}>
                    <ElementWrapper>
                        <div class="px-4">
                            <div class="flex items-center p-4 mt-5 mb-3 text-sm text-blue-800 border border-blue-300 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-blue-400 dark:border-blue-800" role="alert">
                                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span class="sr-only">Info</span>
                                <div>
                                    <span class="font-medium">Nie jesteś zalogowany.</span> Zaloguj się żeby sprawdzać, jakie intencje zostały Ci przydzielone.
                                </div>
                            </div>
                        </div>
                    </ElementWrapper>
                </Match>

                <Match when={showElement() === "error"}>
                    <ElementWrapper>
                        <div class="px-4">
                            <div id="alert-additional-content-2" class="p-4 mt-5 mb-3 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400 dark:border-red-800" role="alert">
                                <div class="flex items-center">
                                    <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span class="sr-only">Info</span>
                                    <h3 class="text-lg font-medium">Niezarejestrowany jako omadlający!</h3>
                                </div>
                                <div class="mt-2 mb-4 text-sm">
                                    W systemie modlitwy wstawienniczej nie figurujesz jako osoba omadlająca. Jeśli uważasz, że to błąd, skontaktuj się z podprzęsłowym odpowiadającym za modlitwę wstawienniczą.
                                </div>
                                <div class="flex">
                                    <button onclick={() => window.location.assign("https://most.salezjanie.pl/konstrukcja/")} type="button" class="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                        <svg class="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                        </svg>
                                        Konstrukcja MOSTu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ElementWrapper>
                </Match>
            </Switch>

        </div>


        <ElementWrapper>
            <div class="m-4 h-0.5 dark:bg-gray-800 bg-gray-200" />
        </ElementWrapper>

        <ElementWrapper>
            <h5 class="text-xl font-bold dark:text-white px-4">Ustawienia aplikacji</h5>
        </ElementWrapper>
    </div>
}