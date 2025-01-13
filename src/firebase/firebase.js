// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVRCLghZ8MGdQj93FFNgMUpJ6rHFDtOzs",
  authDomain: "hotelgramayana-55120.firebaseapp.com",
  projectId: "hotelgramayana-55120",
  storageBucket: "hotelgramayana-55120.firebasestorage.app",
  messagingSenderId: "1095526401584",
  appId: "1:1095526401584:web:5443e10dd8158441260ff5",
  measurementId: "G-H33KHR6HM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore=getFirestore(app);
const auth=getAuth(app);
export {app,auth,firestore};