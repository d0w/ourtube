// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const googleAPI = "AIzaSyB0bGzzVEjwZ7UqAr9OcrMTWZmkAqj9l9U";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: googleAPI,

  authDomain: "video-51325.firebaseapp.com",

  projectId: "video-51325",

  storageBucket: "video-51325.appspot.com",

  messagingSenderId: "90513678460",

  appId: "1:90513678460:web:4e198b604efc44115aa9f9"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;