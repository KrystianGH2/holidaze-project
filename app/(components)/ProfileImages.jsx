import Image from "next/image";
import React from "react";

export default function ProfileImages({ avatarUrl, avatarAlt }) {
  return (
    <>
      <div className="avatar">
        <div></div>

        <div className="w-[150px] rounded-full">
          <img
            alt={avatarAlt || "My Avatar"}
            src={avatarUrl}
          />
        </div>
      </div>
    </>
  );
}


