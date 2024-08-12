"use client";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Search from "./Search";

export default function Header() {
  const [windowPathName, setWindowPathName] = useState("");

  if (typeof window !== "undefined") {
  }
  useEffect(() => {
    const handlePathChange = () => {
      setWindowPathName(window.location.pathname);
    };

    // Listen for popstate events
    window.addEventListener("popstate", handlePathChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Navbar />
      {windowPathName !== "/Login" && (
        <div className="flex w-full justify-center items-center">
          <Search />
        </div>
      )}
    </div>
  );
}
