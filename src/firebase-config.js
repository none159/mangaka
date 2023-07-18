// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your wweb app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD52tcEYExgj7NP6SeyB5aFgaS7dHFag9Y",
  authDomain: "chatbot-d732e.firebaseapp.com",
  projectId: "chatbot-d732e",
  storageBucket: "chatbot-d732e.appspot.com",
  messagingSenderId: "973155757049",
  appId: "1:973155757049:web:f41157a93e9de52e582b28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);