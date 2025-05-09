import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQmLFQlUq2QLUCWXaUpiVLJzRo2eAIhc4",
    authDomain: "mars-dashboard-92a5b.firebaseapp.com",
    projectId: "mars-dashboard-92a5b",
    storageBucket: "mars-dashboard-92a5b.firebasestorage.app",
    messagingSenderId: "623354010546",
    appId: "1:623354010546:web:7703993ffac16ce45f22ab",
    measurementId: "G-W2JBXQCF4G"
    };

export default defineNuxtPlugin(nuxtApp => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Make the Firebase services available globally
    nuxtApp.provide('firebaseAuth', auth);
    nuxtApp.provide('firestoreDB', db);

});