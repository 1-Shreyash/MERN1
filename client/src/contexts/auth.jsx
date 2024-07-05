import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

//creating context
export const AuthContext = createContext();

//Provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");

  const storeTokenInLSt = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
    // console.log("TOKEN : ", serverToken);
  };

  const isLoggedIn = !!token;

  // console.log(isLoggedIn);

  //tackling LOGOUT
  const LogOutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  // JWT AUTHENTICATION - to get the currently loggedIN user data

  const userAuthentication = async () => {
    try {
      //   setIsLoading(true);
      // console.log("HELLO", token)
      const response = await fetch("http://localhost:5001/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log("HI")

      if (response.ok) {
        const data = await response.json();
        console.log("user data ", data.userData);
        setUser(data.userData);
        // setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data");
    }
  };
  useEffect(() => {
    userAuthentication();
  }, []); //calling function every render

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLSt, LogOutUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//to use our context, set up useContext
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside provider");
  }
  return authContextValue;
};
