/* @refresh reload */
import { render } from 'solid-js/web'
import App from './App';
import './index.css'

import { deferredPrompt, isIos, setDeferredPrompt } from './utils/pwaUtils';
import { showToast } from './root/toasts';

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

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    setDeferredPrompt(e);
    console.log(`'beforeinstallprompt' event was fired.`);
    // Update UI notify the user they can install the PWA

    if (localStorage.getItem('pwa-install-rejected') === 'true1') {
        return;
    }
    if (isIos()) {
        showToast({
            type: "prompt",
            title: "Instalacja aplikacji",
            description: "Aby zainstalować aplikację na swoim urządzeniu iOS, kliknij przycisk 'Udostępnij', a następnie 'Dodaj do ekranu głównego'."
        },
            { time: 8000 })
    } else {
        showToast({
            type: "prompt",
            title: "Instalacja aplikacji",
            description: "Aby zainstalować aplikację na swoim urządzeniu, kliknij przycisk 'Zainstaluj'.",
            action1: {
                title: "Zainstaluj",
                action: () => {
                    if (deferredPrompt) {
                        deferredPrompt.prompt();
                        deferredPrompt.userChoice.then((choiceResult: any) => {
                            if (choiceResult.outcome === 'accepted') {
                                console.log('User accepted the A2HS prompt');
                                localStorage.removeItem('pwa-install-rejected');
                            } else {

                            }
                            setDeferredPrompt(null);
                        });
                    }
                }
            }
        },
            { time: 8000 })
    }
    localStorage.setItem('pwa-install-rejected', 'true1');
    // Optionally, send analytics event that PWA install promo was shown.

});
