import { Router, Route } from "@solidjs/router"
import Nav from "./components/Nav"
import Intencje from "./intencje/Intencje"
import Uczestnicy from "./uczestnicy/Uczestnicy"

export default function App() {
    let ref: HTMLDivElement | undefined;
    return (
        <div ref={ref}>
            <Router root={Nav} >
                <Route path={["/intencje", "/"]} component={Intencje} />
                <Route path="/uczestnicy" component={Uczestnicy} />
            </Router>
        </div>
    )
}