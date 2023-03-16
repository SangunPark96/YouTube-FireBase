// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOc1JKNP3dsERXyUJwgzIr3UxJPya7wqE",
  authDomain: "fir-test-3e855.firebaseapp.com",
  projectId: "fir-test-3e855",
  storageBucket: "fir-test-3e855.appspot.com",
  messagingSenderId: "10657686628",
  appId: "1:10657686628:web:8e9c1a5dad24c83bc02b71",
  measurementId: "G-XB4BFCPC4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);