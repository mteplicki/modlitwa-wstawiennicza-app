/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching'
import logo from "./assets/logo.png"
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import { initializeApp } from 'firebase/app';
import firebaseConfig from "./firebase/firebaseConfig.json"

declare let self: ServiceWorkerGlobalScope

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)
console.log("test")
console.log(self)
console.log(messaging)

precacheAndRoute(self.__WB_MANIFEST)



onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification?.title!;
    const notificationOptions : NotificationOptions = {
        body: payload.notification?.body!,
        icon: logo,
        badge: logo,
        tag: "MW MOST"
    };
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
self.addEventListener('notificationclick', event => {
    console.log(event)
});

console.log("załadowany!")