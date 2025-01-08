// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXG-zmFjuGrCYzqhVrbD6cXg2NRKRmy3g",
  authDomain: "progress-cal.firebaseapp.com",
  projectId: "progress-cal",
  storageBucket: "progress-cal.firebasestorage.app",
  messagingSenderId: "694811475043",
  appId: "1:694811475043:web:8c04b4b6523efff55ecc56",
  measurementId: "G-CMM3WHED56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
