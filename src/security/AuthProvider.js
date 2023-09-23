import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { loginUser } from "../services/loginService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(["login"]);
  const [loggedout, setLoggedout] = useState(false);
  const [logoutWarning, setlogoutwarning] = useState(false);

  const [authenticated, setAuthenticated] = useState(
    cookies.authenticated === "true"
  );
  const [user, setUser] = useState(cookies.userId);
  const [token, setToken] = useState(cookies.token);
  const [valid, setValid] = useState(true);

  function login(username, password) {
    loginUser(username, password)
      .then((response) => {
        setAuthenticated(true);
        setUser(response.data.userId);
        setToken(response.data.token);
        setValid(true);
        setCookie("authenticated", true, { path: "/" });
        setCookie("userId", response.data.userId, { path: "/" });
        setCookie("token", response.data.token, { path: "/" });
      })
      .catch((error) => {
        setValid(false);
        logout();
      });
  }

  const logout = (warning=false,displayLogout=false) => {
    setAuthenticated(false);
    setUser(null);
    setToken(null);
    setCookie("authenticated", false, { path: "/" });
    setCookie("userId", "", { path: "/" });
    setCookie("token", "", { path: "/" });
    if (displayLogout===true)setLoggedout(true);
    if (warning===true) setlogoutwarning(true);
  };
  const clearLogoutMessage = () => {
    setLoggedout(false);
    setlogoutwarning(false);
  };

  useEffect(() => {
      setTimeout(() => {
          clearLogoutMessage()
      }, 5000);
  },[loggedout,logoutWarning])

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        login,
        token,
        logout,
        valid,
        loggedout,
        logoutWarning,
        clearLogoutMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
