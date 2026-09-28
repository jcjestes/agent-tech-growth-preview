// Firebase App Initialization (Vanilla ES Modules - No build step needed)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  collection, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAiH1fy50XS3nPUoGDwtYVwyaDq2Suqu7w",
  authDomain: "agent-wolf-pack.firebaseapp.com",
  projectId: "agent-wolf-pack",
  storageBucket: "agent-wolf-pack.firebasestorage.app",
  messagingSenderId: "815588166194",
  appId: "1:815588166194:web:6dc1095ed6ce8a92c44a2b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
  app, 
  auth, 
  db, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut,
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  collection, 
  serverTimestamp 
};
