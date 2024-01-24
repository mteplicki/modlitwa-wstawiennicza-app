import { createSignal } from "solid-js";
import Scroller from "../components/Scroller";
import { For } from "solid-js";

const signal = createSignal(window.scrollY);

export default function Uczestnicy() {

    return (
            <Scroller signal={signal}>
                <h2 class="text-4xl font-extrabold dark:text-white">Payments tool for companies</h2>
                <For each={Array(20)}>
                    {(el, i) => <h2 class="text-3xl font-extrabold dark:text-white">blah {i()} {el}</h2>}
                </For>
            </Scroller>

    )
}