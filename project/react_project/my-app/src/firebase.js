// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAetxX_m5n9weS8jjUdD1Ie6bnU9cN7Ofk",
  authDomain: "ethan-bcf8c.firebaseapp.com",
  databaseURL: "https://ethan-bcf8c-default-rtdb.firebaseio.com",
  projectId: "ethan-bcf8c",
  storageBucket: "ethan-bcf8c.firebasestorage.app",
  messagingSenderId: "480440159180",
  appId: "1:480440159180:web:619017375b9abb5433ab69",
  measurementId: "G-Q7JQDN1QXP"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
