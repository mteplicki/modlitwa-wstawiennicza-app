import { Match, Show, Suspense, Switch } from "solid-js";
import { auth, currentUser, isAuthorized } from "../firebase/auth";
import DialogFallback from "./DialogFallback";
import noProfileIcon from "../assets/noProfileIcon.png";

export default function LoggedIn() {

    return <>
        <div class="rounded-lg box-border dark:bg-gray-600 shadow-2xl p-3">
            <div class="grid place-items-center box-border  grid-cols-1 sm:grid-cols-2 items-center justify-center">
                <div class="py-0  sm:py-5">
                    <div >
                        <Switch>
                            <Match when={currentUser()?.photoURL}>
                                <img class="rounded-full shadow-2xl min-w-28 max-w-40 mb-5 sm:my-0 sm:mx-5 aspect-square" referrerpolicy="no-referrer" src={currentUser()?.photoURL! + "?key=" + new Date().getTime()} alt="Zdjęcie profilowe" />
                            </Match>
                            <Match when={!currentUser()?.photoURL}>
                                <img class="rounded-full shadow-2xl min-w-28 max-w-40 mb-5 sm:my-0 sm:mx-5 aspect-square" src={noProfileIcon} alt="Zdjęcie profilowe" />
                            </Match>
                        </Switch>
                    </div>
                </div>
                <div class="mb-5 sm:mb-0 sm:h-full flex flex-col items-center justify-center gap-3 pt-5 border-t-2 border-gray-500 w-full sm:pt-0 sm:ps-3 sm:border-t-0 sm:border-s-2">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Zalogowany jako:</h2>
                    <Show when={currentUser()?.displayName}>
                        <div class="text-xl font-semibold text-tertiary">{currentUser()?.displayName}</div>
                    </Show>
                    <div class="text-lg -m-2 font-semibold text-primary-dark dark:text-secondary">{currentUser()?.email}</div>
                </div>
            </div>
            <Suspense fallback={<DialogFallback />}>
                <Switch>
                    <Match when={!isAuthorized()}>
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
                    </Match>
                    <Match when={isAuthorized()}>
                        <div class="flex items-center p-4 mt-5 mb-3 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-green-400 dark:border-green-800" role="alert">
                            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span class="sr-only">Info</span>
                            <div>
                                <span class="font-medium">Użytkownik potwierdzony.</span> Możesz sprawdzać, jakie intencje zostały Ci przydzielone.
                            </div>
                        </div>
                    </Match>


                </Switch>
            </Suspense>


        </div>

        <button onclick={() => { auth.signOut(); }} type="button" class="text-white transition-all bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Wyloguj się</button>
    </>
}