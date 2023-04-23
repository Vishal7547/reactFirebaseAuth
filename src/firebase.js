import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBe7X4oSEwX0-_BHr1LsFFsGV2lIlQAczo",
  authDomain: "todos-6beab.firebaseapp.com",
  projectId: "todos-6beab",
  storageBucket: "todos-6beab.appspot.com",
  messagingSenderId: "90723406279",
  appId: "1:90723406279:web:aa972018eb37303c7bc9e2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { app, auth, db };
