import { createContext, useState, useContext } from "react";
import userReques from "../api/userRequest.js";
import Cookie from "js-cookie";

const AuthContext = createContext();

// Functions!
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Something hapened");
  }
  return context;
};

// Component.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState(null);

  const verifyToken = async () => {
    const token = Cookie.get("token");
    if (token) {
      const response = await userReques.verifyToquen(token);
      setUser(response.response.name);
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };

  const sigup = async function (values) {
    try {
      const newUser = values;
      const response = await userReques.register(newUser);
      if (response.data == null) {
        setError(response);
      } else {
        setIsAuth(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const login = async function (name, password) {
    try {
      const response = await userReques.login(name, password);

      if (response.data) {
        setIsAuth(true);
      } else {
        setError(response);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        sigup,
        verifyToken,
        login,
        user,
        isAuth,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
