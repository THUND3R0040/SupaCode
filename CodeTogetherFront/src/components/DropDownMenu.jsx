import React from "react";
import User from "./svg/User";

export default function DropDownMenu() {
  return (
    <div className="h-screen fixed top-0 right-0 w-screen bg-white  pl-10 pt-8">
      <ul className="flex flex-col gap-3">
        <li className=" mb-7 flex flex-row items-center gap-4">
          <User />
          <p className="font-proxima">Login</p>
        </li>
        <li>
          <a
            href="/dashboard"
            className="text-black text-[22px] font-Sgro font-bold"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="/projects"
            className="text-black text-[22px] font-Sgro font-bold"
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="/profile"
            className="text-black text-[22px] font-Sgro font-bold"
          >
            Profile
          </a>
        </li>
        <li>
          <a
            href="/settings"
            className="text-black text-[22px] font-Sgro font-bold"
          >
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
}
