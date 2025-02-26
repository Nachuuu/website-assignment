// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxpvPsyJu9W5JkpszcgYv4F244Ki3qhuA",
  authDomain: "web-assignment-ad497.firebaseapp.com",
  projectId: "web-assignment-ad497",
  storageBucket: "web-assignment-ad497.appspot.com",
  messagingSenderId: "15008333652",
  appId: "1:15008333652:web:f99a7d218c2d3a212e12c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };