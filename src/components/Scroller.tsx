import { onMount, onCleanup, Signal, FlowProps } from "solid-js";

export default function Scroller(props: FlowProps<{ signal: Signal<number> }>) {
    const [scroll, setScroll] = props.signal;
    window.scrollTo(0, scroll());
    onMount(() => {
        
        console.log(window.scrollY)
        console.log(scroll())
    })
    onCleanup(() => {
        setScroll(window.scrollY);
        console.log(scroll())
    })
    return (
        <>
            {props.children}
        </>
    )
}