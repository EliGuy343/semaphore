
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyApf7Lz5JLokSMdkfOIjNxeBXTQm8cHIsM",
  authDomain: "semaphore-a7fd1.firebaseapp.com",
  projectId: "semaphore-a7fd1",
  storageBucket: "semaphore-a7fd1.appspot.com",
  messagingSenderId: "1082793237514",
  appId: "1:1082793237514:web:b8575537e8d8fc093153f3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export {db, storage};