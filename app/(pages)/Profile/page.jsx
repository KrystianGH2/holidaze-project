import React from "react";
import Profile from "@/app/(components)/Profile/Profile";
import { AuthProvider } from "@/app/Context/AuthContext";
import Link from "next/link";

export default function page() {
  return (
    <>
      <AuthProvider>
        <Profile />
      </AuthProvider>

      <section>
        <Link href={"/Profile/MyVenues"}>My Venues</Link>
      </section>

      <section>
        <Link href={"/Profile/MyBookings"}>My Bookings</Link>
      </section>
    </>
  );
}
