import { app } from "./firebase"
import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { createResource, createSignal } from "solid-js"
import { firestore } from "./firestore"
import { messaging, registerTokens, unregisterTokens, vapidKey } from "./messaging"
import { getToken } from "firebase/messaging"
import { refetchData } from "./intentions"

export const auth = getAuth(app)

export const initializingAuth = createResource(async () => {
    await auth.authStateReady()
    return auth.currentUser;
})

export const [isLogged, setIsLogged] = createSignal(false);

export const [isReady, setIsReady] = createSignal(false);

const isLoggedResourceObject = createResource(async () => {
    await auth.authStateReady()
    return auth.currentUser !== null
})



export const [isLoggedResource] = isLoggedResourceObject

const [, { refetch: refetchLoggedResource }] = isLoggedResourceObject

export const [currentUser, setCurrentUser] = createSignal(auth.currentUser);



export async function isAuthorizedFunc() {
    await auth.authStateReady()
    if (!auth.currentUser) return false
    let ref = doc(firestore, "intentions", auth.currentUser.email || "null")
    let gotDoc = await getDoc(ref)
    if (gotDoc.exists()) return true;
    return false;
}

export const [isAuthorized, { refetch: refetchIsAuthorized }] = createResource(isAuthorizedFunc)

auth.authStateReady().then(() => {
    setIsReady(true)
})

auth.onAuthStateChanged((user) => {
    if (user) {
        setIsLogged(true);
        setCurrentUser(user);
        refetchLoggedResource();
        refetchIsAuthorized();
        refetchData();
        (async () => {
            if (await isAuthorizedFunc()) {
                const token = await getToken(messaging, { vapidKey: vapidKey })
                registerTokens(token)
            }
        })()
    } else {
        setIsLogged(false);
        setCurrentUser(null);
        refetchLoggedResource();
        refetchIsAuthorized();
        (async () => {
            const token = await getToken(messaging, { vapidKey: vapidKey })
            unregisterTokens(token)
        })()
    }
})