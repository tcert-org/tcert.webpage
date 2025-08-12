"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleScroll = (sectionId: string) => {
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-black">
      {/* Fondo oscuro */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>

      <div className="w-full h-full flex">
        {/* Lado izquierdo - Contenido */}
        <div className="w-1/2 px-8 lg:px-16 flex flex-col justify-center relative z-10">
          {/* Gradiente suave de integración - más ancho y sutil */}
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-r from-transparent via-purple-900/5 to-purple-800/15 pointer-events-none"></div>

          {/* Título principal alineado a la izquierda */}
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 80 }}
            className="text-4xl lg:text-6xl xl:text-7xl mb-6 font-bold tracking-tight text-left"
          >
            <span className="block text-white leading-tight">
              TU RUTA HACIA
            </span>
            <span className="block text-white leading-tight">UNA MEJOR</span>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="block text-gray-300 font-light mt-2"
            >
              VERSIÓN DE TI MISMO
              <motion.span
                className="inline-block w-1 h-8 bg-purple-400 ml-2"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </motion.span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-gray-400 text-lg lg:text-xl mb-8 max-w-md text-left leading-relaxed"
          >
            Desarrolla tus habilidades con certificaciones reconocidas
            mundialmente y transforma tu carrera profesional.
          </motion.p>

          {/* Botón */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            className="flex justify-start"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-purple-500/25"
                onClick={() => handleScroll("courses")}
              >
                <span className="relative z-10">Explorar Certificaciones</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Lado derecho - Animación con gradiente */}
        <div className="w-1/2 relative overflow-hidden">
          {/* Gradiente suave de transición desde la izquierda - más integrado */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-purple-800/15 via-purple-900/5 to-transparent pointer-events-none z-10"></div>

          {/* Gradiente animado principal */}
          <motion.div
            className="absolute inset-0 opacity-80"
            animate={{
              background: [
                "linear-gradient(45deg, #000000 0%, #4c1d95 50%, #000000 100%)",
                "linear-gradient(135deg, #000000 0%, #7c3aed 50%, #000000 100%)",
                "linear-gradient(225deg, #000000 0%, #a855f7 50%, #000000 100%)",
                "linear-gradient(315deg, #000000 0%, #4c1d95 50%, #000000 100%)",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Efectos de luz adicionales */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15"
            style={{
              background:
                "radial-gradient(circle, #a855f7 0%, transparent 70%)",
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Partículas flotantes */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  opacity: [0.6, 0.2, 0.6],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
