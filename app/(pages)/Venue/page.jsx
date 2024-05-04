import React from "react";
import Venues from "@/app/(components)/Venues/Venues";
import { AuthProvider } from "@/app/Context/AuthContext";
import CreateVenue from "@/app/(components)/Modal/Venue/createVenue";
export default function page() {
  return (
    <div>
      <AuthProvider>
        <CreateVenue />
      </AuthProvider>
      <Venues />
    </div>
  );
}
