"use client"
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import { getProfiles } from "@/lib/api";

const AuthContext = createContext({
    redirectUser: () => {},
    message: "",
    userData: null,
    isLoggedIn: null,
    isVenueManager: null
});

export const AuthProvider = ({ children }) => {
    const router= useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [message, setMessage] = useState("Please Log in to continue.")
    const [isVenueManager, setIsVenueManager] = useState(null);

    useEffect(() => {
        const userDataFromCookie = Cookies.get("userData");
        if (userDataFromCookie) {
            const parsedUserData = JSON.parse(userDataFromCookie);
            setIsLoggedIn(true);
            if (isLoggedIn) {
                const getUserData = async () => {
                    try {
                        const responseData = await getProfiles(parsedUserData.name);
                        const data = await responseData.json();
                        setUserData(data.data);
                        setIsVenueManager(data.data.venueManager); 
                    } catch (e) {
                        console.log(e);
                    }
                };
                getUserData();
            }
        } else {
            setIsLoggedIn(false);
        }
    }, [router, isLoggedIn, isVenueManager]); 

    const redirectUser = () => {
        router.push("/Login");
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, redirectUser, message, userData, isVenueManager }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
