import React from "react";

export default function ImageCard({ image, title, description }) {
  return (
    <div className="py-6 ">
      <div className="border-2 w-1/3  max-w-80   border-black rounded-md">
        <img src={`../../${image}`} className="w-full max-h-96" />
      </div>
      <div>
        <h1 className="font-Sgro text-[18px] font-bold w-1/2 pt-2">{title}</h1>
        <p className="font-proxima text-[15px] w-11/12 pt-2 pr-12 ">
          {description}
        </p>
      </div>
    </div>
  );
}
