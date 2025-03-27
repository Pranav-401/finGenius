"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { AuroraText } from "@/components/magicui/aurora-text";

const HeroSection = () => {
  const imageRef = useRef();

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll); //when unmounted
  }, []);

  return (
    <div className="pb-20 px-4 bg-black overflow-x-hidden h-[578px]" >
      <div className="container mx-auto text-center ">
      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[105px] pb-6 gradient-title mt-20 text-center leading-tight">
  <AuroraText>Master Your Money</AuroraText> <br />
  <AuroraText>with Smart Insights</AuroraText>
</h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        A smart AI-powered financial platform that helps you track, analyze, and optimize your spending with real-time insights.
        </p>
        
        <div className="hero-image-wrapper">
          <div ref={imageRef} className="hero-image">
            {/* <Image
              src={"/banner-coinly.jpg"}
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-2xl shadow-2xl border mx-auto"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
