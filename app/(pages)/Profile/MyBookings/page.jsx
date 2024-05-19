import React from "react";
import MyBookings from "@/app/(components)/Bookings/MyBookings";
import { AuthProvider } from "@/app/Context/AuthContext";
import Profile from "@/app/(components)/Profile/Profile";

export default function page() {
  return (
    <div>
      <section>
        <AuthProvider>
          <Profile />
        </AuthProvider>
      </section>
      <MyBookings />
    </div>
  );
}
