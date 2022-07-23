import { createApp } from 'vue'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "./firebaseConfig";

import App from './App.vue'
import './styles.css'

const app = createApp(App)

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const firestore = getFirestore(firebaseApp);

app.provide('firestore', firestore)

app.mount('#webcrafters-scoreboard')