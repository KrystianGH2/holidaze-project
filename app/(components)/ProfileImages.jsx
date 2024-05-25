import Image from "next/image";
import React from "react";

export default function ProfileImages({
  avatarUrl,
  avatarAlt,
  bannerAlt,
  bannerUrl,
}) {
  return (
    <>
      <div className="avatar w-full justify-center items-center flex flex-col relative pb-[100px]">
        <div className="w-full h-[300px] max-w-7xl lg:px-8 ">
          <img alt={bannerAlt || "My Avatar"} src={bannerUrl} />
        </div>

        <div className="w-[180px] absolute translate-y-[150px]">
          <img
            className="mask mask-circle"
            src={avatarUrl}
            alt={avatarAlt || "My Avatar"}
          />
        </div>
      </div>
    </>
  );
}
