import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAetxX_m5n9weS8jjUdD1Ie6bnU9cN7Ofk",
  authDomain: "ethan-bcf8c.firebaseapp.com",
  databaseURL: "https://ethan-bcf8c-default-rtdb.firebaseio.com",
  projectId: "ethan-bcf8c",
  appId: "1:480440159180:web:619017375b9abb5433ab69",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
