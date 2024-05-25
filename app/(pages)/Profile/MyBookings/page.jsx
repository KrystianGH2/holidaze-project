import React from "react";
import MyBookings from "@/app/(components)/Bookings/MyBookings";

export default function page() {
  return (
    <div className="flex flex-col justify-center items-center w-full p-4">
      <div className="flex justify-start items-start w-full max-w-[1220px]">
        <h1 className="text-4xl py-4  font-bold">My Bookings</h1>
      </div>
      <div className="flex justify-start items-start w-full max-w-[1220px] pt-10">
        <MyBookings />
      </div>
    </div>
  );
}
