// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjt7SxGEQmEAdJ4Po329pa0WaGF-yGNiU",
  authDomain: "monkey-blogging-6e2ca.firebaseapp.com",
  projectId: "monkey-blogging-6e2ca",
  storageBucket: "monkey-blogging-6e2ca.appspot.com",
  messagingSenderId: "507853541000",
  appId: "1:507853541000:web:8427f6457dac41ae99993d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
