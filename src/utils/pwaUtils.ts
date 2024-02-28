import { useRegisterSW } from "virtual:pwa-register/solid";

//@ts-ignore
const navigatorStandAlone: () => boolean = () => ('standalone' in window.navigator) && (window.navigator.standalone);

export const isInStandaloneMode: () => boolean = () =>
      (window.matchMedia('(display-mode: standalone)').matches) ||
      navigatorStandAlone() ||
      document.referrer.includes('android-app://');

export const {
      offlineReady: [offlineReady, setOfflineReady], needRefresh: [needRefresh, setNeedRefresh], updateServiceWorker,
} = useRegisterSW({
      async onRegistered(_reg) {
            const permission = await Notification.requestPermission()
            if (permission === "granted") {

            }
      },
      onRegisterError(e) {
            console.error("register error", e);
      },
});