// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDieMGG7eUgFbFD0UA-LRMG-LSbXz2ToI",
  authDomain: "polyflow-80978.firebaseapp.com",
  projectId: "polyflow-80978",
  storageBucket: "polyflow-80978.appspot.com",
  messagingSenderId: "1048355695203",
  appId: "1:1048355695203:web:50a5c7b2a45becf4932656",
  measurementId: "G-592YD2DJBN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

