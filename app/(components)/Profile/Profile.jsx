"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfileLogic } from "./ProfileLogic";
import ProfileImages from "../ProfileImages";

export default function Profile() {
  const {
    userInfo,
    isFormDisabled,
    register,
    handleSubmit,
    handleOnClick,
    handleOnChange,
    onSubmit,
    isVenueManager,
  } = useProfileLogic();

  return (
    <>
      <h1>Profile</h1>
      <ProfileImages
        avatarUrl={userInfo?.avatar?.url}
        avatarAlt={userInfo?.avatar?.alt}
      />

      <Button onClick={handleOnClick}>
        {isFormDisabled ? "Edit" : "Cancel"}
      </Button>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            disabled
            className="text-gray-700"
            {...register("name", { required: true })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            disabled
            className="text-gray-700"
            {...register("email", { required: true })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="bio">Bio</Label>

          <Input
            disabled={isFormDisabled}
            className="text-gray-700"
            placeholder="Add bio"
            {...register("bio")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="avatar.url">Avatar</Label>

          <Input
            disabled={isFormDisabled}
            className="text-gray-700"
            {...register("avatar.url")}
          />
          {!isFormDisabled && (
            <small className="font-light text-[13px] text-gray-400">
              Please add a valid URL or leave it untouched.
            </small>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="banner.url">Banner</Label>

          <Input
            disabled={isFormDisabled}
            className="text-gray-700"
            {...register("banner.url")}
          />
          {!isFormDisabled && (
            <small className="font-light text-[13px] text-gray-400">
              Please add a valid URL or leave it untouched.
            </small>
          )}
        </div>

        <div className="flex items-center space-x-2 gap-1">
          <input
            disabled={isFormDisabled}
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

        <Button variant="secondary" size="lg" disabled={isFormDisabled}>
          Submit
        </Button>
      </form>
    </>
  );
}
