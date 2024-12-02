import React from "react";
import BgSvg from "./svg/BgSvg";

export default function IntroSection() {
  return (
    <section className="mt-10">
      <BgSvg />
      <div className="bg-pr py-8 md:pb-14">
        <div className="container py-5  md:flex md:flex-row md:gap-24">
          <h1 className="text-2xl font-Sgro md:w-full">
            With the Right Software, Great Things Can Happen
          </h1>
          <p className="text-[15px] font-proxima  py-5 md:py-0 md:mx-6">
            I'm a paragraph. Click here to add your own text and edit me. It’s
            easy. Just click “Edit Text” or double click me to add your own
            content and make changes to the font. Feel free to drag and drop me
            anywhere you like on your page. I’m a great place for you to tell a
            story and let your users know a little more about you.
          </p>
        </div>
      </div>
    </section>
  );
}
