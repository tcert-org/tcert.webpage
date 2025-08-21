"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Course } from "./course-carousel";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function formatCurrency(value: number) {
  if (value <= 0) return "Gratis";
  return value.toLocaleString("es-CO", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function CourseCard({ course }: { course: Course }) {
  const { originalPrice, currentPrice } = course;

  // Evitar falsos positivos por redondeos
  const EPS = 0.0001;
  const isFree = currentPrice <= EPS;

  // Hay descuento real solo si el precio con descuento es menor al original (>0)
  const hasDiscount =
    originalPrice > 0 && currentPrice > 0 && currentPrice < originalPrice - EPS;

  const discountPercent = hasDiscount
    ? Math.round((1 - currentPrice / originalPrice) * 100)
    : 0;

  // Precio principal que se muestra en naranja
  const mainPrice = isFree
    ? 0
    : hasDiscount
    ? currentPrice
    : originalPrice;

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.005 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden relative bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 border border-slate-700/50 hover:border-purple-500/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10" data-content="true">
        {/* Efectos de luz suaves */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-orange-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>

        <CardHeader className="p-0 relative z-10">
          <div className="relative w-full h-44 sm:h-56 overflow-hidden">
            <Image
              src={course.image}
              alt={`Imagen del curso ${course.title}`}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
              placeholder="blur"
              blurDataURL="/tocaPonerUnPlaceholder.svg"
            />
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Badge de estudiantes */}
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-medium text-white">
                  {new Intl.NumberFormat("es-CO").format(course.students)}
                </span>
              </div>
            </div>

            {/* Badge de fecha (opcional) */}
            {course.date && (
              <div className="absolute bottom-4 left-4">
                <span className="px-2 py-1 text-xs bg-purple-600/80 backdrop-blur-sm text-white rounded-full font-medium">
                  {course.date}
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 relative z-10 flex-1">
          <h3 className="text-lg sm:text-xl font-bold mb-3 text-white leading-tight line-clamp-2">
            {course.title}
          </h3>

          <p className="text-gray-300 text-sm sm:text-sm leading-relaxed mb-4 line-clamp-3">
            {course.description}
          </p>

          {/* Barra de progreso ficticia */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Nivel de demanda</span>
              <span className="text-xs text-emerald-400 font-semibold">
                Alto
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-1.5 rounded-full w-4/5"></div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 relative z-10">
          <div className="w-full">
            {/* Precios */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-orange-400">
                  {formatCurrency(mainPrice)}
                </span>

                {/* Mostrar precio tachado SOLO si hay descuento real */}
                {hasDiscount && (
                  <span className="text-gray-500 line-through text-sm">
                    {formatCurrency(originalPrice)}
                  </span>
                )}
              </div>

              {/* Badge de descuento SOLO si hay descuento real */}
              {hasDiscount && (
                <div className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                  -{discountPercent}%
                </div>
              )}
            </div>

            {/* Botón */}
            <Link href={`/courses/${course.id}`} className="block">
              <Button className="relative overflow-hidden group w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 border border-slate-600/50 hover:border-purple-500/50">
                <span className="relative z-10">Ver Curso Completo</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
