// ==================
// 🔥 FIREBASE AUTH
// ==================

import { auth } from "../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const provider = new GoogleAuthProvider();

// ✅ Login with Google
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

// ✅ Logout
export const logoutUser = async () => {
  await signOut(auth);
};

// ✅ Listen to auth state
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};



// ==================
// ⚠️ TEMP: USERS (LocalStorage)
// ==================

const USERS_KEY = "bike_users";

// get all users
export const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

// save users
export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// register user (temporary)
export const registerUser = (userData) => {
  const users = getUsers();

  const existingUser = users.find(
    (user) =>
      user.email.toLowerCase() === userData.email.toLowerCase()
  );

  if (existingUser) return null;

  const newUser = {
    id: Date.now().toString(),
    ...userData,
    phone: userData.phone?.trim() || "",
    role: userData.role || "customer",
  };

  users.push(newUser);
  saveUsers(users);

  return newUser;
};

// update user (temporary)
export const updateUser = (updatedUser) => {
  const users = getUsers();

  const updatedUsers = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );

  saveUsers(updatedUsers);

  return updatedUser;
};

// ==================
// TEMP: MANUAL LOGIN (LOCAL)
// ==================

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("bike_users")) || [];

  return users.find(
    (user) => user.email === email && user.password === password
  );
};

import { signInWithEmailAndPassword } from "firebase/auth";

// 🔥 Email login
export const loginWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

// ==================
// 🔥 FIRESTORE USER SAVE
// ==================

import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { updateDoc } from "firebase/firestore";

export const saveUserToFirestore = async (firebaseUser, role = "customer") => {
  const userRef = doc(db, "users", firebaseUser.uid);

  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    return snapshot.data(); // ✅ NEVER change role here
  }

  const newUser = {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName,
    email: firebaseUser.email,
    role: role,
    createdAt: new Date()
  };

  await setDoc(userRef, newUser);

  return newUser;
};
import { createUserWithEmailAndPassword } from "firebase/auth";

// 🔥 Signup with email/password
export const signupWithEmail = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
};