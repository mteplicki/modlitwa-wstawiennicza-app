/* @refresh reload */
import { render } from 'solid-js/web'
import App from './App';
import './index.css'
import 'preline'
import 'flowbite'
import { registerSW } from 'virtual:pwa-register'

// @ts-ignore
const updateSW = registerSW({
  onOfflineReady() {}
})

// @ts-ignore
const navigatorStandAlone: () => boolean = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// @ts-ignore
const isInStandaloneMode : () => boolean  = () =>
      (window.matchMedia('(display-mode: standalone)').matches) || 
      navigatorStandAlone() || 
      document.referrer.includes('android-app://');

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark')
}

const root = document.getElementById('root')
render(() => <App />, root!)
