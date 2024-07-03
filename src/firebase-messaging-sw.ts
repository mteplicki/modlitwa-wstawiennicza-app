/// <reference lib="webworker" />

self.onnotificationclick = (event) => {
    console.log("On notification click: ", event.notification.tag);
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(
        self.clients
            .matchAll({
                type: "window",
            })
            .then((clientList) => {
                for (const client of clientList) {
                    if (client.url.includes("modlitwa-wstawiennicza-23992.web.app") && "focus" in client) return client.focus();
                }
                if (self.clients.openWindow) return self.clients.openWindow("https://modlitwa-wstawiennicza-23992.web.app/uczestnicy");
            }),
    );
};

import { precacheAndRoute } from 'workbox-precaching'
import pwaLogo2 from "./assets/pwa-512x512.png"
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import { initializeApp } from 'firebase/app';
import firebaseConfig from "./firebase/firebaseConfig.json"

declare let self: ServiceWorkerGlobalScope


const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)
console.log("SW version 1.1.1")

precacheAndRoute(self.__WB_MANIFEST)

onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.data?.title!;
    const notificationBody = payload.data?.body!;
    const notificationOptions: NotificationOptions = {
        body: notificationBody,
        icon: pwaLogo2,
        tag: "MW MOST",
        lang: "pl",
        requireInteraction: true,
    };
    self.registration.showNotification(notificationTitle,notificationOptions);
});