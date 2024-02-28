import { navigate, path } from "../router/MyRouter";

export default function BottomBar() {
    return (
        <div class="bottom-bar fixed bottom-0 left-0 z-[55] w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <div class="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
                <button onclick={() => navigate("/intencje")} type="button" class={`${["/","/intencje"].includes(path()) ? "" : ""} transition-all inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group`}>
                    <svg class={(["/","/intencje"].includes(path()) ? "text-blue-600 dark:text-blue-500 " : "text-gray-500 dark:text-gray-400 ") + "transition-all material-symbols-outlined mb-2 "} xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" /></svg>
                    <span class={`${!["/","/intencje"].includes(path()) ? "scale-90 text-gray-500 dark:text-gray-400" : "text-blue-600 dark:text-blue-500"} transition-all text-sm`}>Intencje</span>
                </button>
                <button onclick={() => navigate("/uczestnicy")} type="button"  class="transition-all inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class={(["/uczestnicy"].includes(path()) ? "text-blue-600 dark:text-blue-500 " : "text-gray-500 dark:text-gray-400 ") + " transition-all material-symbols-outlined mb-2"} xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" /></svg>
                    <span class={(!["/uczestnicy"].includes(path()) ? "scale-90 text-gray-500 dark:text-gray-400" : "text-blue-600 dark:text-blue-500") + " transition-all text-sm"}>Panel</span>
                </button>
            </div>
        </div>
    )
}