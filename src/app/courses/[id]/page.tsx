"use client";

import { useParams } from "next/navigation";
import coursesJson from "@/lib/courses-carousel.json";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Course = {
  id: number;
  title: string;
  description: string;
  mainTopics: string[];
  targetAudience: string[];
  certImage: string;
  date: string;
  students: number;
  originalPrice: number;
  currentPrice: number;
};

export default function CourseDetail() {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (params?.id) {
      const foundCourse = coursesJson.find(
        (c) => c.id.toString() === params.id
      );
      setCourse(foundCourse || null);
    }
  }, [params]);

  if (!course) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Cargando o curso no encontrado...
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
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-300 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-white/90">{course.title}</span>
        </nav>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 
              bg-[linear-gradient(to_right,_#8b5cf6_0%,_#d946ef_20%,_#d946ef_50%,_#fb923c_85%)] 
              bg-clip-text text-transparent 
              bg-[length:200%_200%] animate-gradient">
              {course.title}
            </h1>

            {/* Contenido unificado */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-6 shadow-lg border border-white/10"
            >
              {/* Descripción */}
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

              {/* Temas principales */}
              <div>
                <h2 className="text-xl font-semibold mb-2 
                    bg-[linear-gradient(to_right,_#8b5cf6_0%,_#d946ef_20%,_#d946ef_50%,_#fb923c_85%)] 
                    bg-clip-text text-transparent 
                    bg-[length:200%_200%] animate-gradient">
                  Temas principales
                </h2>
                <ul className="space-y-2 text-justify">
                  {course.mainTopics.map((topic, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-orange-400 mt-1">✔</span>
                      <span className="text-white/80">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Público objetivo */}
              <div>
                <h2 className="text-xl font-semibold mb-2 
                    bg-[linear-gradient(to_right,_#8b5cf6_0%,_#d946ef_20%,_#d946ef_50%,_#fb923c_85%)]  
                    bg-clip-text text-transparent 
                    bg-[length:200%_200%] animate-gradient">
                  ¿Para quién es esta certificación?
                </h2>
                <ul className="space-y-2 text-justify">
                  {course.targetAudience.map((audience, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-orange-400 mt-1">📑</span>
                      <span className="text-white/80">{audience}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
                  src={course.certImage || "/cert-images/scrum-foundation.svg"}
                  alt={course.title}
                  width={200}
                  height={200}
                  className="w-40 h-40 md:w-48 md:h-48 rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
              </motion.div>

              <div className="text-center mb-6">
                <span className="text-gray-400 line-through text-lg">
                  ${course.originalPrice}
                </span>
                <motion.span
                  className="text-3xl font-bold text-white ml-2 inline-block"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  ${course.currentPrice}
                </motion.span>
              </div>

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