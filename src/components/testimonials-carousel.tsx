"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Tipos para la respuesta de la API y el renderizado
interface ApiResponse {
  id: number;
  name: string;
  comment: string;
  rating: number;
  profession: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface TestimonialsCarouselProps {
  title?: string;
  className?: string;
}

export function TestimonialsCarousel({ title = "¿Qué dicen nuestros estudiantes?", className = "" }: TestimonialsCarouselProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Llamar a la API para obtener testimonios al montar componente
  useEffect(() => {
    const fetchTestimonials = async () => {
        try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://app.t-cert.us/api/feedback");
        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const response = await res.json();

        // response es un objeto con { success, data, count, ... }
        const rawTestimonialsArray: unknown[] = Array.isArray(response.data) ? response.data : [];

        const testimonialsFormatted: Testimonial[] = rawTestimonialsArray
          .filter((item: unknown): item is ApiResponse => 
            item !== null &&
            typeof item === 'object' &&
            'id' in item &&
            'name' in item &&
            'comment' in item &&
            'profession' in item &&
            'rating' in item &&
            typeof (item as ApiResponse).id === 'number' &&
            typeof (item as ApiResponse).name === 'string' &&
            typeof (item as ApiResponse).comment === 'string' &&
            typeof (item as ApiResponse).profession === 'string' &&
            typeof (item as ApiResponse).rating === 'number'
          )
          .map((item: ApiResponse) => ({
            id: item.id,
            name: item.name,
            role: item.profession,
            content: item.comment,
            rating: Math.min(5, Math.max(1, item.rating)),
          }));

        setTestimonials(testimonialsFormatted);
        } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error al cargar testimonios";
        setError(errorMessage);
        setTestimonials([]);
        } finally {
        setLoading(false);
        }
    };

    fetchTestimonials();
    }, []);


  const testimonialsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides, isPaused]);

  const handlePrev = () => {
    setIsPaused(true);
    setCurrentSlide(prev => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPaused(true);
    setCurrentSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Slice para slide actual
  const currentTestimonials = testimonials.slice(
    currentSlide * testimonialsPerSlide,
    (currentSlide + 1) * testimonialsPerSlide
  );

  // Mostrar loading o error
  if (loading) {
    return <p className="text-white text-center py-16">Cargando testimonios...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center py-16">Error: {error}</p>;
  }

  if (!testimonials.length) {
    return <p className="text-white text-center py-16">No hay testimonios disponibles.</p>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-white text-center">{title}</h2>
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {currentTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/10 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-white/60">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => {
                    const fullStars = Math.floor(testimonial.rating);
                    const hasHalfStar = testimonial.rating % 1 >= 0.5;

                    if (i < fullStars) {
                      return (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.39 2.467a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.467a1 1 0 00-1.175 0l-3.39 2.467c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.15 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" />
                        </svg>
                      );
                    } else if (i === fullStars && hasHalfStar) {
                      return (
                        <svg
                          key={i}
                          className="w-5 h-5"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <defs>
                            <linearGradient id={`half-gradient-${i}`} x1="0" y1="0" x2="100%" y2="0">
                              <stop offset="50%" stopColor="#fbbf24" />
                              <stop offset="50%" stopColor="#9ca3af" />
                            </linearGradient>
                          </defs>
                          <path
                            fill={`url(#half-gradient-${i})`}
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.39 2.467a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.467a1 1 0 00-1.175 0l-3.39 2.467c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.15 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z"
                          />
                        </svg>
                      );
                    } else {
                      return (
                        <svg
                          key={i}
                          className="w-5 h-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.39 2.467a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.467a1 1 0 00-1.175 0l-3.39 2.467c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.15 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" />
                        </svg>
                      );
                    }
                  })}
                </div>
                <p className="text-white/80 leading-relaxed text-justify">{testimonial.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Botones de navegación */}
        <button
          onClick={handlePrev}
          className="absolute -left-16 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full shadow-md transition-colors"
          aria-label="Testimonios anteriores"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute -right-16 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full shadow-md transition-colors"
          aria-label="Testimonios siguientes"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/30"}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir a la diapositiva ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
