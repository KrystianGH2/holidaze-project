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
      <main className="flex flex-col justify-center items-center w-full gap-10">
        <Profile />
        {isUserVenueManager ? (
          <>
            <div className="flex flex-col gap-4 justify-center items-center border w-full max-w-[1220px] rounded-md py-4">
              <section>
                <CreateVenue />
              </section>
              <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
                <section className="border p-2 rounded-md hover:bg-blue-100 cursor-pointer w-[120px] flex justify-center">
                  <Link href={"/Profile/MyVenues"}>My Venues</Link>
                </section>
                <section className="border p-2 rounded-md hover:bg-blue-100 cursor-pointer  w-[120px] flex justify-center">
                  <Link href={"/Profile/MyBookings"}>My Bookings</Link>
                </section>{" "}
              </div>
            </div>
          </>
        ) : (
          <>
            <p>Register as a venue manager to continue.</p>
          </>
        )}
      </main>
    </>
  );
}
