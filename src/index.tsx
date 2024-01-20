/* @refresh reload */
import { render } from 'solid-js/web'
import App from './App';
import './index.css'
import 'preline'
import 'flowbite'


if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark')
}

const root = document.getElementById('root')
render(() => <App />, root!)
