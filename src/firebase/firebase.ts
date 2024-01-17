// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNsPkWKourt8Q5epgiCIghTGeuE28sLQA",
  authDomain: "modlitwa-wstawiennicza-23992.firebaseapp.com",
  projectId: "modlitwa-wstawiennicza-23992",
  storageBucket: "modlitwa-wstawiennicza-23992.appspot.com",
  messagingSenderId: "654161453107",
  appId: "1:654161453107:web:4a3e3412954415291e8346",
  measurementId: "G-STZ0VY6S0J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);