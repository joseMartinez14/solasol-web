// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import 'firebase/firestore'; 
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*
const firebaseConfig = {
  apiKey: "AIzaSyCGTfsraCW51ophpTUIdn3oOhXPY3nNHR4",
  authDomain: "login-example-project-d79d5.firebaseapp.com",
  projectId: "login-example-project-d79d5",
  storageBucket: "login-example-project-d79d5.appspot.com",
  messagingSenderId: "241427947561",
  appId: "1:241427947561:web:b69cffc5966206f87b7c38",
  measurementId: "G-2DBJC4P22B"
};
*/



const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);


export default firebase_app;

// Initialize Firebase
//let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

//export default firebase_app;
