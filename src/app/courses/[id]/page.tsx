"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";

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

// ===== Conversión igual que en el carrusel (actualizada con blob storage) =====
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

  // === Construir URL del logo desde blob storage con fallback ===
  const buildLogoPath = () => {
    const BLOB_BASE =
      "https://e48bssyezdxaxnzg.public.blob.vercel-storage.com/logos_insignias/";

    const raw = cert.logo_url?.trim();
    if (raw && raw !== "") {
      // Si ya viene una URL absoluta (http/https), usar tal cual
      if (/^https?:\/\//i.test(raw)) return raw;
      // Si es un nombre/relativo, concatenar al base del blob
      return BLOB_BASE + raw;
    }

    // Fallback si no hay logo_url
    return BLOB_BASE + "default.svg";
  };

  const logoPath = buildLogoPath();

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
    mainTopics: [],
    targetAudience: [],
  };
};

export default function CourseDetail() {
  const params = useParams();
  const [course, setCourse] = useState<CourseDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

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

        const courseData = convertCertificationToCourse(
          found,
          apiData.data.params || []
        );
        setCourse(courseData);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Error al cargar la certificación";
        console.error("Fallo al cargar desde API:", errorMessage);
        setErr(errorMessage);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [params?.id]);

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
      className="min-h-screen py-16 pt-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-white">
              {course.title}
            </h1>

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
          <div className="order-2 md:order-none md:col-span-1">
            <motion.div
              className="bg-gradient-to-b from-slate-900 via-violet-950 to-transparent rounded-xl shadow-lg p-6 md:sticky md:top-24"
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
                  src={
                    course.certImage ||
                    course.image ||
                    "https://e48bssyezdxaxnzg.public.blob.vercel-storage.com/logos_insignias/scrum-foundation.svg"
                  }
                  alt={course.title}
                  width={200}
                  height={200}
                  className="w-40 h-40 md:w-48 md:h-48 rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
              </motion.div>

              {(course.originalPrice !== undefined ||
                course.currentPrice !== undefined) && (
                <div className="text-center mb-6">
                  {course.originalPrice !== undefined && (
                    <span className="text-gray-400 line-through text-lg">
                      ${course.originalPrice}
                    </span>
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
