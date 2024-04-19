// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApjbVmOqMb_SiIUa0B-URdAWZha9XdQxI",
  authDomain: "jobportal-lite-udemy.firebaseapp.com",
  projectId: "jobportal-lite-udemy",
  storageBucket: "jobportal-lite-udemy.appspot.com",
  messagingSenderId: "490141425649",
  appId: "1:490141425649:web:781d0148fb03e506226e50",
  measurementId: "G-4KZSVRG558"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const fireDB = getFirestore(app);