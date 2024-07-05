import { createResource } from "solid-js";
import { app } from "./firebase";
import { getAuth } from "firebase/auth";
import { isLogged, refetchIsAuthorized } from "./auth";
import { DocumentData, collection, documentId, getDocs, limit, orderBy, query } from "firebase/firestore";
import { firestore } from "./firestore";
import { effect } from "solid-js/web";

const [d, { refetch }] = createResource(async () => {
    const auth = getAuth(app);
    await auth.authStateReady();
    if (!auth.currentUser?.email) {
        return null;
    }
    const colect1 = collection(firestore, "intentions", auth.currentUser?.email!, "dates");
    let docs = await getDocs(query(colect1, orderBy(documentId(), "desc"), limit(1))); 
    if(docs.docs.length === 0) {
        return null;
    }
    return docs.docs[0].data();
})

export const data = d;

export const refetchData = refetch;

export function prepareData(data: DocumentData | null | undefined) {
    if (!data) {
        return {date: [], intentions: []};
    }
    return {
        date: data.dateRange as readonly string[],
        intentions: data.intentions.map((e : string, i : number)=>({name: data.names[i], intention: e})) as readonly {name: string, intention: string}[]
    }
}
let resolve : (value: void | PromiseLike<void>) => void;
export const isLoaded = new Promise<void>((res) => {resolve = res})

effect(async () => {
    const auth = getAuth(app);
    await auth.authStateReady();
    if (isLogged()) {
        let promise1 = refetchData();
        let promise2 = refetchIsAuthorized()
        await Promise.all([promise1, promise2])
    }
    resolve()
})