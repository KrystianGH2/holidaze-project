"use client";
import React from "react";
import Profile from "@/app/(components)/Profile/Profile";
import Link from "next/link";
import CreateVenue from "@/app/(components)/Modal/Venue/createVenue";
import { useAuth } from "@/app/Context/AuthContext";

export default function ProfilePage() {
  const { isUserVenueManager } = useAuth();
  return (
    <>
      <main className="flex flex-col justify-center items-center w-full">
        <Profile />
        {isUserVenueManager && (
          <>
            <div className="flex flex-col gap-4 justify-center items-center border w-full max-w-[1220px] rounded-md py-4 border-gray-700">
              <section>
                <CreateVenue />
              </section>
              <section>
                <Link href={"/Profile/MyVenues"}>My Venues</Link>
              </section>
              <section>
                <Link href={"/Profile/MyBookings"}>My Bookings</Link>
              </section>{" "}
            </div>
          </>
        )}
      </main>
    </>
  );
}
