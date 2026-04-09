import { loginWithEmail } from "@/services/authService";
import { signupWithEmail, saveUserToFirestore } from "@/services/authService";
import { createContext, useContext, useEffect, useState } from "react";
import {
  loginWithGoogle,
  logoutUser,
  subscribeToAuthChanges
} from "@/services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Listen to Firebase auth (auto login on refresh)
  useEffect(() => {
  const unsubscribe = subscribeToAuthChanges(async (firebaseUser) => {
    if (firebaseUser) {
      const userData = await saveUserToFirestore(firebaseUser);

      setUserState(userData);
    } else {
      setUserState(null);
    }

    setLoading(false);
  });

  return () => unsubscribe();
}, []);



const loginEmail = async (email, password, role = "customer") => {
  const firebaseUser = await loginWithEmail(email, password);

  const userData = await saveUserToFirestore(firebaseUser);

  if (userData.role !== role) {
    throw new Error(
      `This account is registered as ${userData.role}`
    );
  }

  setUserState(userData);
};

  // 🔐 Login (Google)
const login = async (selectedRole = "customer") => {
  const firebaseUser = await loginWithGoogle();

  const userData = await saveUserToFirestore(firebaseUser, selectedRole);

  // 🔥 ROLE VALIDATION
  if (userData.role !== selectedRole) {
    throw new Error(
      `This email is registered as ${userData.role}. Please login using correct tab.`
    );
  }

  setUserState(userData);
};



const signup = async (email, password, role = "customer") => {
  const firebaseUser = await signupWithEmail(email, password);

  const userData = await saveUserToFirestore(firebaseUser, role);

  setUserState(userData);
};

  // 🚪 Logout
  const logout = async () => {
    await logoutUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, loginEmail, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);