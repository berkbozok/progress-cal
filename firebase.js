// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage"; // Import Storage
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXG-zmFjuGrCYzqhVrbD6cXg2NRKRmy3g",
  authDomain: "progress-cal.firebaseapp.com",
  projectId: "progress-cal",
  storageBucket: "progress-cal.appspot.com", // Corrected the storage bucket URL
  messagingSenderId: "694811475043",
  appId: "1:694811475043:web:8c04b4b6523efff55ecc56",
  measurementId: "G-CMM3WHED56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore and Storage
export const db = getFirestore(app); // Firestore instance
export const storage = getStorage(app); // Storage instance
