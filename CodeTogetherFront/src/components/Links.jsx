import React from "react";
import User from "./svg/User";
import { Link } from "react-router-dom";

export default function Links() {
  return (
    <li className="hidden md:block">
      <ul className="flex flex-row gap-4 items-center">
        <li>
          <Link to="/" className="font-proxima ">
            Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="font-proxima ">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/" className="font-proxima ">
            Pricing
          </Link>
        </li>
        <li>
          <Link to="/" className="font-proxima ">
            Contact
          </Link>
        </li>
        <li className="flex flex-row items-center gap-1">
          <Link to="/login" className="font-proxima ">
            Log In
          </Link>
          <User height="28" width="28" />
        </li>
        <li>
          <button className="bg-pr w-full h-full rounded-md border-[1px] border-black  py-1 font-Sgro font-bold px-2">
            <Link to="/register">Get Stared</Link>
          </button>
        </li>
      </ul>
    </li>
  );
}
