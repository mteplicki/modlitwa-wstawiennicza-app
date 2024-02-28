import { Router, Route } from "./router/MyRouter"
import Nav from "./root/Root"
import Intencje from "./intencje/Intencje"
import Uczestnicy from "./uczestnicy/Uczestnicy"

console.log("version 1.3.9")

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