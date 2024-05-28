"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "@/lib/constants";
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Register() {
  const URL = process.env.APP_API_URL;
  const { toast } = useToast();
  const router = useRouter();

  const navigateOnSuccess = () => {
    setTimeout(() => {
      router.push("/");
    }, 1500);

    return toast({
      title: "Navigating to Home Page!",
      duration: 2000,
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("null");
  const handleOnChange = () => {
    setIsVenueManager(!isVenueManager);
  };
  const onSubmit = async (formData) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const res = await fetch(`${URL}auth/register`, options);

      setIsButtonLoading(!isButtonLoading);

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData.errors[0].message;
        toast({
          title: "Something went wrong!",
          description: errorMessage,
          action: <ToastAction altText="Close">Close</ToastAction>,
          variant: "destructive",
        });
        return;
      }

      const responseData = await res.json();
      setModalMessage(
        `Welcome! 👋 ${
          responseData.data.name.charAt(0).toUpperCase() +
          responseData.data.name.slice(1)
        } !`
      );

      document.getElementById("my_modal_2").showModal();

      setTimeout(() => {
        reset();
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-2xl gap-4 p-4 w-full"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>

          <Input
            type="text"
            placeholder="Your name"
            {...register("name", {
              required: "Name is required.",
            })}
            className="text-gray-700"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="name"> Email</Label>

          <Input
            type="email"
            placeholder="bob@stud.noroff.no"
            {...register("email", {
              required: "Email is required.",
            })}
            className="text-gray-700"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="password"> Password</Label>

          <Input
            type="password"
            placeholder="Enter your password."
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
              maxLength: {
                value: 50,
                message: "Password must be at most 50 characters.",
              },
            })}
            className="text-gray-700"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="bio"> Bio</Label>

          <Input
            type="text"
            name="bio"
            placeholder="Your Bio."
            {...register("bio", {
              minLength: {
                value: 5,
                message: "Bio must be at least 5 characters.",
              },
              maxLength: {
                value: 120,
                message: "Bio must be at most 120 characters.",
              },
              required: false,
            })}
            className="text-gray-700"
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="avatar.url">
            {" "}
            Avatar <span className="font-light text-gray-400">
              (Optional)
            </span>{" "}
          </Label>

          <Input
            type="text"
            name="avatar.url"
            placeholder="Image URL must be valid"
            defaultValue={"https://source.unsplash.com/random"}
            {...register("avatar.url")}
            className="text-gray-700"
          />
          <small className="font-light text-[13px] text-gray-400">
            Please add a valid URL or leave it untouched.
          </small>
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="banner.url">
            {" "}
            Banner <span className="font-light text-gray-400">
              (Optional)
            </span>{" "}
          </Label>

          <Input
            type="text"
            name="banner.url"
            placeholder="Image URL must be valid"
            defaultValue={"https://source.unsplash.com/random"}
            {...register("banner.url")}
            className="text-gray-700"
          />
          <small className="font-light text-[13px] text-gray-400">
            Please add a valid URL or leave it untouched.
          </small>
        </div>

        <div className="flex items-center space-x-2 gap-1">
          <input
            type="checkbox"
            className="checkbox checkbox-xs"
            id="venueManager"
            name="venueManager"
            value={isVenueManager}
            {...register("venueManager")}
            onChange={handleOnChange}
          />
          <Label
            htmlFor="venueManager"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Venue Manager
          </Label>
        </div>

        {isButtonLoading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" variant="secondary">
            Submit
          </Button>
        )}
      </form>

      <div className="flex flex-col gap-2 pt-10 p-4">
        <p className="text-xs text-center">
          By signing in or creating an account, you agree with our Terms &
          conditions and Privacy statement
        </p>
        <p className="text-xs text-center">
          All rights reserved. Copyright (2024) - Holidaze™
        </p>
      </div>

      <dialog id="my_modal_2" className="modal text-black">
        <div className="modal-box w-full h-[30%]  bg-white flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-xl">{modalMessage}</h1>
            <h2 className="font-bold text-lg py-5">
              Thank You For Registering
            </h2>
            <p className="py-4">Press ESC key or click outside to close</p>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={navigateOnSuccess}>close</button>
        </form>
      </dialog>
    </>
  );
}
