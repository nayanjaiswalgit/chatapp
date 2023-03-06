
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCa2Pa8MBpC17MTPLCHrRxdNPT3tmkzv2E",
  authDomain: "chitchat-nayan.firebaseapp.com",
  databaseURL: "https://chitchat-nayan-default-rtdb.firebaseio.com",
  projectId: "chitchat-nayan",
  storageBucket: "chitchat-nayan.appspot.com",
  messagingSenderId: "132393463704",
  appId: "1:132393463704:web:9fa52bdaf00b48bab9c5ed"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();


