"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";


// ===== Tipos =====
type Certification = {
  id: number;
  name: string;
  description: string;
  logo_url: string;
  active: boolean;
};

type CertificationParam = {
  id: number;
  name: string;
  value: string;
};

type ApiResponse = {
  statusCode: number;
  data: {
    params: CertificationParam[];
    certifications: Certification[];
    totalCertifications: number;
    timestamp: string;
  };
  message: string;
};

// Datos que renderiza el detalle
type CourseDetailData = {
  id: number;
  title: string;
  description?: string;
  image?: string;
  certImage?: string;
  date?: string;
  students?: number;
  originalPrice?: number;
  currentPrice?: number;
  mainTopics?: string[];
  targetAudience?: string[];
};

// Datos para los testimonios
type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number; // 1-5
};

import { TestimonialsCarousel } from "@/components/testimonials-carousel";

// Mock data para testimonios
const mockTestimonials: Testimonial[] = [
  // ... (puedes mantener tu array mockTestimonials sin cambios)
];

// ===== Conversión igual que en el carrusel =====
const convertCertificationToCourse = (
  cert: Certification,
  params: CertificationParam[]
): CourseDetailData => {
  const basePrice =
    params.find((p) => p.name.includes("Valor de certificación"))?.value || "30";
  const discountPercent =
    params.find((p) => p.name.includes("Porcentaje de Descuento"))?.value || "20";

  const basePriceUSD = parseInt(basePrice);
  const discountPercentNum = parseInt(discountPercent);

  const originalPrice = basePriceUSD;
  const currentPrice = Math.round(basePriceUSD * (1 - discountPercentNum / 100));

  const studentCount = ((cert.id * 73) % 400) + 100; // entre 100 y 500

  let logoPath = "/cert-images/scrum-foundation.svg";
  if (cert.logo_url) {
    if (!cert.logo_url.startsWith("http") && !cert.logo_url.startsWith("/")) {
      logoPath = `/cert-images/${cert.logo_url}`;
    } else if (cert.logo_url.startsWith("/")) {
      logoPath = cert.logo_url;
    }
  }

  const lower = cert.name.toLowerCase();
  if (logoPath === "/cert-images/scrum-foundation.svg") {
    if (lower.includes("scrum master")) logoPath = "/cert-images/scrum-master.svg";
    else if (lower.includes("scrum developer")) logoPath = "/cert-images/scrum-developers.svg";
  }

  return {
    id: cert.id,
    title: cert.name,
    description: cert.description,
    image: logoPath,
    certImage: logoPath,
    date: "Certificación",
    students: studentCount,
    originalPrice,
    currentPrice,
    mainTopics: [], // No hay datos de mainTopics en la API
    targetAudience: [], // No hay datos de targetAudience en la API
  };
};

export default function CourseDetail() {
  const params = useParams();
  const [course, setCourse] = useState<CourseDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Cargar datos desde la API al montar o cuando cambie el ID
  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setErr(null);

        const rawId = params?.id;
        const idStr = Array.isArray(rawId) ? rawId[0] : String(rawId ?? "");
        const numericId = Number.parseInt(idStr, 10);

        if (!numericId || Number.isNaN(numericId)) {
          setErr("ID inválido");
          setCourse(null);
          setLoading(false);
          return;
        }

        const res = await fetch("/api/certifications", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const apiData: ApiResponse = await res.json();
        if (apiData?.statusCode !== 200 || !apiData.data?.certifications) {
          throw new Error(apiData?.message || "Respuesta de API no válida");
        }

        const found = apiData.data.certifications.find((c) => c.id === numericId);
        if (!found) {
          throw new Error("Certificación no encontrada");
        }

        const courseData = convertCertificationToCourse(found, apiData.data.params || []);
        setCourse(courseData);

      } catch (e: any) {
        console.error("Fallo al cargar desde API:", e?.message || e);
        setErr(e?.message || "Error al cargar la certificación");
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [params?.id]);

  // Carousel logic
  const [isPaused, setIsPaused] = useState(false);
  const testimonialsPerSlide = 3;
  const totalSlides = Math.ceil(mockTestimonials.length / testimonialsPerSlide);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides, isPaused]);

  const handlePrev = () => {
    setIsPaused(true);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPaused(true);
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const currentTestimonials = mockTestimonials.slice(
    currentSlide * testimonialsPerSlide,
    (currentSlide + 1) * testimonialsPerSlide
  );

  // Mostrar estados de carga o error
  if (loading) {
    return <p className="text-white text-center pt-32">Cargando certificación...</p>;
  }

  if (err) {
    return <p className="text-red-500 text-center pt-32">Error: {err}</p>;
  }

  if (!course) {
    return <p className="text-white text-center pt-32">Certificación no encontrada</p>;
  }

  return (
    <motion.div
      className="min-h-screen py-16 bg-gradient-to-tr from-violet-900/30 via-purple-500/60 to-indigo-800/90 pt-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-white">{course.title}</h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-8 shadow-lg border border-white/10"
            >
              {/* Descripción */}
              {course.description && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="transform hover:scale-[1.01] transition-transform"
                >
                  <motion.h2 
                    className="text-xl font-semibold mb-3 text-white flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <span className="mr-2">📝</span>
                    Descripción
                  </motion.h2>
                  <motion.p 
                    className="text-white/80 leading-relaxed text-justify pl-4 border-l-2 border-purple-500/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {course.description}
                  </motion.p>
                </motion.div>
              )}

              {/* Temas principales */}
              {course.mainTopics && course.mainTopics.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="transform hover:scale-[1.01] transition-transform"
                >
                  <motion.h2 
                    className="text-xl font-semibold mb-3 text-white flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <span className="mr-2">📚</span>
                    Temas principales
                  </motion.h2>
                  <motion.ul className="space-y-3 text-justify pl-4 border-l-2 border-purple-500/30">
                    {course.mainTopics.map((t, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-center space-x-2 transform hover:translate-x-1 transition-transform"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                      >
                        <span className="text-orange-400 mt-1">✔</span>
                        <span className="text-white/80">{t}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}

              {/* Público objetivo */}
              {course.targetAudience && course.targetAudience.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="transform hover:scale-[1.01] transition-transform"
                >
                  <motion.h2 
                    className="text-xl font-semibold mb-3 text-white flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                  >
                    <span className="mr-2">👥</span>
                    ¿Para quién es esta certificación?
                  </motion.h2>
                  <motion.ul className="space-y-3 text-justify pl-4 border-l-2 border-purple-500/30">
                    {course.targetAudience.map((a, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-center space-x-2 transform hover:translate-x-1 transition-transform"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 1.1 + i * 0.1 }}
                      >
                        <span className="text-orange-400 mt-1">📑</span>
                        <span className="text-white/80">{a}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div>
            <motion.div
              className="bg-gradient-to-b from-slate-900 via-violet-950 to-transparent rounded-xl shadow-lg p-6 sticky top-24"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <motion.div
                className="flex justify-center mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Image
                  src={course.certImage || course.image || "/cert-images/scrum-foundation.svg"}
                  alt={course.title}
                  width={200}
                  height={200}
                  className="w-40 h-40 md:w-48 md:h-48 rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
              </motion.div>

              {(course.originalPrice !== undefined || course.currentPrice !== undefined) && (
                <div className="text-center mb-6">
                  {course.originalPrice !== undefined && (
                    <span className="text-gray-400 line-through text-lg">${course.originalPrice}</span>
                  )}
                  {course.currentPrice !== undefined && (
                    <motion.span
                      className="text-3xl font-bold text-white ml-2 inline-block"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      ${course.currentPrice}
                    </motion.span>
                  )}
                </div>
              )}

              <Button className="w-full rounded-full py-3 px-6 font-medium bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 hover:from-violet-600 hover:via-fuchsia-600 hover:to-orange-500 transition-all shadow-md hover:shadow-lg hover:scale-105 bg-[length:200%_200%] animate-gradient">
                OBTENER CERTIFICACIÓN
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <TestimonialsCarousel className="mt-12" />
      </div>
    </motion.div>
  );
}
