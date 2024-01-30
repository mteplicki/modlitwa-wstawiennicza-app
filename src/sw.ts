import { precacheAndRoute } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

console.log('Hello from service worker')

precacheAndRoute(self.__WB_MANIFEST)