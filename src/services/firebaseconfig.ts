import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAQaVLC847aLQeHAInk0Hot0UyTtPQ3Sg",
  authDomain: "eurorcamento.firebaseapp.com",
  projectId: "eurorcamento",
  storageBucket: "eurorcamento.appspot.com",
  messagingSenderId: "886421526942",
  appId: "1:886421526942:web:32430b9019195e51511e8f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);