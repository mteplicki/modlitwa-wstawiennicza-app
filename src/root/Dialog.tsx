import 'firebaseui/dist/firebaseui.css';
import styles from "./Dialog.module.css";

import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { createEffect, onMount } from "solid-js";
import { auth, isLogged, isLoggedResource } from "../firebase/auth";
import { navigate, query, setQueryParams } from "../router/MyRouter";

import * as firebaseui from 'firebaseui';
import LoggedIn from './LoggedIn';
import DialogFallback from './DialogFallback';

const firebaseUISetting : firebaseui.auth.Config = {
    signInOptions: [
        {
            provider: EmailAuthProvider.PROVIDER_ID,
            signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
            emailLinkSignIn() {
                return {
                    url: 'https://modlitwa-wstawiennicza-23992.web.app/uczestnicy',
                }
            }

        },
        GoogleAuthProvider.PROVIDER_ID,
    ],
    signInFlow: 'popup',
    callbacks: {
        //@ts-ignore
        signInSuccessWithAuthResult: (authResult) => {
            navigate("/uczestnicy", { query: { dialog: "true" } })
            return false;
        }
    }
}

export function Dialog() {
    let dialog: HTMLDialogElement | undefined;
    let flex: HTMLDivElement | undefined;
    let box: HTMLDivElement | undefined;
    let fallbackRef : HTMLDivElement | undefined;
    const ui = new firebaseui.auth.AuthUI(auth)
    
    let observer = new ResizeObserver(()=>{if (!window.matchMedia("min-width: 640px")) { box!.style.maxHeight = box?.scrollHeight + "px"} else {box!.style.maxHeight = "none"}})

    function onClick(event: MouseEvent) {
        if (event.target === flex) {
            closeDialog();
        }
    }

    onMount(async () => {
        dialog?.addEventListener("click", onClick);
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                setQueryParams(((oldState) => { return { ...oldState, ...{ dialog: undefined } } }));
            }
        })

        ui.start("#firebaseui-auth-container", firebaseUISetting)
        await auth.authStateReady()
        const animation = fallbackRef?.animate([
            {"opacity" : "1"},
            {"opacity" : "0"}
        ], 150)
        await animation?.finished
        fallbackRef?.classList.add("hidden")
    })

    createEffect(() => {
        if (!isLogged()) {
            ui.reset();
            ui.start("#firebaseui-auth-container", firebaseUISetting)
        }
    })

    createEffect(() => {
        if (query.dialog) {
            observer.observe(box!)
            dialog?.showModal();
            box?.animate([
                { "opacity": "0", "transform": "translate(0, 50px)" },
                { "opacity": "1", "transform": "translate(0, 0)" }
            ],
                150)
        } else if (dialog?.open) {
            observer.unobserve(box!)
            let animation1 = dialog?.animate([
                { "background-color": "rgba(0, 0, 0, 0.4);", opacity: "1" },
                { "background-color": "rgba(0, 0, 0, 0.0);", opacity: "0" }
            ],
                150)
            let animation2 = box?.animate([
                { "transform": "translate(0, 0)" },
                { "transform": "translate(0, -50px)" }
            ],
                150)
            Promise.all([animation1.finished, animation2?.finished]).then(() => { dialog?.close() })
        }
    })

    const closeDialog = () => {
        setQueryParams(((oldState) => { return { ...oldState, ...{ dialog: undefined } } }))
    }

    return <dialog ref={dialog} classList={{ [styles.mydialog]: true }} id="test" class="transition-all overflow-y-hidden p-3 sm:p-0 ">
        <div ref={flex} class="flex flex-col items-center justify-center h-full">
            <div ref={box} class="mx-auto overflow-hidden transition-all sm:w-fit bg-white my-auto shadow dark:bg-gray-700 rounded-lg relative w-full sm:max-w-xl sm:min-w-[35rem] py-auto sm:max-h-full h-full sm:h-auto">
                <div ref={fallbackRef} class="w-full h-full z-[56] bg-white dark:bg-gray-700 absolute">
                    <DialogFallback/>
                </div>
                <div class="">
                    <div class="relative bg-white rounded-lg  dark:bg-gray-700 h-full sm:h-auto">
                        <div class="flex items-center justify-between p-4 py-auto md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                {isLoggedResource() ? "Zarządzaj kontem" : "Zaloguj się do aplikacji"}
                            </h3>
                            <button onclick={closeDialog} type="button" class="end-2.5 transition-all text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="p-4 my-auto md:p-5">
                            <div id="firebaseui-auth-container" classList={{ "hidden": isLoggedResource() }}></div>
                            <div class="text-center gap-4 flex flex-col" classList={{ "hidden": !isLoggedResource() }}>
                                <LoggedIn />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </dialog>;
}
