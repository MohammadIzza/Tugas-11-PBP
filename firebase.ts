import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA1kEHM7zQVR4ZYgANWYv5NVjjgZhKZIuA",
  authDomain: "moonlit-aria-469711-a4.firebaseapp.com",
  projectId: "moonlit-aria-469711-a4",
  storageBucket: "moonlit-aria-469711-a4.firebasestorage.app",
  messagingSenderId: "710220152896",
  appId: "1:710220152896:android:1168952c9e2500f7a39fa5",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export const messagesCollection =
collection(db, "messages") as
CollectionReference<DocumentData>;
export {
auth,
db,
collection,
addDoc,
serverTimestamp,
query,
orderBy,
onSnapshot,
signInAnonymously,
onAuthStateChanged,
};