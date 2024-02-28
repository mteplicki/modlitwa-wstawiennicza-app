import { For, Show, Suspense, createEffect, createSignal } from "solid-js";
import TabelaFallback from "./TabelaFallback";
import { isLogged } from "../firebase/auth";
import styles from "./Tabela.module.css";
import {data, prepareData, refetch} from "../firebase/intentions";

const [scrollHeight, setScrollHeight] = createSignal(100000);

export type Intencja = {
    imie: string,
    intencja: string
}

let ref: HTMLTableElement | undefined;
let ref2: HTMLDivElement | undefined;
let [fallbackHeight, setFallbackHeight] = createSignal(10);

export function refresh() {
    const newspaperTiming = {
        duration: 150,
        iterations: 1,
    };
    const test = [{ "height": `${scrollHeight()}px`, opacity: 1 }, { "height": `${fallbackHeight()}px`, opacity: 0.2 }]
    let animation = ref2?.animate(test, newspaperTiming)
    animation!.onfinish = () => refetch();
}

export default function Tabela() {



    let resizeObserver = new ResizeObserver(() => { setScrollHeight(ref!.scrollHeight) });

    let [mounted, setMounted] = createSignal(false);

    createEffect(() => {
        if (isLogged()) {
            resizeObserver.observe(ref!);
        } else {
            resizeObserver?.disconnect();
        }
    })

    return <Show when={isLogged()}>
        <div class="flex flex-col px-4">
            <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle">
                    <div ref={ref2} style={{ "max-height": `${scrollHeight()}px` }} class={`border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900`} classList={{ "transition-max-h": mounted(), "transition-none": !mounted() }}>
                        <table ref={(newRef) => { ref = newRef; setScrollHeight(ref!.scrollHeight); setTimeout(() => setMounted(true), 40); }} class="min-w-full transition-all duration-300 divide-y divide-gray-200 dark:divide-gray-700">
                            <Suspense fallback={<TabelaFallback setFallbackHeight={setFallbackHeight} parentRef={ref} />}>
                                <thead class={`bg-gray-50 dark:bg-gray-700 ${styles.animate}`}>
                                    <tr>
                                        <th scope="col" class="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center text-sm font-medium text-gray-500 uppercase dark:text-gray-400">Imię</th>
                                        <th scope="col" class="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-start text-sm font-medium text-gray-500 uppercase dark:text-gray-400">Intencja</th>
                                        <th scope="col" class="w-[65.57px] px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                                            <button onClick={refresh} type="button" class="text-blue-700 border m-0 transition-all  border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.7 7.7A7.1 7.1 0 0 0 5 10.8M18 4v4h-4m-7.7 8.3A7.1 7.1 0 0 0 19 13.2M6 20v-4h4" />
                                                </svg>
                                                <span class="sr-only">Icon description</span>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class={`divide-y overflow-y-hidden divide-gray-200 dark:divide-gray-700 ${styles.animate}`}>
                                    <For each={prepareData(data()).intentions}>
                                        {intencja => <tr class="odd:bg-white transition-colors even:bg-gray-100 hover:bg-gray-200 dark:odd:bg-gray-900 dark:even:bg-gray-800 dark:hover:bg-gray-700">
                                            <td class="px-2 text-center sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-gray-200">{intencja.name}</td>
                                            <td colSpan={2} class="text-wrap px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-md text-gray-800 dark:text-gray-200">{intencja.intention}</td>
                                        </tr>}
                                    </For>
                                </tbody>
                            </Suspense>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </Show>
}