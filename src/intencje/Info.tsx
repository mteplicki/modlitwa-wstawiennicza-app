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
                        <span class="flex items-center"><svg class="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>Na czym polega modlitwa wstawiennicza?</span>
                        <svg class="w-3 h-3 shrink-0 transition-transform duration-300" classList={{"rotate-180" : open1()}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
                <div ref={ref1} id="accordion-open-body-1" class="overflow-hidden transition-all duration-300" classList={{ "opacity-40" : open1(), "opacity-100" : !open1() }} style={{"max-height": (!open1() ? ref1?.scrollHeight?.toString() + "px" : 0)}} aria-labelledby="accordion-open-heading-1">
                    <div  class="transition-all duration-500 p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <p class="mb-2 text-gray-500 dark:text-gray-400">Jest to inicjatywa Salezjańskiego Duszpasterstwa Akademickiego MOST. Grupa studentów co tydzień dostaje do omadlania nowe intancje.</p>
                    </div>
                </div>
                <h2 id="accordion-open-heading-2">
                    <button type="button" class="transition-all duration-300 flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" onclick={() => setOpen2((prev) => !prev)} aria-expanded="false" aria-controls="accordion-open-body-2">
                        <span class="flex items-center"><svg class="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>Co mam zrobić, jeśli mam intencję do powierzenia?</span>
                        <svg  class="w-3 h-3 shrink-0 transition-transform duration-300" classList={{"rotate-180" : open2()}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
                <div ref={ref2} id="accordion-open-body-2" class="overflow-hidden transition-all duration-300" classList={{ "opacity-40" : open2(), "opacity-100" : !open2()}} style={{"max-height": (!open2() ? ref2?.scrollHeight?.toString() + "px" : 0)}} aria-labelledby="accordion-open-heading-2">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                        <p class="mb-2 text-gray-500 dark:text-gray-400">To bardzo proste. W formularzu na górze strony wpisz swoje imię oraz intencję, a nastpnie kliknij "Wyślij intencję". Pamiętej, że intencja może liczyć co najwyżej 300 znaków.</p>
                    </div>
                </div>

                <h2 id="accordion-open-heading-3">
                    <button type="button" class="transition-all duration-300 flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" onclick={() => setOpen3((prev) => !prev)} aria-expanded="false" aria-controls="accordion-open-body-3">
                        <span class="flex items-center"><svg class="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>Chcę dołączyć do osób omadlających intencje. Co mam zrobić?</span>
                        <svg  class="w-3 h-3 shrink-0 transition-transform duration-300" classList={{"rotate-180" : open3()}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
                <div ref={ref3} id="accordion-open-body-3" class="overflow-hidden transition-all duration-300" classList={{"opacity-40" : open3(), "opacity-100" : !open3()}} style={{"max-height": (!open3() ? ref3?.scrollHeight?.toString() + "px" : 0)}} aria-labelledby="accordion-open-heading-3">
                    <div class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
                        <p class="mb-2 text-gray-500 dark:text-gray-400">Najlepiej jest się skontaktować z podprzęsłowym odpowiedzialnym za modlitwę wstawienniczą. Listę podprzęsłowych możesz znależć <a class="text-blue-500" href="https://most.salezjanie.pl/konstrukcja/">tutaj</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}