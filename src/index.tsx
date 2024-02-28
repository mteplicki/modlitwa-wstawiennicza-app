/* @refresh reload */
import { render } from 'solid-js/web'
import App from './App';
import './index.css'

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark')
}

function _calculateScrollbarWidth() {
    document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
}
// recalculate on resize
window.addEventListener('resize', _calculateScrollbarWidth, false);
// recalculate on dom load
// recalculate on load (assets loaded as well)
window.addEventListener('load', _calculateScrollbarWidth);

const root = document.getElementById('root')
render(() => App(), root!)
