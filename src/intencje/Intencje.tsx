import { Show } from 'solid-js'
import './App.module.css'
import Info from './Info'
import Jumbotron from './Jumbotron'
import { isInStandaloneMode } from '../utils/pwaUtils'

function Intencje() {
  return (
    <>
      <Jumbotron />
      <div class="px-4 md:max-w-screen-lg mx-auto" >
        <div class="h-0.5 w-full dark:bg-gray-800 bg-gray-200" />
      </div>

      <Info />
      <Show when={isInStandaloneMode()}>
        <br />
        <br />
      </Show>
    </>
  )
}

export default Intencje
