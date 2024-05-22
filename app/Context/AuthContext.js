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
    isUserVenueManager: false,
});

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [message, setMessage] = useState("Please Log in to continue.");
    const [isUserVenueManager, setIsUserVenueManager] = useState(false);

    useEffect(() => {
        const userDataFromCookie = Cookies.get("userData");
        if (userDataFromCookie) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        if (!isLoggedIn) return;

        const getUserData = async () => {
            try {
                const userDataFromCookie = Cookies.get("userData");
                if (userDataFromCookie) {
                    const parsedUserData = JSON.parse(userDataFromCookie);
                    const responseData = await getProfiles(parsedUserData.name);
                    const data = await responseData;
                    setUserData(data.data);
                    setIsUserVenueManager(data.data.venueManager); 
                }
            } catch (e) {
                console.log(e);
            }
        };

        getUserData();
    }, [isLoggedIn, isUserVenueManager]); 

    const redirectUser = () => {
        router.push("/Login");
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, redirectUser, message, userData, isUserVenueManager }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
