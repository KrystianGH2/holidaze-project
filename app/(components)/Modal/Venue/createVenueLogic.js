// useVenueLogic.js
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/app/Context/AuthContext";
import { venueSchema } from "@/lib/constants";
import { createVenue } from "@/lib/api";
import { useEffect, useState } from "react";
import {  getProfiles } from "@/lib/api";
import Cookies from "js-cookie";

export default function useVenueLogic() {
  const { isLoggedIn, redirectUser, message, } = useAuth();
  const { toast } = useToast();

  const userDataFromCookie = Cookies.get("userData");
  const parsedUserData = userDataFromCookie
    ? JSON.parse(userDataFromCookie)
    : null;
  const userName = parsedUserData ? parsedUserData.name : null;
  const [iVenueManager, setIVenueManager] = useState(null);

   useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userName) {
          throw new Error("User data not found in cookie");
        }
        const res2 = await getProfiles(userName);
        setIVenueManager(res2.data.venueManager);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [userName]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(venueSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await createVenue(data);
      if (res) {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      toast({
        title: "Venue Created!",
        duration: 2200,
        description: "Venue successfully created!",
        variant: "success",
      });

      console.log(res);
    } catch (err) {
      console.log(err);
      return toast({
        title: "Something went wrong!",
        description: "Failed to create Venue. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    isLoggedIn,
    redirectUser,
    message,
    iVenueManager
  };
}
