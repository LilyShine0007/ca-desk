// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBJFUymB70otlMgXX0uF2faH3kUxKnT6ms",
  authDomain: "cadesk-51b66.firebaseapp.com",
  projectId: "cadesk-51b66",
  storageBucket: "cadesk-51b66.firebasestorage.app",
  messagingSenderId: "123347321836",
  appId: "1:123347321836:web:dff6571c011bea213cf6c9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);