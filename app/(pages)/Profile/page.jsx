import React from "react";
import Profile from "@/app/(components)/Profile/Profile";
import { AuthProvider } from "@/app/Context/AuthContext";

export default function page() {
  return (
    <>
      <AuthProvider>
        <Profile />
      </AuthProvider>
    </>
  );
}
