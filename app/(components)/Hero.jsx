import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex w-full justify-center items-center pb-10">
      <div
        className="hero w-full min-h-[40vh]  "
        style={{
          backgroundImage:
            "url(https://www.momondo.no/himg/36/a9/22/expediav2-156303-2900327630-859269.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60 flex w-full justify-start"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Find your next stay</h1>
            <p className="mb-5">
              Search low prices on hotels, homes and much more...
            </p>
            <Button variant="secondary" className=" w-[200px] h-[45px]">
              <Link href={"/Venue"}>Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
