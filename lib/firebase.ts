import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDic7B9d6b7H2Sw9SZvjxZAqJsodiSlcXE",
  authDomain: "medicines22u.firebaseapp.com",
  projectId: "medicines22u",
  storageBucket: "medicines22u.firebasestorage.app",
  messagingSenderId: "1094787307135",
  appId: "1:1094787307135:web:ad96ff048492ab4c7c114a"
};


const app = initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
