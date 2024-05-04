import React from "react";
import { Button } from "@/components/ui/button";

export default function RedirectModal({ message, redirectUser }) {
  return (
    <div>
      <dialog id="my_modal_3" className="modal text-black">
        <div className="modal-box w-full h-[30%] bg-white flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-xl py-5">{message}</h1>
            <div className="flex flex-row justify-center items-center"></div>
            <Button onClick={redirectUser}>Login</Button>
            <p className="py-4">Press ESC key or click outside to Cancel</p>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
