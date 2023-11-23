// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLXzdIfUZiPDdGsR8CY3uIqOxvHteNYJc",
  authDomain: "app-coder-next.firebaseapp.com",
  projectId: "app-coder-next",
  storageBucket: "app-coder-next.appspot.com",
  messagingSenderId: "421320588592",
  appId: "1:421320588592:web:1d6bf8637adbf3327b5cf5",
  measurementId: "G-SC87ZME036",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
