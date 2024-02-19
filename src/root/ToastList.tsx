import { For, Match, Switch, VoidProps, Show, Accessor } from "solid-js"
import { ToastWrapper } from "./toasts"
import { isInStandaloneMode } from "../utils/pwaUtils"

export function PromptToast({ wrapper }: VoidProps<{ wrapper: ToastWrapper }>) {
    const { toast } = wrapper
    return (
        <div ref={(ref)=>{wrapper.resolveFunc(ref)}} class="w-full overflow-y-hidden z-50 sm:w-96 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700" role="alert">
            <div class="flex p-4">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-gray-600 mt-1 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                </div>
                <div class="ms-4">
                    <h3 class="text-gray-800 font-semibold dark:text-white">
                        {toast.title}
                    </h3>
                    <div class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {toast.description}
                    </div>
                    <div class="mt-4">
                        <div class="flex space-x-3">
                            <Show when={toast.action1}>
                                <button onclick={toast.action1?.action} type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:text-blue-800 dark:text-blue-500 dark:focus:text-blue-400">
                                    {toast.action1?.title}
                                </button>
                            </Show>
                            <Show when={toast.action2}>
                                <button onclick={toast.action2?.action} type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:text-blue-800 dark:text-blue-500 dark:focus:text-blue-400">
                                    {toast.action2?.title}
                                </button>
                            </Show>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function SuccessToast({ wrapper }: VoidProps<{ wrapper: ToastWrapper }>) {
    const { toast } = wrapper
    return (
        <div ref={(ref)=>{wrapper.resolveFunc(ref)}}  class="z-50 w-full sm:w-96 overflow-y-hidden bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700" role="alert">
            <div class="flex p-4">
                <div class="flex-shrink-0">
                    <svg class="flex-shrink-0 h-4 w-4 text-teal-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                </div>
                <div class="ms-3">
                    <p class="text-sm text-gray-700 dark:text-gray-400">
                        {toast.title}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function Toast({ toasts }: VoidProps<{ toasts: Accessor<ToastWrapper[]> }>) {
    return (
        <div class={`z-[55] flex float-right h-fit gap-3 box-border my-3 px-4 sm:px-0 sm:mx-4 flex-col toast-list-transition items-end min-w-full sm:w-fit sm:min-w-0 fixed start-1/2 sm:start-auto -translate-x-1/2 sm:translate-x-0 bottom-0 sm:end-0 ${isInStandaloneMode() ? "bottom-16 " : "bottom-0"}`}>
            <For each={toasts()}>
                {(item) =>
                    <Switch >
                        <Match when={item.toast.type === "success"}>
                            <SuccessToast wrapper={item} />
                        </Match>
                        <Match when={item.toast.type === "prompt"}>
                            <PromptToast wrapper={item} />
                        </Match>
                    </Switch>
                }
            </For>
        </div>
    )
}