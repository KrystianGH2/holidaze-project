import React from "react";
import Login from "@/app/(components)/Login";
import Link from "next/link";

export default function page() {
  return (
    <main className="flex justify-center flex-col items-center">
      <div className="pb-10">
        <h1 className="text-xl font-bold">Log in or Create an account</h1>
      </div>
      <Login />

      <div className="flex flex-col gap-2 pt-5">
        <p className="text-sm text-center">Don`t have an account?</p>
        <Link href="/Register" className="hover:underline">
          <p className="text-sm text-center">Create an account</p>
        </Link>
      </div>

      <div className="flex flex-col gap-2 pt-10 p-4">
        <p className="text-xs text-center">
          By signing in or creating an account, you agree with our Terms &
          conditions and Privacy statement
        </p>
        <p className="text-xs text-center">
          All rights reserved. Copyright (2024) - Booking™
        </p>
      </div>
    </main>
  );
}
