import React from "react";
import MyVenues from "@/app/(components)/Venues/MyVenues";
import { AuthProvider } from "@/app/Context/AuthContext";
import Profile from "@/app/(components)/Profile/Profile";

export default function page() {
  return (
    <>
      <AuthProvider>
        <Profile />
      </AuthProvider>
      <h1 className="text-2xl py-4 font-bold">My Venues</h1>
      <section>
        <MyVenues />
      </section>
    </>
  );
}
