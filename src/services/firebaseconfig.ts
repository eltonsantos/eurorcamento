import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// To test: elton@elton.com 123456

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "eurorcamento.firebaseapp.com",
  projectId: "eurorcamento",
  storageBucket: "eurorcamento.appspot.com",
  // authDomain: "eurorcamento-dev.firebaseapp.com",
  // projectId: "eurorcamento-dev",
  // storageBucket: "eurorcamento-dev.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const realTimeDatabase = getDatabase(app);
