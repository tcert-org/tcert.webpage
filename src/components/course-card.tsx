/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Course } from "./course-carousel";
import Link from "next/link";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="h-full">
      <CardHeader className="p-0">
        <img
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            + {course.students} Estudiantes
          </span>
        </div>
        <div className="text-sm text-gray-500 mb-2">{course.date}</div>
        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm">{course.description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-orange-500">
            $ {course.currentPrice}
          </span>
          <span className="text-gray-400 line-through">
            $ {course.originalPrice}
          </span>
        </div>
        <Link href={`/courses/${course.id}`}>
          <Button>Ver Ahora</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
