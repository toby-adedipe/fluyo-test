// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM11lErf1vae8arpT3MgmHjQGYcMjKYWw",
  authDomain: "fluyo-test-cd58d.firebaseapp.com",
  projectId: "fluyo-test-cd58d",
  storageBucket: "fluyo-test-cd58d.appspot.com",
  messagingSenderId: "356553622714",
  appId: "1:356553622714:web:f1c4f091242bff81deae83",
  measurementId: "G-80TZY3NKK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)