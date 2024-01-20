import {app} from "./firebase"
import { initializeAuth } from "firebase/auth"

export const auth = initializeAuth(app)