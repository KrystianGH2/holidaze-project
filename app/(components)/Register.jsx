"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "@/lib/constants";
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register() {
  const URL = process.env.APP_API_URL;
  const { toast } = useToast();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(formSchema) });
  const [isVenueManager, setIsVenueManager] = useState(false);
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
      if (!res.ok) {
        throw new Error("Error! Failed to register user.", res.statusText);
      }

      const responseData = await res.json();
      toast({
        title: `Welcome ${
          responseData.data.name.charAt(0).toUpperCase() +
          responseData.data.name.slice(1)
        }! You are now registered.`,
        description: "Redirecting to Login.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });

      setTimeout(() => {
        reset();
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          toast({
            title: `Welcome USERNAME! You are now registered.`,
            description: "Redirecting to Login.",
            action: (
              <ToastAction altText="Goto schedule to undo">Close</ToastAction>
            ),
          });
        }}
      >
        Click me
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-[400px] gap-2"
      >
        <div className="flex flex-col gap-3">
          <Label htmlFor="name">Name</Label>

          <Input
            type="text"
            placeholder="Your name"
            {...register("name", {
              required: "Name is required.",
            })}
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
                value: 6,
                message: "Password must be at least 6 characters.",
              },
              maxLength: {
                value: 20,
                message: "Password must be at most 20 characters.",
              },
            })}
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
            })}
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
            placeholder="https://img.service.com/avatar.jpg"
            {...register("avatar.url")}
          />
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
            placeholder="https://img.service.com/avatar.jpg"
            {...register("banner.url")}
          />
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
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
