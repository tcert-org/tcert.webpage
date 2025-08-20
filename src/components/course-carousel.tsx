"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
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

// Interface para los datos de la API
interface Certification {
  id: number;
  name: string;
  description: string;
  logo_url: string;
  active: boolean;
}

interface CertificationParam {
  id: number;
  name: string;
  value: string;
}

interface ApiResponse {
  statusCode: number;
  data: {
    params: CertificationParam[];
    certifications: Certification[];
    totalCertifications: number;
    timestamp: string;
  };
  message: string;
}

export default function CourseCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [desktopActiveSlide, setDesktopActiveSlide] = useState(0);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [desktopCarouselApi, setDesktopCarouselApi] =
    useState<CarouselApi | null>(null);

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Rastrear cambios en el carrusel móvil
  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on("select", () => {
      setActiveSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  // Rastrear cambios en el carrusel desktop
  useEffect(() => {
    if (!desktopCarouselApi) return;

    desktopCarouselApi.on("select", () => {
      setDesktopActiveSlide(desktopCarouselApi.selectedScrollSnap());
    });
  }, [desktopCarouselApi]);

  // Auto-play del carrusel cada 10 segundos
  useEffect(() => {
    if (!mounted || courses.length === 0) {
      return;
    }

    // Auto-play para móvil
    let mobileInterval: NodeJS.Timeout | null = null;
    if (carouselApi) {
      mobileInterval = setInterval(() => {
        carouselApi.scrollNext();
      }, 10000);
    }

    // Auto-play para desktop
    let desktopInterval: NodeJS.Timeout | null = null;
    if (desktopCarouselApi) {
      desktopInterval = setInterval(() => {
        desktopCarouselApi.scrollNext();
      }, 10000);
    }

    return () => {
      if (mobileInterval) clearInterval(mobileInterval);
      if (desktopInterval) clearInterval(desktopInterval);
    };
  }, [carouselApi, desktopCarouselApi, mounted, courses.length]);

  // Función para convertir certificaciones a formato de curso
  const convertCertificationToCourse = (
    cert: Certification,
    params: CertificationParam[]
  ): Course => {
    // Obtener valores de la API para precios
    const basePrice =
      params.find((p) => p.name.includes("Valor de certificación"))?.value ||
      "30";
    const discountPercent =
      params.find((p) => p.name.includes("Porcentaje de Descuento"))?.value ||
      "20";

    const basePriceUSD = Number.parseFloat(basePrice);
    const discountPercentNum = Number.parseFloat(discountPercent);

    // El precio base de la API es el precio original
    const originalPrice = Math.max(0, Math.round(basePriceUSD));

    // Calculamos el precio con descuento, evitando negativos y redondeando
    const rawDiscounted =
      basePriceUSD * (1 - (isNaN(discountPercentNum) ? 0 : discountPercentNum) / 100);
    const currentPrice = Math.max(0, Math.round(rawDiscounted));

    // Generar un número de estudiantes determinístico basado en el ID
    const studentCount = ((cert.id * 73) % 400) + 100; // Entre 100-500

    // Manejar la URL del logo - asegurar que esté en la carpeta public
    let logoPath = "/cert-images/scrum-foundation.svg"; // fallback
    if (cert.logo_url) {
      if (!cert.logo_url.startsWith("http") && !cert.logo_url.startsWith("/")) {
        logoPath = `/cert-images/${cert.logo_url}`;
      } else if (cert.logo_url.startsWith("/")) {
        logoPath = cert.logo_url;
      } else {
        logoPath = "/cert-images/scrum-foundation.svg";
      }
    }

    // Fallback específico por tipo de certificación si el logo no existe
    const lowerName = cert.name.toLowerCase();
    if (logoPath === "/cert-images/scrum-foundation.svg") {
      if (lowerName.includes("scrum master")) {
        logoPath = "/cert-images/scrum-master.svg";
      } else if (lowerName.includes("scrum developer")) {
        logoPath = "/cert-images/scrum-developers.svg";
      }
    }

    return {
      id: cert.id,
      title: cert.name,
      image: logoPath,
      date: "",
      students: studentCount,
      description: cert.description,
      originalPrice,
      currentPrice,
    };
  };

  // Fetch de datos de la API
  useEffect(() => {
    if (!mounted) return; // Solo hacer fetch después de montar

    const fetchCertifications = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/certifications");

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const apiData: ApiResponse = await response.json();

        if (apiData.statusCode === 200 && apiData.data?.certifications) {
          const convertedCourses = apiData.data.certifications.map((cert) =>
            convertCertificationToCourse(cert, apiData.data.params)
          );
          setCourses(convertedCourses);
        } else {
          throw new Error(
            apiData.message || "Error al obtener certificaciones"
          );
        }
      } catch (err) {
        console.error("Error fetching certifications:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, [mounted]);

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

  // No renderizar nada hasta que el componente esté montado (evita hidratación)
  if (!mounted) {
    return (
      <div className="relative w-full max-w-[100%] mx-auto px-[10%] xl:px-[20%] py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-purple-800/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_70%)]"></div>

        <div className="relative z-10 text-center mb-8">
          <h2 className="text-xl lg:text-3xl font-bold mb-2 text-white">
            Nuestras Certificaciones Destacadas
          </h2>
          <p className="sm:text-sm lg:text-base text-white/80">
            Accede a certificaciones de próxima generación con tecnología
            avanzada
          </p>
        </div>

        <div className="relative z-10 text-center py-12">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
          <p className="text-white/70">Cargando certificaciones...</p>
        </div>
      </div>
    );
  }

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

      {/* Estados de loading y error */}
      {loading && (
        <div className="relative z-10 text-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-white/70">Cargando certificaciones...</p>
        </div>
      )}

      {error && (
        <div className="relative z-10 text-center py-12">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-400 mb-2">Error al cargar certificaciones</p>
            <p className="text-red-300/70 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Contenido principal - solo se muestra si no hay loading ni error */}
      {!loading && !error && courses.length > 0 && (
        <>
          {/* Versión móvil */}
          <div className="relative z-10 block md:hidden">
            <div className="relative">
              <Carousel
                className="w-full"
                setApi={setCarouselApi}
                opts={{
                  loop: true,
                  duration: 30, // Transición más suave
                }}
              >
                <CarouselContent>
                  <AnimatePresence>
                    {courses.map((course) => (
                      <CarouselItem key={course.id}>
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{
                            duration: 0.8,
                            type: "spring",
                            stiffness: 80,
                            damping: 20,
                          }}
                        >
                          <CourseCard course={course} />
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </AnimatePresence>
                </CarouselContent>

                {/* Flechas de navegación para móvil */}
                <CarouselPrevious className="-left-6 bg-purple-600/80 border-purple-500 hover:bg-purple-500 text-white" />
                <CarouselNext className="-right-6 bg-purple-600/80 border-purple-500 hover:bg-purple-500 text-white" />
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
                    if (carouselApi) {
                      carouselApi.scrollTo(index);
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Versión desktop con carrusel de 3 elementos */}
          <div className="relative z-10 hidden md:block">
            <Carousel
              className="w-full"
              setApi={setDesktopCarouselApi}
              opts={{
                loop: true,
                duration: 30, // Transición más suave
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {/* Agrupar certificaciones de 3 en 3 */}
                {Array.from(
                  { length: Math.ceil(courses.length / 3) },
                  (_, groupIndex) => (
                    <CarouselItem key={groupIndex} className="pl-2 md:pl-4">
                      <div className="grid grid-cols-3 gap-6">
                        {courses
                          .slice(groupIndex * 3, (groupIndex + 1) * 3)
                          .map((course, index) => (
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
                                duration: 1.0,
                                delay: index * 0.15,
                                type: "spring",
                                stiffness: 80,
                                damping: 20,
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
                      </div>
                    </CarouselItem>
                  )
                )}
              </CarouselContent>

              {/* Flechas de navegación para desktop */}
              <CarouselPrevious className="-left-16 bg-purple-600/80 border-purple-500 hover:bg-purple-500 text-white w-12 h-12" />
              <CarouselNext className="-right-16 bg-purple-600/80 border-purple-500 hover:bg-purple-500 text-white w-12 h-12" />

              {/* Indicadores para desktop */}
              <div className="flex justify-center gap-3 mt-8">
                {Array.from(
                  { length: Math.ceil(courses.length / 3) },
                  (_, index) => (
                    <motion.button
                      key={index}
                      className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                        index === desktopActiveSlide
                          ? "bg-purple-500 shadow-lg"
                          : "bg-gray-600 hover:bg-purple-300"
                      }`}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (desktopCarouselApi) {
                          desktopCarouselApi.scrollTo(index);
                        }
                      }}
                    />
                  )
                )}
              </div>
            </Carousel>
          </div>
        </>
      )}

      {/* Estado cuando no hay certificaciones */}
      {!loading && !error && courses.length === 0 && (
        <div className="relative z-10 text-center py-12">
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-white/70 mb-2">
              No hay certificaciones disponibles
            </p>
            <p className="text-white/50 text-sm">Intenta recargar la página</p>
          </div>
        </div>
      )}

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
