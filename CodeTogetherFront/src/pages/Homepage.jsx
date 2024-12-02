import FirstSection from "@/components/FirstSection";
import IntroSection from "@/components/IntroSection";
import Navbar from "@/components/Navbar";
import Offer from "@/components/Offer";
import React from "react";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <FirstSection />
      <IntroSection />
      <Offer />
    </>
  );
}
