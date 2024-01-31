import "./Dialog.module.css"

import { query, setQueryParams } from "../router/MyRouter";
import { effect } from "solid-js/web";
import { onMount } from "solid-js";

export function Dialog() {
    let dialog: HTMLDialogElement | undefined;
    onMount(() => {
        if(query.dialog){
            if(document.startViewTransition){
                document.startViewTransition(() => {
                    dialog?.showModal();
                })
            } else {
                dialog?.showModal();
            }
        }
        window.addEventListener("keydown", (e) => {
            console.log(e)
            e.preventDefault(); 
            if(e.key === "Escape"){
                setQueryParams(((oldState) => {return {...oldState, ...{dialog:undefined}}}));
            }
        })
    })

    effect(() => {
        console.log(query.dialog)
        if(query.dialog){
            if(document.startViewTransition){
                document.startViewTransition(() => {
                    dialog?.showModal();
                })
            } else {
            
                dialog?.showModal();
            }
        }
        else {
            if(document.startViewTransition){
                document.startViewTransition(() => {
                    dialog?.close();
                })
            } else {
            
                dialog?.close();
            }
        }
    })

    return <dialog ref={dialog} id="test" class="box-border transition-all bg-transparent sm:my-auto px-2 py-4 sm:p-0 h-full sm:h-auto sm:max-h-fit sm:px-6 w-full sm:w-auto">
        <div class="mx-auto bg-white shadow dark:bg-gray-700 rounded-lg relative w-full sm:max-w-xl sm:min-w-96 py-auto sm:max-h-full h-full sm:h-auto">
            <div class="relative bg-white rounded-lg  dark:bg-gray-700 h-full sm:h-auto">
                <div class="flex items-center justify-between p-4 py-auto md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Sign in to our platform
                    </h3>
                    <button onclick={()=>setQueryParams(((oldState) => {return {...oldState, ...{dialog:undefined}}}))} type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-4 my-auto md:p-5">
                    <form class="space-y-4" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div class="flex justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                            <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                        </div>
                        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </dialog>;
}
