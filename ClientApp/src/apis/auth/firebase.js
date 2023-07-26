// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfFR40oRMZNdGBmFgIEgsuaWb8Q_GoE14",
  authDomain: "ezcake-exe201.firebaseapp.com",
  projectId: "ezcake-exe201",
  storageBucket: "ezcake-exe201.appspot.com",
  messagingSenderId: "562679265259",
  appId: "1:562679265259:web:8f5184cb9addcc7f9b8bae",
  measurementId: "G-QS04M2TNQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the functions you need from the SDKs
export const auth = getAuth(app);
export const storage = getStorage(app);
