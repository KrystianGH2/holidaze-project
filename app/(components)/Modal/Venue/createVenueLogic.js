// useVenueLogic.js
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/app/Context/AuthContext";
import { venueSchema } from "@/lib/constants";
import { createVenue } from "@/lib/api";

export default function useVenueLogic() {
  const { isLoggedIn, redirectUser, message } = useAuth();
  const { toast } = useToast();

  const handleOnClick = () => {
    return toast({
      title: "Venue Created!",
      duration: 3000,
      description: "Venue successfully created!",
      variant: "success",
    });
  };

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
  };
}
