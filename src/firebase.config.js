// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKdnc1bM4ZDdnKt0AqsuuwH0lsHfBFSBk",
  authDomain: "music-note-229f1.firebaseapp.com",
  projectId: "music-note-229f1",
  storageBucket: "music-note-229f1.appspot.com",
  messagingSenderId: "984607840109",
  appId: "1:984607840109:web:00353f6c0c5d9e8441ac64",
  measurementId: "G-QY2V4ZXY62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const analytics = getAnalytics(app);
