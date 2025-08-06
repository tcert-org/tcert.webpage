"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import coursesJson from "@/lib/courses-carousel.json";
import { CourseCard } from "./course-card";
import { motion, AnimatePresence } from "framer-motion";

export interface Course {
  id: number;
  title: string;
  image: string;
  date: string;
  students: number;
  description: string;
  originalPrice: number;
  currentPrice: number;
}

const courses: Course[] = coursesJson;

export default function CourseCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const handleSlideChange = () => {
      const activeSlide = document.querySelector('[data-active="true"]');
      if (activeSlide) {
        const index = activeSlide?.parentElement?.children
          ? Array.from(activeSlide.parentElement.children).indexOf(activeSlide)
          : -1;
        setActiveSlide(index);
      }
    };

    const observer = new MutationObserver(handleSlideChange);
    const carouselElement = document.querySelector(
      '[role="region"][aria-roledescription="carousel"]'
    );

    if (carouselElement) {
      observer.observe(carouselElement, { attributes: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[100%] mx-auto px-[10%] xl:px-[20%] py-12 overflow-hidden">
      {/* Fondo cyberpunk futurista */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950 to-black opacity-95"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-purple-900/30 to-pink-950/20"></div>

      {/* Grid futurista de fondo */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="futuristicGrid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="#00ffff"
                strokeWidth="0.1"
              />
            </pattern>
            <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffff00" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#futuristicGrid)" />
        </svg>
      </div>

      {/* Partículas flotantes futuristas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Líneas de energía pulsantes */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        viewBox="0 0 1000 600"
      >
        <defs>
          <linearGradient id="energyLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1="0"
            y1={100 + i * 100}
            x2="1000"
            y2={120 + i * 100}
            stroke="url(#energyLine)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </svg>

      {/* Título con efecto holográfico */}
      <div className="relative z-10 text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <h2 className="text-xl lg:text-3xl font-bold mb-2 text-white">
            Nuestras Certificaciones Destacadas
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="sm:text-sm lg:text-base text-cyan-200"
          style={{
            textShadow: "0 0 5px #00ffff",
          }}
        >
          Accede a certificaciones de próxima generación con tecnología avanzada
        </motion.p>
      </div>

      {/* Versión móvil con efectos futuristas */}
      <div className="relative z-10 block md:hidden">
        <div className="relative">
          {/* Marco holográfico para móvil */}
          <div className="absolute inset-0 rounded-2xl border border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.3)] animate-pulse"></div>

          <Carousel className="w-full">
            <CarouselContent>
              <AnimatePresence>
                {courses.map((course) => (
                  <CarouselItem key={course.id}>
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      style={{ perspective: "1000px" }}
                    >
                      <CourseCard course={course} />
                    </motion.div>
                  </CarouselItem>
                ))}
              </AnimatePresence>
            </CarouselContent>
          </Carousel>
        </div>

        {/* Indicadores futuristas */}
        <div className="flex justify-center gap-3 mt-6">
          {courses.map((_, index) => (
            <motion.button
              key={index}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? "bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.7)]"
                  : "bg-gray-600 hover:bg-purple-500"
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const carouselItems = document.querySelectorAll(
                  "[data-carousel-item]"
                );
                if (carouselItems[index]) {
                  carouselItems[index].scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                  });
                }
              }}
            >
              {index === activeSlide && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping"
                  layoutId="activeIndicator"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Versión desktop con grid 3D futurista */}
      <div className="relative z-10 hidden md:block">
        {/* Marco holográfico principal */}
        <div className="absolute inset-0 rounded-3xl border-2 border-gradient-to-r from-cyan-400/50 via-purple-500/50 to-pink-400/50 shadow-[0_0_40px_rgba(0,255,255,0.2)] animate-pulse"></div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 p-8"
          style={{ perspective: "1200px" }}
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{
                opacity: 0,
                y: 50,
                rotateX: -20,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50,
                transition: { duration: 0.3 },
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
              className="relative group"
            >
              {/* Efecto de escaneo láser */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -skew-x-12"
                animate={{ x: [-100, 400] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />

              {/* Partículas orbitales por card */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                    animate={{
                      x: Math.cos((i * 60 * Math.PI) / 180) * 100,
                      y: Math.sin((i * 60 * Math.PI) / 180) * 100,
                      rotate: 360,
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Efectos de luz ambiental */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(6, 182, 212, 0.2) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)",
        }}
      ></div>
    </div>
  );
}
