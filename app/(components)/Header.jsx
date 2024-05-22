import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Navbar />
      <Search />
    </div>
  );
}
