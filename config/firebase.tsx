// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {collection, getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBWS6t5OdrvEBdYZtNv7GwyTFuQk-drLl8",
    authDomain: "campusconnect-97e95.firebaseapp.com",
    projectId: "campusconnect-97e95",
    storageBucket: "campusconnect-97e95.appspot.com",
    messagingSenderId: "601831665094",
    appId: "1:601831665094:web:c23e652e30097c0de516c7",
    measurementId: "G-H3BPHM9KVQ"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app)
export const UserRef = collection(db,"Users")
export const EventRef = collection(db,"Events")
export const auth = getAuth(app)
 export const storageBucket = getStorage(app)
