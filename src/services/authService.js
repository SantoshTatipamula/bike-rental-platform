import { auth, db } from "../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

// Google login
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

// Email login
export const loginWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

// Signup
export const signupWithEmail = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
};

// Logout
export const logoutUser = async () => {
  await signOut(auth);
};

// Auth listener
export const subscribeToAuthChanges = (cb) => {
  return onAuthStateChanged(auth, cb);
};

// Save user in Firestore
export const saveUserToFirestore = async (firebaseUser, role = "customer") => {
  const userRef = doc(db, "users", firebaseUser.uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) return snap.data();

  const newUser = {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || "",
    email: firebaseUser.email,
    role,
    createdAt: new Date(),
  };

  await setDoc(userRef, newUser);

  return newUser;
};