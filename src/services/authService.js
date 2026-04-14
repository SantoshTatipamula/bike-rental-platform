import { auth, db } from "../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const loginWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const signupWithEmail = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const subscribeToAuthChanges = (cb) => {
  return onAuthStateChanged(auth, cb);
};

// Save/update user in Firestore — always returns latest data
export const saveUserToFirestore = async (firebaseUser, role = "customer") => {
  const userRef = doc(db, "users", firebaseUser.uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    // Return existing user data (role should not change on re-login)
    return snap.data();
  }

  // New user — create with chosen role
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
