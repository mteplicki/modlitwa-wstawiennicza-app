import './App.module.css'
import Info from './Info'
import Jumbotron from './Jumbotron'

function Intencje() {
  return (
      <>
        <Jumbotron />
        <Info />
        <h2 class="text-3xl font-bold text-center text-gray-800 dark:text-white mt-8 mb-4">Intencje</h2>
        <h3 class="text-xl font-semibold text-center text-gray-600 dark:text-gray-400 mb-8">Wyślij intencję, a my pomodlimy się za Ciebie</h3>
        <h4 class="text-lg font-semibold text-center text-gray-600 dark:text-gray-400 mb-8">Wypełnij poniższy formularz, a my pomodlimy się za Ciebie</h4>
      </>
  )
}

export default Intencje
