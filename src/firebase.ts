// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Firestore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd91-Bz6nbwMkuqlhIEh6LrphVxXHNp-8",
  authDomain: "robofest2024.firebaseapp.com",
  projectId: "robofest2024",
  storageBucket: "robofest2024.appspot.com",
  messagingSenderId: "408508576757",
  appId: "1:408508576757:web:ad9c09c5d675f352cfa6bc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export { db };
