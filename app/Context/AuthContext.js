"use client"
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import { getProfiles } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const AuthContext = createContext({
    redirectUser: () => {},
    message: "",
    userData: null,
    isLoggedIn: null,
    isUserVenueManager: false,
    signOut: () => {},
});

export const AuthProvider = ({ children }) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [message, setMessage] = useState("Please Log in to continue.");
    const [isUserVenueManager, setIsUserVenueManager] = useState(false);

   useEffect(() => {
    const userDataFromCookie = Cookies.get("userData");
    if (userDataFromCookie) {
        setIsLoggedIn(true);
        const parsedUserData = JSON.parse(userDataFromCookie);
        setUserData(parsedUserData);
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
                setUserData(responseData.data);
                setIsUserVenueManager(responseData.data.venueManager);
            } 
        } catch (e) {
            console.error("Error fetching user data:", e);
        }
    };

    getUserData();
}, [isLoggedIn, isUserVenueManager]);


    const redirectUser = () => {
        router.push("/Login");
    }
   const signOut = () => {
    Cookies.remove("userData");
    Cookies.remove("accessToken");
    toast({
        title: "You have been logged out!",
        action: <ToastAction altText="Close">Close</ToastAction>,
    });

    setIsLoggedIn(false);
    setUserData({});

};

    return (
        <AuthContext.Provider value={{ isLoggedIn, redirectUser, message, userData, isUserVenueManager, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
