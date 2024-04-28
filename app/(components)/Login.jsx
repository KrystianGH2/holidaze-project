"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/lib/constants";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function Login() {
  const URL = process.env.APP_API_URL;
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const res = await fetch(`${URL}auth/login`, options);

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData.errors[0].message;
        return toast({
          title: "Something went wrong!",
          description: errorMessage,
          variant: "destructive",
          duration: 3000,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      }
      const responseData = await res.json();
       Cookies.set("userData", JSON.stringify(responseData.data), {
         secure: true,
         sameSite: "strict",
       });
      const userName =
        responseData.data.name.charAt(0).toUpperCase() +
        responseData.data.name.slice(1);

         setTimeout(() => {
           router.push("/");
         }, 1500);
         
      return toast({
        title: `Logged In as: ${userName}`,
        duration: 2000,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-[400px] gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            className="text-gray-700"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
            className="text-gray-700"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>
        <Button variant="secondary" type="submit">
          Login
        </Button>
      </form>
    </>
  );
}
