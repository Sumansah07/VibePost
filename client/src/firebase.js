// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8T8sh6Ps4-ew9aunBaKeVqMOEU7iR9ts",
  authDomain: "authentication--web.firebaseapp.com",
  databaseURL: "https://authentication--web-default-rtdb.firebaseio.com",
  projectId: "authentication--web",
  storageBucket: "authentication--web.appspot.com",
  messagingSenderId: "899708749495",
  appId: "1:899708749495:web:f7429e62eec1ae7e6f6f32",
  measurementId: "G-DL896KH3R2"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);