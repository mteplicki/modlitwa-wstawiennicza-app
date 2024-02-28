import { getMessaging, onMessage } from "firebase/messaging";
import { app } from "./firebase";
import axios from "axios";

export const messaging = getMessaging(app)

export const vapidKey = "BIqJq8GNwGDVJWAdHpRADTTGB4egBUf-jed-a8yEOftba4q5UKJGBLlrHyLV4cD03vFxBitcwSQg-q-SWYFu7_A"

const tokenServer = "https://ttrxyguhmmkd6gzd3bu4evucbe0acjlx.lambda-url.eu-north-1.on.aws"

onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
});

export async function registerTokens(tokens: string | string[]) {
    try {
        await axios({
            method: 'post',
            url: `${tokenServer}/registerTokens`,
            data: {
                tokens: tokens
            },
            headers: {
                "Content-Type": "application/json",
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export async function unregisterTokens(tokens: string | string[]) {
    try {
        await axios({
            method: 'post',
            url: `${tokenServer}/unregisterTokens`,
            data: {
                tokens: tokens
            },
            headers: {
                "Content-Type": "application/json",
            }
        })
    } catch (error) {
        console.error(error)
    }
}