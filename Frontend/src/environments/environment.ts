// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBoRRWpTnfVQzSrVdJSbSbXvzGkTsFyHQQ",
  authDomain: "asdprecheck.firebaseapp.com",
  projectId: "asdprecheck",
  storageBucket: "asdprecheck.appspot.com",
  messagingSenderId: "949981250575",
  appId: "1:949981250575:web:420e6b99910e9357240f7a",
  measurementId: "G-6194FTXJM2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

