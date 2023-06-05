// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB4ODS11JghuyTm0-cjV1zLbbG-MQMtMDE",
  authDomain: "fir-react-d13cd.firebaseapp.com",
  projectId: "fir-react-d13cd",
  storageBucket: "fir-react-d13cd.appspot.com",
  messagingSenderId: "890545957878",
  appId: "1:890545957878:web:5958ea876c653d59b5b5d7",
  measurementId: "G-XMPJ29J9H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);