import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider
      value={{
        location,
        setLocation,
        search,
        setSearch,
        user,
        setUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook
export const useAppContext = () => useContext(AppContext);