import React from "react";
import User from "./svg/User";

export default function Links() {
  return (
    <li className="hidden md:block">
      <ul className="flex flex-row gap-4 items-center">
        <li>
          <a href="/" className="font-proxima ">
            Home
          </a>
        </li>
        <li>
          <a href="/" className="font-proxima ">
            Features
          </a>
        </li>
        <li>
          <a href="/" className="font-proxima ">
            Pricing
          </a>
        </li>
        <li>
          <a href="/" className="font-proxima ">
            Contact
          </a>
        </li>
        <li className="flex flex-row items-center gap-1">
          <a href="/" className="font-proxima ">
            Log In
          </a>
          <User height="28" width="28" />
        </li>
        <li>
          <button className="bg-pr w-full h-full rounded-md border-[1px] border-black  py-1 font-Sgro font-bold px-2">
            Get Stared
          </button>
        </li>
      </ul>
    </li>
  );
}
