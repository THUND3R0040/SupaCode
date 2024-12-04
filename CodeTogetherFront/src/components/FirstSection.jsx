import React from "react";
import Svg from "./svg/Svg";
import LockSvg from "./svg/LockSvg";
import FlexibilitySvg from "./svg/FlexibilitySvg";
import LinkedNode from "./svg/LinkedNode";
import { Link } from "react-router-dom";

export default function FirstSection() {
  return (
    <section className="pt-8 container md:flex md:flex-row gap-8 md:max-h-96 justify-between">
      <div className="md:w-1/2 md:order-2 md:h-full md:max-h-96 flex flex-row justify-end">
        <Svg />
      </div>
      <div className="md:w-1/2 mt-6 md:mt-0 max-w-[476px]">
        <div className="pt-6 md:pt-0 text-[29px] leading-8 font-Sgro">
          Communicate. Collaborate. Create.
        </div>
        <div className="pt-6 md:pt-3 font-proxima leading-6 font-normal">
          WeDu provides an effective and powerful way to manage your projects
        </div>
        <div className="pt-6 md:pt-4 font-proxima text-[14px]">
          <div className="flex flex-row gap-8 items-center mb-6 md:mb-3">
            <div className="w-8 h-8">
              <LockSvg />
            </div>
            <p>Speed & Security</p>
          </div>
          <div className="flex flex-row gap-8 items-center mb-6 md:mb-3">
            <div className="w-8 h-8">
              <FlexibilitySvg />
            </div>
            <p>Flexibility & Scalability</p>
          </div>
          <div className="flex flex-row gap-8 items-center mb-6 md:mb-8">
            <div className="w-8 h-8">
              <LinkedNode />
            </div>
            <p>Better Collaboration</p>
          </div>
          <div>
            <button className="bg-sec text-white w-full h-full rounded-md border-[1px] border-black font-bold py-2 font-Sgro">
              <Link to="/register">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
