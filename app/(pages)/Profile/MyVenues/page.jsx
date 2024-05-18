import React from "react";
import MyVenues from "@/app/(components)/Venues/MyVenues";

export default function page() {
  return (
    <div>
      <h1 className="text-2xl py-4 font-bold">My Venues</h1>
      <section>
        <MyVenues />
      </section>
    </div>
  );
}
