// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAvjVSzekgy6JpSHI4VheweGZ-xHs9s-Xs",
  authDomain: "smit-hackaton-f2ab4.firebaseapp.com",
  projectId: "smit-hackaton-f2ab4",
  storageBucket: "smit-hackaton-f2ab4.appspot.com",
  messagingSenderId: "882791504918",
  appId: "1:882791504918:web:bcbc898c3bf93c696a6937",
  measurementId: "G-K0PWQSZEPJ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };