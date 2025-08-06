"use client";

import { useParams } from "next/navigation";
import coursesJson from "@/lib/courses-carousel.json";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
  const [activeTab, setActiveTab] = useState("description");

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

  const tabs = [
    {
      id: "description",
      label: "Descripción",
      content: <p>{course.description}</p>,
    },
    {
      id: "main-topics",
      label: "Temas principales",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          {course.mainTopics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "target-audience",
      label: "¿Para quién es esta certificación?",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          {course.targetAudience.map((audience, index) => (
            <li key={index}>{audience}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-gradient-to-tr from-violet-800/90 via-purple-900/70 to-indigo-950/90 pt-32">
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
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              {course.title}
            </h1>

            {/* Tabs */}
            <div className="flex space-x-4 border-b border-white/10 pb-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-2 rounded-t-lg text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-4 min-h-[150px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-white/90"
                >
                  {tabs.find((tab) => tab.id === activeTab)?.content}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-gradient-to-b from-slate-900 via-violet-950 to-transparent rounded-xl shadow-lg p-6 sticky top-8">
              <motion.div
                className="flex justify-center mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
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
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  ${course.currentPrice}
                </motion.span>
              </div>

              <Button className="w-full rounded-full py-3 px-6 font-medium bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 hover:from-violet-600 hover:via-fuchsia-600 hover:to-orange-500 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
                OBTENER CERTIFICACIÓN
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
