import { useEffect, useState } from "react";
import { getProfiles, updateUserProfile } from "@/lib/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "@/lib/constants";
import Cookies from "js-cookie";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export const useProfileLogic = () => {
  const { toast } = useToast();
  const userDataFromCookie = Cookies.get("userData");
  const parsedUserData = userDataFromCookie
    ? JSON.parse(userDataFromCookie)
    : null;

  const [userInfo, setUserInfo] = useState(null);
  const [isFormDisabled, setFormDisabled] = useState(true);
  const [isVenueManager, setIsVenueManager] = useState(false);

  const userName = parsedUserData ? parsedUserData.name : null;

  useEffect(() => {
    const showProfiles = async () => {
      try {
        if (!userName) {
          throw new Error("User data not found in cookie");
        }
        const res = await getProfiles(userName);
        if (res.ok) {
          const data = await res.json();
          setUserInfo(data.data);
        } else {
          throw new Error("Failed to fetch profiles");
        }
      } catch (err) {
        console.error(err);
      }
    };

    showProfiles();
  }, [userName]);

  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    const initialValues = {
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      bio: userInfo?.bio || "",
      "avatar.url": userInfo?.avatar?.url || "",
      "banner.url": userInfo?.banner?.url || "",
      venueManager: userInfo?.venueManager || false,
    };

    Object.entries(initialValues).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [userInfo, setValue]);

  const onSubmit = async (data) => {
    try {
      const res = await updateUserProfile(data, userName);
        toast({
        title: `Profile Updated!`,
        duration: 2000,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      setFormDisabled(true)
      if(res) {
        setTimeout(() => {
            window.location.reload()
        }, 2000);
      }

      return { success: true };
    } catch (err) {
      console.error(err);
       return toast({
        title: "Something went wrong!",
        description: "Failed to update profile. Please try again later.",
        action: <ToastAction altText="Close">Close</ToastAction>,
        variant: "destructive",
      });
    }
  };

  const handleOnClick = () => {
    setFormDisabled(!isFormDisabled);
  };

  const handleOnChange = () => {
    setIsVenueManager(!isVenueManager);
  };

  return {
    userInfo,
    isFormDisabled,
    register,
    handleSubmit,
    handleOnClick,
    handleOnChange,
    onSubmit,
    isVenueManager,
  
  };
};