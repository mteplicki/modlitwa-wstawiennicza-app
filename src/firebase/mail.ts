import axios from "axios"

export default async function sendEmail(name : string, intention : string) {
    const key = await grecaptcha.execute("6Leew4EpAAAAABxqJQsUUhVXgmjSHuA0l7n3A_Db", { action: "submit" })
    const response = await axios.get("https://script.google.com/macros/s/AKfycbxPaDd57fYncbzXRvmS1spmkLghcne5dbwqT1PeQl0KaGatI3HgFJ-kV8u2VhYr5ZFV/exec", {
        params: {
            name: name,
            intention: intention,
            key: key
        }
    })
    return response
}