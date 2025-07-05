"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { Button } from "@/components/ui/button";
import DotSquare from "./dot-square";
import HeroCarousel from "./hero-carousel";
import { usePathname, useRouter } from "next/navigation";

const Hero: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const handleScroll = (sectionId: string) => {
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <section className="h-[90vh] lg:h-[130vh] xl:h-[120vh] max-w-[99%] mx-auto bg-gradient-to-b from-white via-sky-100 to-transparent flex flex-col justify-center">
      <span className="xs:hidden sm:hidden lg:block">
        <DotSquare top="20%" left="15%" />
        <DotSquare top="15%" right="15%" />
      </span>
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl mb-4 font-bold tracking-tight text-[#0B001A]">
          TU RUTA HACIA UNA MEJOR <br />
          <span className="font-light text-[#303030]">VERSIÓN DE TI MISMO</span>
        </h1>
        <Button size="lg" variant="default" className="mt-4 xl:mb-32 mb-10" onClick={() => {handleScroll("courses");}}>
          EXPLORAR CERTIFICACIONES →
        </Button>
        <HeroCarousel />
      </div>
    </section>
  );
};

export default Hero;
