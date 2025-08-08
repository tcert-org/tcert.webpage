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
      {/* Fondo integrado que continúa desde la página principal */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
      
      {/* Efectos sutiles púrpura */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-purple-800/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_70%)]"></div>

      {/* Título principal */}
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
          className="sm:text-sm lg:text-base text-white/80"
        >
          Accede a certificaciones de próxima generación con tecnología avanzada
        </motion.p>
      </div>

      {/* Versión móvil */}
      <div className="relative z-10 block md:hidden">
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              <AnimatePresence>
                {courses.map((course) => (
                  <CarouselItem key={course.id}>
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      <CourseCard course={course} />
                    </motion.div>
                  </CarouselItem>
                ))}
              </AnimatePresence>
            </CarouselContent>
          </Carousel>
        </div>

        {/* Indicadores simples */}
        <div className="flex justify-center gap-3 mt-6">
          {courses.map((_, index) => (
            <motion.button
              key={index}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? "bg-purple-500 shadow-lg"
                  : "bg-gray-600 hover:bg-purple-300"
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
            />
          ))}
        </div>
      </div>

      {/* Versión desktop con grid limpio */}
      <div className="relative z-10 hidden md:block">
        <motion.div className="grid md:grid-cols-3 gap-8 p-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{
                opacity: 0,
                y: 50,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
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
                transition: { duration: 0.3 },
              }}
              className="relative group"
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Efectos de luz ambiental sutiles */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 rounded-full blur-xl opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.2) 0%, rgba(237, 98, 60, 0.1) 50%, transparent 100%)",
        }}
      ></div>
    </div>
  );
}
