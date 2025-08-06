"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import DotSquare from "./dot-square";
import HeroCarousel from "./hero-carousel";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
    <section className="relative h-[90vh] lg:h-[120vh] max-w-[99%] mx-auto bg-gradient-to-b from-white via-sky-100 to-transparent flex flex-col justify-center overflow-hidden">
      {/* DotSquares */}
      <span className="hidden lg:block">
        <DotSquare top="20%" left="15%" color="#A78BFA" />
        <DotSquare top="15%" right="15%" color="#A78BFA" />
      </span>

      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-2xl sm:text-3xl lg:text-5xl mb-4 font-bold tracking-tight text-[#0B001A]"
        >
          TU RUTA HACIA UNA MEJOR <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-light text-[#303030]"
          >
            VERSIÓN DE TI MISMO
          </motion.span>
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Button
            size="lg"
            className="relative overflow-hidden group mt-4 xl:mb-32 mb-10"
            onClick={() => handleScroll("courses")}
          >
            <span className="relative z-10">EXPLORAR CERTIFICACIONES →</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <HeroCarousel />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
