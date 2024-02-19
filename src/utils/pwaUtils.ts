import { useRegisterSW } from "virtual:pwa-register/solid";
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase/messaging";

//@ts-ignore
const navigatorStandAlone: () => boolean = () => ('standalone' in window.navigator) && (window.navigator.standalone);

export const isInStandaloneMode: () => boolean = () =>
      (window.matchMedia('(display-mode: standalone)').matches) ||
      navigatorStandAlone() ||
      document.referrer.includes('android-app://');

console.log('version 1.0.5')

export const {
      offlineReady: [offlineReady, setOfflineReady], needRefresh: [needRefresh, setNeedRefresh], updateServiceWorker,
} = useRegisterSW({
      async onRegistered(reg) {
            const permission = await Notification.requestPermission()
            if (permission === "granted") {
                  console.log("registered", reg);
                  await navigator.serviceWorker.ready;
                  console.log("service worker ready");
                  const token = await getToken(messaging, {
                        vapidKey: "BIqJq8GNwGDVJWAdHpRADTTGB4egBUf-jed-a8yEOftba4q5UKJGBLlrHyLV4cD03vFxBitcwSQg-q-SWYFu7_A",
                        serviceWorkerRegistration: reg
                  })
                  console.log("token", token);
            }
      },
      onRegisterError(e) {
            console.log("register error", e);
      },
});