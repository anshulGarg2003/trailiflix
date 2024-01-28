// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
    
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_Key,
  authDomain: process.env.REACT_APP_FIREBASE_Auth_Domain,
  projectId: process.env.REACT_APP_FIREBASE_Project_Id,
  storageBucket: process.env.REACT_APP_FIREBASE_Storage_Bucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_Messaging_Sender_Id,
  appId: process.env.REACT_APP_FIREBASE_App_Id
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);