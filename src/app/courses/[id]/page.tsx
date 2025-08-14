"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// ===== Tipos (mismos del carrusel) =====
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
  image?: string;           // logo calculado
  certImage?: string;       // compat con tu JSX
  date?: string;
  students?: number;
  originalPrice?: number;
  currentPrice?: number;
  mainTopics?: string[];
  targetAudience?: string[];
};

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

  const studentCount = ((cert.id * 73) % 400) + 100; // 100-500

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
    certImage: logoPath, // compat con tu JSX
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
          return;
        }

        // Intentar API
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
          throw new Error("Curso no encontrado");
        }

        const courseData = convertCertificationToCourse(found, apiData.data.params || []);
        setCourse(courseData);
      } catch (e: any) {
        console.error("Fallo al cargar desde API:", e?.message || e);
        setErr(e?.message || "Error al cargar el curso");
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [params?.id]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Cargando...
      </p>
    );
  }

  if (!course) {
    return (
      <p className="text-center text-gray-400 mt-10">
        {err || "Curso no encontrado"}
      </p>
    );
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
            <h1
              className="text-3xl lg:text-5xl font-bold mb-6 text-white"
            >
              {course.title}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-6 shadow-lg border border-white/10"
            >
              {/* Descripción */}
              {course.description && (
                <div>
                  <h2 className="text-xl font-semibold mb-2 
                                 bg-[linear-gradient(to_right,_#8b5cf6_0%,_#d946ef_20%,_#d946ef_50%,_#fb923c_85%)] 
                                 bg-clip-text text-transparent 
                                 bg-[length:200%_200%] animate-gradient">
                    Descripción
                  </h2>
                  <p className="text-white/80 leading-relaxed text-justify">
                    {course.description}
                  </p>
                </div>
              )}

              {/* Temas principales (solo si existen) */}
              {course.mainTopics && course.mainTopics.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-2 
                                 bg-[linear-gradient(to_right,_#8b5cf6_0%,_#d946ef_20%,_#d946ef_50%,_#fb923c_85%)] 
                                 bg-clip-text text-transparent 
                                 bg-[length:200%_200%] animate-gradient">
                    Temas principales
                  </h2>
                  <ul className="space-y-2 text-justify">
                    {course.mainTopics.map((t, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="text-orange-400 mt-1">✔</span>
                        <span className="text-white/80">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Público objetivo (solo si existe) */}
              {course.targetAudience && course.targetAudience.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-2 
                                 bg-[linear-gradient(to_right,_#8b5cf6_0%,_#d946ef_20%,_#d946ef_50%,_#b91c1c_85%)]  
                                 bg-clip-text text-transparent 
                                 bg-[length:200%_200%] animate-gradient">
                    ¿Para quién es esta certificación?
                  </h2>
                  <ul className="space-y-2 text-justify">
                    {course.targetAudience.map((a, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="text-orange-400 mt-1">📑</span>
                        <span className="text-white/80">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
                  src={
                    course.certImage ||
                    course.image ||
                    "/cert-images/scrum-foundation.svg"
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
      </div>
    </motion.div>
  );
}