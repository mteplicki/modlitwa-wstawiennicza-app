import axios from "axios";
import { onMount } from "solid-js";
import { showToast } from "../root/toasts";

export default function Jumbotron() {
    let formRef: HTMLFormElement | undefined;

    onMount(() => {
        formRef?.addEventListener("submit", (e) => {
            e.preventDefault();
            let formData = new FormData(formRef);
            axios.get("https://script.google.com/macros/s/AKfycbxPaDd57fYncbzXRvmS1spmkLghcne5dbwqT1PeQl0KaGatI3HgFJ-kV8u2VhYr5ZFV/exec", {
                params: {
                    name: formData.get("imie"),
                    intention: formData.get("intencja")
                }
            }
            ).then((response) => {
                if (response.data !== "OK"){
                    alert("Wystąpił błąd podczas wysyłania intencji. Spróbuj ponownie później.")
                } else {
                    showToast({
                        type: "success",
                        title: "Intencja wysłana!",
                        description: "Twoja intencja została wysłana. Dziękujemy!"
                    },
                        { time: 5000 }
                    )
                }
            })
            formRef!.reset();
        })
    })

    return (
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <div class="flex flex-col justify-center">
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Witamy na stronie modlitwy wstawienniczej</h1>
                    <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                    <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Read more about our app
                        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </div>
                <div>
                    <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-secondary rounded-lg shadow-xl dark:bg-gray-800">
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                            Tutaj napisz swoją intencję
                        </h2>
                        <form name="myform" ref={formRef} class="mt-8 space-y-6">
                            <div>
                                <label for="imie" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imię</label>
                                <input type="text" name="imie" id="imie" class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Anna" required />
                            </div>
                            <div>
                                <label for="intencja" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Twoja intencja</label>
                                <textarea name="intencja" id="intencja" placeholder="Wpisz swoją intencję..." class="style-scroll bg-gray-50 h-32 resize-none border overflow-y-scroll border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Wyślij intencję</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}