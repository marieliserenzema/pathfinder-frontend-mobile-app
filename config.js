import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "pathfinder-420409.firebaseapp.com",
  projectId: "pathfinder-420409",
  storageBucket: "pathfinder-420409.appspot.com",
  messagingSenderId: "157373381010",
  appId: "1:157373381010:web:127f5aa31f3b30c1a4a94b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
