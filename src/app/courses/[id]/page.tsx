"use client";

import { useParams } from "next/navigation";
import coursesJson from "@/lib/courses-carousel.json";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

  const tabs = [
    {
      id: "description",
      label: "Descripción",
      content: course?.description,
    },
    {
      id: "main-topics",
      label: "Temas principales",
      content: (
        <ul className="list-disc pl-5">
          {course?.mainTopics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "target-audience",
      label: "¿Para quién es esta certificación?",
      content: (
        <ul className="list-disc pl-5">
          {course?.targetAudience.map((audience, index) => (
            <li key={index}>{audience}</li>
          ))}
        </ul>
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="h-screen py-16 my-0 bg-gradient-to-tr from-[#C8D9E7] via-gray-100 to-white">
      <div className="max-w-[90%] mx-auto px-4 py-8 md:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900">{course?.title}</span>
        </nav>

        {!course && (
          <p className="text-center text-gray-500 mt-10">
            Cargando o curso no encontrado...
          </p>
        )}

        {/* Mobile: Imagen y botón primero */}

        <div className="md:grid md:grid-cols-3 md:gap-8 mt-8 md:mt-0">
          {/* Main Content */}
          <div className="md:col-span-2">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#090808d5] mb-4">
              {course?.title}
            </h1>
            <p className="text-gray-600 mb-8">{course?.description}</p>
            <div className="w-full h-px bg-gray-500/20 my-4" />

            {/* Tabs - Desktop */}
            <div className="hidden md:block ">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "py-2 px-4 rounded-lg font-medium text-sm transition-all",
                      activeTab === tab.id
                        ? "bg-[#C8D9E7]/20 text-gray-900 shadow-sm border border-gray-900"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="hidden md:block mt-6">
              {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>

            <div className="md:hidden flex flex-col items-center bg-white p-6 rounded-lg shadow-sm">
              <Image
                src={course?.certImage || "/cert-images/scrum-foundation.svg"}
                alt={course?.title || "certificación"}
                width={200}
                height={200}
                className="w-32 h-32 md:w-48 md:h-48 rounded-lg mb-4"
              />
              <div className="text-center mb-6">
                <span className="text-gray-400 line-through text-lg">
                  ${course?.originalPrice}
                </span>
                <span className="text-3xl font-bold text-gray-900 ml-2">
                  ${course?.currentPrice}
                </span>
              </div>
              <Button className="w-full rounded-full py-3 px-6 font-medium transition-colors">
                OBTENER CERTIFICACIÓN
              </Button>
            </div>
            {/* Tabs - Mobile */}
            <div className="md:hidden mt-8">
              <div className="border-t border-gray-200">
                {tabs.map((tab) => (
                  <div key={tab.id} className="border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className="flex justify-between items-center w-full py-4 text-left"
                    >
                      <span
                        className={cn(
                          "font-medium text-sm",
                          activeTab === tab.id
                            ? "text-purple-600"
                            : "text-gray-500"
                        )}
                      >
                        {tab.label}
                      </span>
                      <ChevronRight
                        className={cn(
                          "w-5 h-5 transition-transform",
                          activeTab === tab.id ? "rotate-90" : ""
                        )}
                      />
                    </button>
                    {activeTab === tab.id && (
                      <div className="pb-4 text-gray-600">{tab.content}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Desktop */}
          <div className="hidden md:block">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex justify-center mb-6">
                <Image
                  src={course?.certImage || "/cert-images/scrum-foundation.svg"}
                  alt={course?.title || "certificación"}
                  width={200}
                  height={200}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-lg"
                />
              </div>

              <div className="text-center mb-6">
                <span className="text-gray-400 line-through text-lg">
                  ${course?.originalPrice}
                </span>
                <span className="text-3xl font-bold text-gray-900 ml-2">
                  ${course?.currentPrice}
                </span>
              </div>

              <Button className="w-full rounded-full py-3 px-6 font-medium transition-colors">
                OBTENER CERTIFICACIÓN
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
