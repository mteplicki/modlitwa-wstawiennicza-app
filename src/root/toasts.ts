import { createSignal } from "solid-js";

export type Action = {
    title: string,
    action: () => void
}

export type Toast = {
    type: "success" | "prompt"
    title: string,
    description: string,
    action1?: Action,
    action2?: Action
}

export type ToastWrapper = {
    toast: Toast,
    id: number
    ref: Promise<HTMLDivElement>
    resolveFunc: (value: HTMLDivElement) => void
}

function createWrapper(toast: Toast) {
    let ref: Promise<HTMLDivElement>;
    let resolveFunc: (value: HTMLDivElement) => void = () => {console.log("resolveFunc not set") };
    ref = new Promise((resolve) => {
        resolveFunc = resolve;
    })
    return { toast, id: Math.random(), ref, resolveFunc };
}

export const [toasts, setToastsList] = createSignal<ToastWrapper[]>([]);

export async function showToast(toast: Toast, options?: { time?: number, animationStart? : boolean }) {
    let { time = 2000 } = (options || {});
    let wrapper = createWrapper(toast);
    setToastsList((list) => [...list, wrapper]);
    let ref = await wrapper.ref;
    let animation = ref.animate([
        {"opacity": "0", "height": "0"},
        {"opacity": "1", "height": ref.scrollHeight + "px"}
    ], {
        duration: 150,
    })
    await animation.finished;
    setTimeout(() => {
        ref.animate([
            {opacity: "1", transform: "translateY(0)", height: ref.scrollHeight + "px"},
            {opacity: "0", transform: "translateY(50px)", height: "0"}
        ], {
            duration: 150,
        }).onfinish = () => setToastsList((toast) => toast.filter((t) => t.id !== wrapper.id));
        
    }, time);
}

export function showExampleToasts() {
    showToast({
        type: "success",
        title: "Witaj!",
        description: "Witaj na stronie modlitwy wstawienniczej. Znajdziesz tutaj wszystkie potrzebne informacje."
    },
        { time: 9000 })
    showToast({
        type: "prompt",
        title: "Uwaga!",
        description: "Strona jest w fazie testów, więc mogą wystąpić błędy. Jeśli tak się stanie, prosimy o zgłoszenie tego faktu do organizatorów.",
        action1: {
            title: "Zgłoś błąd",
            action: () => {
                window.open("google.com");
            }
        },
        action2: {
            title: "Zamknij",
            action: () => {
                console.log("zamknij")
            }
        }
    },
        { time: 5000 })
}