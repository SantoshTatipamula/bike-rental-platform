// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBzFat-j7C9Z6mk4rRtGRdxjDy39FIFQg0",
  authDomain: "bike-rental-app-c368d.firebaseapp.com",
  projectId: "bike-rental-app-c368d",
  storageBucket: "bike-rental-app-c368d.firebasestorage.app",
  messagingSenderId: "369810149947",
  appId: "1:369810149947:web:df36fe78b6a28c089ac21e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Add these (VERY IMPORTANT)
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;