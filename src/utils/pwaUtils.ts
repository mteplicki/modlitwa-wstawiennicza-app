import { createSignal } from "solid-js";
import { useRegisterSW } from "virtual:pwa-register/solid";

//@ts-ignore
const navigatorStandAlone: () => boolean = () => ('standalone' in window.navigator) && (window.navigator.standalone);

export const isInStandaloneMode: () => boolean = () =>
      (window.matchMedia('(display-mode: standalone)').matches) ||
      navigatorStandAlone() ||
      document.referrer.includes('android-app://');

export const [notificationPermitted, setNotificationPermitted] = createSignal(Notification.permission === "granted");

export const [deferredPrompt, setDeferredPrompt] = createSignal<any>(null);

// Detects if device is on iOS 
export const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test( userAgent );
    }

export const {
      offlineReady: [offlineReady, setOfflineReady], needRefresh: [needRefresh, setNeedRefresh], updateServiceWorker,
} = useRegisterSW({
      async onRegistered(_reg) {
            const permission = await Notification.requestPermission()
            if (permission === "granted") {
                  setNotificationPermitted(true);
            }
      },
      onRegisterError(e) {
            console.error("register error", e);
      },
});