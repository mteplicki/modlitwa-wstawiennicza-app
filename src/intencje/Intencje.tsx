// import { createSignal } from 'solid-js'
import { createSignal } from 'solid-js';
import './App.module.css'
import Info from './Info'
import Jumbotron from './Jumbotron'
import Scroller from '../components/Scroller';
// import { db } from '../firebase/db'
const signal = createSignal(window.scrollY);

function Intencje() {

  return (
    <Scroller signal={signal}>
        <Jumbotron />
        <Info />
    </Scroller>
  )
}

export default Intencje
