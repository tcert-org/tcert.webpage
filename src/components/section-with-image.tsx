"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import DotSquare from "./dot-square";
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
      className="relative w-full max-w-md xl:max-w-2xl mx-auto overflow-hidden"
    >
      {/* Marco futurista de la imagen */}
      <div className="relative">
        {/* Esquinas tecnológicas */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-blue-400 z-20"></div>
        <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-blue-400 z-20"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-blue-400 z-20"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-blue-400 z-20"></div>

        {/* Líneas de escaneo */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent z-10"
          animate={{ x: [-50, 350] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Container de imagen con bordes hexagonales */}
        <div
          className="relative overflow-hidden"
          style={{
            clipPath:
              "polygon(0% 25%, 0% 75%, 25% 100%, 75% 100%, 100% 75%, 100% 25%, 75% 0%, 25% 0%)",
          }}
        >
          <div className="relative w-full h-[300px] bg-gradient-to-br from-slate-800 to-slate-900">
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

            {/* Overlay holográfico */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
          </div>
        </div>

        {/* Botón futurista */}
        <motion.button
          onClick={nextImage}
          className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg shadow-lg border border-blue-400/50"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next image"
        >
          <ChevronDown className="h-4 w-4 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <section className="relative w-full py-8 lg:py-16 px-4 overflow-hidden">
      {/* Fondo futurista corporativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

      {/* Patrón de matriz digital */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern
              id="matrix"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1" fill="#3b82f6" />
              <rect
                x="9"
                y="0"
                width="2"
                height="20"
                fill="url(#matrixGradient)"
                opacity="0.3"
              />
              <rect
                x="0"
                y="9"
                width="20"
                height="2"
                fill="url(#matrixGradient)"
                opacity="0.3"
              />
            </pattern>
            <linearGradient id="matrixGradient">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#matrix)" />
        </svg>
      </div>

      {/* Líneas de datos flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
            style={{
              top: `${10 + i * 12}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className={`max-w-[95%] mx-auto lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center ps-5 relative z-10 ${
          right ? "" : ""
        }`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.3 },
          },
        }}
      >
        {!right && <ImageCarousel images={imageSrc} />}

        <motion.div
          variants={{
            hidden: { opacity: 0, x: right ? -50 : 50 },
            visible: { opacity: 1, x: 0 },
          }}
          className="relative"
        >
          {/* Panel de información futurista */}
          <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-8 shadow-2xl">
            {/* Indicadores de estado */}
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            <div className="space-y-4">
              <motion.h2
                className="text-sm uppercase tracking-wide text-blue-300 font-mono"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {miniTitle}
              </motion.h2>

              <motion.h1
                className="font-light tracking-tighter text-4xl lg:text-5xl text-white relative"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {title}
                {/* Efecto de typing cursor */}
                <motion.span
                  className="inline-block w-1 h-8 bg-blue-400 ml-2"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.h1>
            </div>

            {badges.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-3 my-6"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
              >
                {badges.map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                  >
                    <Badge
                      variant="outline"
                      className="text-sm bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-400/50 text-blue-200 hover:bg-blue-600/30 transition-all duration-300"
                    >
                      {badge}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <DotSquare />

            <motion.div
              className="mt-8 mb-10 max-w-[90%]"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <p className="text-base text-slate-300 leading-relaxed font-light">
                {subtitle}
              </p>
            </motion.div>

            {showButton && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="relative overflow-hidden group bg-transparent border-2 border-blue-400/50 text-blue-300 hover:text-white transition-all duration-300"
                  onClick={() => router.push("/about-us")}
                >
                  <span className="relative z-10 flex items-center font-mono">
                    {buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.05 }}
                  />

                  {/* Efecto de escaneo en hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                    animate={{ x: [-100, 200] }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </Button>
              </motion.div>
            )}
          </div>

          {/* Elementos decorativos flotantes */}
          <div className="absolute -top-4 -right-4 w-8 h-8 border border-blue-400/30 rotate-45"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 border border-purple-400/30 rotate-12"></div>
        </motion.div>

        {right && <ImageCarousel images={imageSrc} />}
      </motion.div>
    </section>
  );
}
