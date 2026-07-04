import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  useEffect(() => {

    if (token) {
      localStorage.setItem("token", token);
    }

  }, [token]);

  const logout = () => {

    setUser(null);

    setToken("");

    localStorage.removeItem("token");

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,

        token,
        setToken,

        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth = () => useContext(AuthContext);