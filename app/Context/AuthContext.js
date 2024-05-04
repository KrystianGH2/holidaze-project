"use client"
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'

const AuthContext = createContext({
    redirectUser: () => {},
    message: ""
});

export const AuthProvider = ({ children }) => {
    const router= useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("Please Log in to continue.")

 useEffect(() => {
    const userDataFromCookie = Cookies.get("userData");
    if (userDataFromCookie) {
      setUserData(JSON.parse(userDataFromCookie));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [router]);

  const redirectUser = () => {
      router.push("/Login");
  }
 
  return (
    <AuthContext.Provider value={{ isLoggedIn, redirectUser, message }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
