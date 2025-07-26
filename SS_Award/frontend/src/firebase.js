// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRyjfZ7caLod1dIa8ySeNW6ErpfZwbwXs",
  authDomain: "safesphere-634af.firebaseapp.com",
  projectId: "safesphere-634af",
  storageBucket: "safesphere-634af.firebasestorage.app",
  messagingSenderId: "833292801756",
  appId: "1:833292801756:web:267e4b5f3b90af56e44619",
  measurementId: "G-QB0TQFCNBP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Function to push data to Firestore
const pushApplicationData = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "bravery_award_applications"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { pushApplicationData };
