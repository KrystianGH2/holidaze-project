import React from "react";
import Register from "@/app/(components)/Register";

export default function page() {
  return (
    <main className="flex flex-col justify-center w-full items-center">
      <div className="pb-10">
        <h1 className="text-xl font-bold">Register</h1>
      </div>
      <Register />
    </main>
  );
}
