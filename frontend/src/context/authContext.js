import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
      // This function runs ONLY ONCE when component mounts
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      axios.defaults.headers.common["Authorization"] = parseData.token;
      return {
        user: parseData.user,
        token: parseData.token,
      };
    }
    return {
      user: null,
      token: "",
    };
  });

  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = auth.token;
    }
  }, [auth?.token]);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };