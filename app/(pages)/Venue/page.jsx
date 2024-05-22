import React from "react";
import Venues from "@/app/(components)/Venues/Venues";

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full py-24">
      <div className="flex justify-center items-center w-full max-w-7xl">

      <Venues />
      </div>
    </main>
  );
}
