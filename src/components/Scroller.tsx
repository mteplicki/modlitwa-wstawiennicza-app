import { onMount, onCleanup, Signal, FlowProps } from "solid-js";

export default function Scroller(props: FlowProps<{ signal: Signal<number> }>) {
    const [scroll, setScroll] = props.signal;
    
    onMount(() => {
        setTimeout(() => window.scrollTo({ behavior: 'instant', top: scroll()}), 0);
    })
    onCleanup(() => {
        setScroll(window.scrollY);
    })
    return (
        <>
            {props.children}
        </>
    )
}