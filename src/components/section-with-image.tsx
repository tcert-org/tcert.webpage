"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface SectionWithImageProps {
  miniTitle: string;
  title: string;
  subtitle: string;
  imageSrc: string[];
  right?: boolean;
  badges?: string[];
  buttonText?: string;
  showButton?: boolean;
}

export default function SectionWithImage({
  miniTitle,
  title,
  subtitle,
  imageSrc,
  right = true,
  badges = [],
  buttonText = "VER MÁS",
  showButton = true,
}: SectionWithImageProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSrc.length);
  }, [imageSrc.length]);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  const ImageCarousel = ({ images }: { images: string[] }) => (
    <motion.div
      initial={{ opacity: 0, x: right ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, type: "spring", stiffness: 80 }}
      viewport={{ once: true }}
      className="relative w-full max-w-md xl:max-w-2xl mx-auto"
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative w-full h-[400px] bg-gray-900">
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`${title} ${index + 1}`}
              width={600}
              height={600}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}

          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Botón simple para cambiar imagen */}
        {images.length > 1 && (
          <motion.button
            onClick={nextImage}
            className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 p-2 rounded-full backdrop-blur-sm transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next image"
          >
            <ChevronDown className="h-4 w-4 text-white" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );

  return (
    <section className="relative w-full py-16 lg:py-24 px-4">
      {/* Fondo simple negro */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Gradiente sutil en el lado opuesto al contenido */}
      <div
        className={`absolute inset-0 ${
          right ? "bg-gradient-to-l" : "bg-gradient-to-r"
        } from-black via-gray-900 to-black`}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {!right && <ImageCarousel images={imageSrc} />}

          <motion.div
            variants={{
              hidden: { opacity: 0, x: right ? -30 : 30 },
              visible: { opacity: 1, x: 0 },
            }}
            className="mt-8 lg:mt-0"
          >
            <div className="space-y-6">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <p className="text-sm uppercase tracking-wider text-purple-400 font-medium mb-2">
                  {miniTitle}
                </p>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  {title}
                </h1>
              </motion.div>

              {badges.length > 0 && (
                <motion.div
                  className="flex flex-wrap gap-3"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                >
                  {badges.map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                    >
                      <Badge
                        variant="outline"
                        className="text-sm bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-all duration-200"
                      >
                        {badge}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                  {subtitle}
                </p>
              </motion.div>

              {showButton && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="pt-4"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300"
                    onClick={() => router.push("/about-us")}
                  >
                    {buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {right && <ImageCarousel images={imageSrc} />}
        </motion.div>
      </div>
    </section>
  );
}
