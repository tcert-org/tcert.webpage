"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import coursesJson from "@/lib/courses-carousel.json";
import { CourseCard } from "./course-card";

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

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full max-w-[100%] mx-auto px-[10%] xl:px-[20%] py-12">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 bg-[url('/bg-sections.jpeg')]"></div>

      {/* Overlay Content */}
      <div className="relative z-10 text-center mb-8  animation ">
        <h2 className="text-xl lg:text-3xl font-bold mb-2 text-[#27282B]">
          Nuestras Certificaciones Destacadas
        </h2>
        <p className="sm:text-sm lg:text-base text-[#27282B]">
          Obten acceso a nuestras certificaciones, garantizamos un progreso
          seguro y efectivo.
        </p>
      </div>

      {/* Mobile Carousel */}
      <div className="relative z-10 block md:hidden  ">
        <Carousel className="w-full" onSelect={setActiveSlide}>
          <CarouselContent>
            {courses.map((course) => (
              <CarouselItem key={course.id}>
                <CourseCard course={course} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-4">
            {courses.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeSlide ? "bg-purple-600" : "bg-gray-300"
                }`}
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
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>

      {/* Desktop Grid */}
      <div className="relative z-10 hidden md:grid md:grid-cols-3 gap-6 animation">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
