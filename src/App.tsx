import { Router, Route } from "./router/MyRouter"
import Nav from "./root/Root"
import { lazy } from "solid-js";

const Intencje = lazy(async () => import("./intencje/Intencje"))
const Uczestnicy = lazy(async () => import("./uczestnicy/Uczestnicy"))

export default function App() {
    return (
        <>
            <Router root={Nav} >
                <Route path={["/intencje", "/"]} component={Intencje} transitionType="content1"/>
                <Route path="/uczestnicy" component={Uczestnicy} transitionType="content2"/>
            </Router>
        </>
    )
}