import { For } from "solid-js";

export default function Uczestnicy() {
    return (
        <>
            <h2 class="text-4xl font-extrabold dark:text-white">Payments tool for companies</h2>
            <For each={Array(40)}>
                {(el, i) => <h2 class="text-3xl font-extrabold dark:text-white">blah {i()} {el}</h2>}
            </For>
        </>
    )
}