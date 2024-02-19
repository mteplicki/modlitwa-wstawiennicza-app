import { FlowProps, Show, createSignal, onMount, createEffect } from "solid-js";
import BottomBar from "../components/BottomBar";
import NavBar from "../components/NavBar";
import { isLogged } from "../firebase/auth";
import { path } from "../router/MyRouter";
import { isInStandaloneMode } from "../utils/pwaUtils";
import { Dialog } from "./Dialog";
import ToastList from "./ToastList";
import { themeChange } from "./themeChange";
import { showExampleToasts, toasts } from "./toasts";

function transformLocation(location: string) {
    if (location === "/") {
        return "/intencje";
    } else {
        return location;
    }
}

export default function Nav(props: FlowProps) {
    const [selected, setSelected] = createSignal(transformLocation(location.pathname));

    createEffect(() => {
        setSelected(transformLocation(path()));
    })
    onMount(() => {
        themeChange();
        showExampleToasts();
    })

    return (
        <>
            <Dialog />
            <NavBar isLogged={isLogged} selected={selected} />
            <ToastList toasts={toasts} />
            {props.children}
            <Show when={isInStandaloneMode()}>
                <BottomBar />
            </Show>
        </>
    )
}