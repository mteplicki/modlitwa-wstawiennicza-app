import {app} from "./firebase"
import { initializeFirestore, memoryLocalCache } from "firebase/firestore"

export const firestore = initializeFirestore(app, {localCache: memoryLocalCache()})