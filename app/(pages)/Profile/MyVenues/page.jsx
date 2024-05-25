import React from "react";
import MyVenues from "@/app/(components)/Venues/MyVenues";

export default function page() {
  return (
    <>
      <main className="flex flex-col justify-center items-center w-full ">
        <section className="flex w-full max-w-7xl justify-start  px-4">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a href="/Profile">Profile</a>
              </li>
              <li>My Venues</li>
            </ul>
          </div>{" "}
        </section>
        <section className="flex flex-col justify-center items-start p-4 w-full max-w-7xl">
          <h1 className="text-4xl py-4 font-bold">My Venues</h1>
          <section className="flex flex-col justify-center item-center w-full">
            <MyVenues />
          </section>
        </section>
      </main>
    </>
  );
}
