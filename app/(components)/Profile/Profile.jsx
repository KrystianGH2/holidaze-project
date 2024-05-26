"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfileLogic } from "./ProfileLogic";
import ProfileImages from "../ProfileImages";
import { CiEdit } from "react-icons/ci";

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
    isLoggedIn,
    redirectUser,
  } = useProfileLogic();

  return (
    <>
      <main className="flex flex-col w-full justify-center items-center px-4 ">
        <section className="flex w-full max-w-7xl justify-start lg:px-8 pb-8">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Profile</a>
              </li>
              <li>My Profile</li>
            </ul>
          </div>{" "}
        </section>
        {isLoggedIn ? (
          <>
            <section className="flex flex-col w-full max-w-[1220px] justify-center items-center border pb-6 rounded-lg ">
              <h1 className="py-4 text-xl tracking-wider font-medium">
                Profile
              </h1>
              <ProfileImages
                avatarUrl={userInfo?.avatar?.url}
                avatarAlt={userInfo?.avatar?.alt}
                bannerAlt={userInfo?.banner?.alt}
                bannerUrl={userInfo?.banner?.url}
              />
              <Button
                className="my-4"
                variant="secondary"
                onClick={handleOnClick}
              >
                {isFormDisabled ? (
                  <>
                    <span className="flex justify-center items-center flex-row gap-2">
                      <p>Edit</p> <CiEdit className="text-lg" />
                    </span>
                  </>
                ) : (
                  "Cancel"
                )}
              </Button>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-xl flex  flex-col gap-4"
              >
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
            </section>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center rounded-md w-full border max-w-xl p-10 gap-4">
              <p>Please log in to continue</p>
              <Button
                variant="secondary"
                className="w-full max-w-[200px]"
                onClick={redirectUser}
              >
                Log in
              </Button>{" "}
            </div>
          </>
        )}
      </main>
    </>
  );
}
