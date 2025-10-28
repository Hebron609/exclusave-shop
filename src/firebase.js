// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzG099qcuySL0Kr7bKuOMOgPIIUj9qLDY",
  authDomain: "exclusave-store.firebaseapp.com",
  projectId: "exclusave-store",
  storageBucket: "exclusave-store.firebasestorage.app",
  messagingSenderId: "1026964987851",
  appId: "1:1026964987851:web:7941997c0193b609ae204e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
