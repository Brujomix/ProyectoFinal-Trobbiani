import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "../src/styles/styles.scss"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJMLWzsjNGQTwDiab2g4NBFN64fFAx5GU",
  authDomain: "shopping-casilda-f42ab.firebaseapp.com",
  projectId: "shopping-casilda-f42ab",
  storageBucket: "shopping-casilda-f42ab.appspot.com",
  messagingSenderId: "107080845258",
  appId: "1:107080845258:web:93042f4317c9aa56bcf133"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

