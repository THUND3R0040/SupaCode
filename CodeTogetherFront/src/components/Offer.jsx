import React from "react";
import ImageCard from "./ImageCard";
import DifferentUsers from "./svg/DifferentUsers";
import AllInOne from "./svg/AllInOne";
import Integrated from "./svg/Integrated";
import TotalDesign from "./svg/TotalDesign";

const data = [
  {
    image: "Artboard 48 copy 4_5x-100.jpg",
    title: "Workflows That Work",
    description:
      "I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you.",
  },
  {
    image: "Artboard 48 copy 7_5x-100.jpg",
    title: "All-In-One Solution",
    description:
      "I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you.",
  },
  {
    image: "Artboard 48 copy 5_5x-100.jpg",
    title: "Comprehensive Customer Support",
    description:
      "I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you.",
  },
  {
    image: "Artboard 48 copy 6_5x-100.jpg",
    title: "Smart Automation Tools",
    description:
      "I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you.",
  },
];

export default function Offer() {
  return (
    <section className="container">
      <div className="mt-16">
        <h2 className="font-Sgro text-2xl pb-4 ">What We Offer</h2>
        <p className="text-[15px] font-proxima md:w-1/2">
          I'm a paragraph. Click here to add your own text and edit me. It’s
          easy. Just click “Edit Text” or double click me to add your own
          content and make changes to the font.
        </p>
      </div>
      <div className="mt-16  md:grid md:gap-4 md:grid-minmax_400_1fr">
        {data.map((item, index) => (
          <ImageCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

      <div className="mt-16 md:flex md:flex-row md:gap-8 md:max-h-96">
        <div className="md:w-1/2  md:h-full md:max-h-96">
          <DifferentUsers />
        </div>
        <div className="md:w-1/2  md:mt-0">
          <h1 className="mt-6  md:mt-0 text-[23px] font-Sgro">
            Built for Creatives, by Creatives
          </h1>
          <p className="font-proxima mt-2 ">
            I'm a paragraph. Click here to add your own text and edit me. It’s
            easy. Just click “Edit Text” or double click me to add your own
            content and make changes to the font.I'm a great place for you to
            tell a story and let your users know a little more about you.
          </p>
          <div className="flex flex-row gap-2 items-center mt-6 md:mt-3">
            <div className="w-8 h-8">
              <AllInOne />
            </div>
            <p className="flex flex-col font-proxima text-[13px]">
              <span>All-In-One</span>
              <span>Toolkit</span>
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center mt-6 md:mt-3">
            <div className="w-8 h-8">
              <Integrated />
            </div>
            <p className="flex flex-col font-proxima text-[13px]">
              <span>Integrated</span>
              <span>File Sharing</span>
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center mt-6 md:mt-3">
            <div className="w-8 h-8">
              <TotalDesign />
            </div>
            <p className="flex flex-col font-proxima text-[13px]">
              <span>Total Design</span>
              <span>Freedom</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
