// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-54619.firebaseapp.com",
  projectId: "real-estate-54619",
  storageBucket: "real-estate-54619.appspot.com",
  messagingSenderId: "897009635494",
  appId: "1:897009635494:web:9f9b4b0c2b493a244da467"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);