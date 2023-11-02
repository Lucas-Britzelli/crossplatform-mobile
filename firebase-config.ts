// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAElUltr8zayfTcrpdszoUMLZJwboffEgU",
  authDomain: "iths-crossplatform-975a0.firebaseapp.com",
  projectId: "iths-crossplatform-975a0",
  storageBucket: "iths-crossplatform-975a0.appspot.com",
  messagingSenderId: "802101019687",
  appId: "1:802101019687:web:6eb185fbfd68465f29fa02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
