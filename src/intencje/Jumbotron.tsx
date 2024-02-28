import { createSignal, onMount } from "solid-js";
import { showToast } from "../root/toasts";
import cssModule from "./App.module.css";
import sendEmail from "../firebase/mail";

export default function Jumbotron() {
    let formRef: HTMLFormElement | undefined;
    const [counter1, setCounter1] = createSignal(0);
    const [counter2, setCounter2] = createSignal(0);
    let loadingRef: HTMLDivElement | undefined;
    onMount(() => {
        formRef?.addEventListener("submit", async (e) => {
            e.preventDefault();
            let formData = new FormData(formRef);
            loadingRef!.classList.remove("hidden")
            const animation = loadingRef!.animate([
                { "opacity": "0" },
                { "opacity": "1" }
            ], 150)
            grecaptcha.ready(async () => {
                try {
                    const response = await sendEmail(formData.get("imie") as string, formData.get("intencja") as string)
                    if (response.data !== "OK") {
                        showToast({
                            type: "error",
                            title: response.data,
                            description: "Wystąpił błąd podczas wysyłania intencji. Spróbuj ponownie później."
                        },
                            { time: 5000 }
                        )
                    } else {
                        showToast({
                            type: "success",
                            title: "Intencja wysłana!",
                            description: "Twoja intencja została wysłana. Dziękujemy!"
                        },
                            { time: 5000 }
                        )
                        formRef!.reset();
                    }
                } catch (error) {
                    console.error(error);
                    showToast({
                        type: "error",
                        title: "Wystąpił błąd. Spróbuj ponownie później.",
                        description: "Wystąpił błąd podczas wysyłania intencji. Spróbuj ponownie później."
                    },
                        { time: 5000 }
                    )
                } finally {
                    await animation.finished;
                    await loadingRef!.animate([
                        { "opacity": "1" },
                        { "opacity": "0" }
                    ], 150).finished
                    loadingRef!.classList.add("hidden")
                }
            })
        })
    })

    return (
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <div class="flex flex-col justify-center">
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Witamy na stronie modlitwy wstawienniczej</h1>
                    <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        Jeśli masz jakąś intencję, którą chciałbyś powierzyć do modlitwy, to jesteś we właściwym miejscu. Wypełnij poniższy formularz, a Twoja intencja zostanie przydzielona do uczestnika, który będzie się modlił za Ciebie.
                    </p>
                    <a href="https://most.salezjanie.pl/" class="text-blue-600 transition-all dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Dowiedz się więcej o SDA MOST
                        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </div>
                <div class="relative w-full lg:max-w-xl bg-secondary rounded-lg shadow-xl dark:bg-gray-800">
                    <div ref={loadingRef} class="absolute flex flex-row items-center box-border h-full w-full bg-black/40 hidden rounded-lg">
                        <svg aria-hidden="true" class="w-8 h-8 mx-auto my-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                    <div class="p-6 sm:p-8 space-y-8">
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                            Tutaj napisz swoją intencję
                        </h2>
                        <form name="myform" ref={formRef} class="mt-8 space-y-6 ">
                            <div>
                                <label for="imie" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imię</label>
                                <input onInput={(e) => { console.log(e); setCounter1(e.target.value.length) }} type="text" maxlength="40" name="imie" id="imie" class="transition-all bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block in w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Anna" required />
                                <div class={cssModule.theCount}>
                                    <span id="current">{counter1()}</span>
                                    <span id="maximum">/ 40</span>
                                </div>
                            </div>
                            <div>
                                <label for="intencja" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Twoja intencja</label>
                                <textarea onInput={(e) => { setCounter2(e.target.value.length) }} maxlength="300" name="intencja" id="intencja" placeholder="Wpisz swoją intencję..." class="transition-all style-scroll bg-gray-50 h-32 resize-none border overflow-y-scroll border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <div class={cssModule.theCount}>
                                    <span id="current">{counter2()}</span>
                                    <span id="maximum">/ 300</span>
                                </div>
                            </div>
                            <button type="submit" class="transition-all w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Wyślij intencję</button>
                        </form>
                        <div>Ta strona jest chroniona przez reCAPTCHA. Obowiązuje
                            <a class="text-blue-500 checked:text-blue-800" href="https://policies.google.com/privacy"> Polityka prywatności</a> oraz
                            <a class="text-blue-500 checked:text-blue-800" href="https://policies.google.com/terms"> Warunki usługi</a> firmy Google.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}