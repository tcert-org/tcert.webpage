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

export function CourseCard({ course }: { course: Course }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden shadow hover:shadow-lg transition-shadow">
        <CardHeader className="p-0 relative">

          <div className="relative w-full h-48">
            <Image
              src={course.image}
              alt={`Imagen del curso ${course.title}`}
              fill
              className="object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
              placeholder="blur"
              blurDataURL="/tocaPonerUnPlaceholder.svg"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-lg" />
          </div>
        </CardHeader>

        <CardContent className="p-6">

          <div className="flex items-center gap-2 mb-4">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white shadow-sm"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              + {new Intl.NumberFormat("es-CO").format(course.students)} Estudiantes
            </span>
          </div>

          <div className="text-xs text-gray-400 mb-2">{course.date}</div>

          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm">{course.description}</p>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-orange-500">
              $ {course.currentPrice.toLocaleString()}
            </span>
            <span className="text-gray-400 line-through">
              $ {course.originalPrice.toLocaleString()}
            </span>
          </div>

          <Link href={`/courses/${course.id}`}>
            <Button className="bg-purple-600 hover:bg-purple-700 transition-colors">
              Ver Ahora
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
