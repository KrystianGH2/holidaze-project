import React from "react";
import Profile from "@/app/(components)/Profile/Profile";
import { AuthProvider } from "@/app/Context/AuthContext";
import MyVenues from "@/app/(components)/Venues/MyVenues";

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
