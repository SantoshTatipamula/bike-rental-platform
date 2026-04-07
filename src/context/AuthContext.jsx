import { createContext, useContext, useEffect, useState } from "react";
import { setUser, getUser, removeUser } from "@/services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  

  // load user on refresh
  useEffect(() => {
    const existingUser = getUser();
    if (existingUser) {
      setUserState(existingUser);
    }
  }, []);

  // login
  const login = (userData) => {
    setUser(userData);
    setUserState(userData);
  };

  // logout
  const logout = () => {
    removeUser();
    setUserState(null);
  };


    const updateUserContext = (updatedUser) => {
    setUser(updatedUser);     // update localStorage
    setUserState(updatedUser); // update UI
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);