import { createSignal, onCleanup, onMount } from "solid-js";

let [open1Store, setOpen1Store] = createSignal(true);
let [open2Store, setOpen2Store] = createSignal(true);
let [open3Store, setOpen3Store] = createSignal(true);

export default function Info() {

    let [ref1, ref2, ref3] : (HTMLDivElement)[] = [];

    let [open1, setOpen1] = createSignal(true);
    let [open2, setOpen2] = createSignal(true);
    let [open3, setOpen3] = createSignal(true);

    onMount(() => {
        setOpen1(open1Store());
        setOpen2(open2Store());
        setOpen3(open3Store());
    })

    onCleanup(() => {
        setOpen1Store(open1());
        setOpen2Store(open2());
        setOpen3Store(open3());
    })

    return (
        <div class="py-8 px-4 mx-auto flex flex-row it lg:py-16 gap-8 lg:gap-16 max-w-4xl">
            <div id="accordion-open" class="mx-auto min-w-full">
                <h2 id="accordion-open-heading-1">
                    <button type="button" class="transition-all duration-300 flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" onclick={() => setOpen1((prev) => !prev)} aria-expanded="true" aria-controls="accordion-open-body-1">
                        <span class="flex items-center"><svg class="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg> Co to jest modlitwa wstawiennicza?</span>
                        <svg class="w-3 h-3 shrink-0 transition-transform duration-300" classList={{"rotate-180" : open1()}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
                <div ref={ref1} id="accordion-open-body-1" class="overflow-hidden transition-all duration-300" classList={{ "opacity-40" : open1(), "opacity-100" : !open1() }} style={{"max-height": (!open1() ? ref1?.scrollHeight?.toString() + "px" : 0)}} aria-labelledby="accordion-open-heading-1">
                    <div  class="transition-all duration-500 p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                        <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
                    </div>
                </div>
                <h2 id="accordion-open-heading-2">
                    <button type="button" class="transition-all duration-300 flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" onclick={() => setOpen2((prev) => !prev)} aria-expanded="false" aria-controls="accordion-open-body-2">
                        <span class="flex items-center"><svg class="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>Is there a Figma file available?</span>
                        <svg  class="w-3 h-3 shrink-0 transition-transform duration-300" classList={{"rotate-180" : open2()}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
                <div ref={ref2} id="accordion-open-body-2" class="overflow-hidden transition-all duration-300" classList={{ "opacity-40" : open2(), "opacity-100" : !open2()}} style={{"max-height": (!open2() ? ref2?.scrollHeight?.toString() + "px" : 0)}} aria-labelledby="accordion-open-heading-2">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                        <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in y has a design equivalent in our Figma file.</p>
                        <p class="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/" class="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
                    </div>
                </div>

                <h2 id="accordion-open-heading-3">
                    <button type="button" class="transition-all duration-300 flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" onclick={() => setOpen3((prev) => !prev)} aria-expanded="false" aria-controls="accordion-open-body-3">
                        <span class="flex items-center"><svg class="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg> What are the differences between Flowbite and Tailwind UI?</span>
                        <svg  class="w-3 h-3 shrink-0 transition-transform duration-300" classList={{"rotate-180" : open3()}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
                <div ref={ref3} id="accordion-open-body-3" class="overflow-hidden transition-all duration-300" classList={{"opacity-40" : open3(), "opacity-100" : !open3()}} style={{"max-height": (!open3() ? ref3?.scrollHeight?.toString() + "px" : 0)}} aria-labelledby="accordion-open-heading-3">
                    <div class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
                        <p class="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
                        <p class="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
                        <p class="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                        <ul class="ps-5 text-gray-500 list-disc dark:text-gray-400">
                            <li><a href="https://flowbite.com/pro/" class="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
                            <li><a href="https://tailwindui.com/" rel="nofollow" class="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}