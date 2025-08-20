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
    <section className="relative w-full flex items-center overflow-hidden bg-black min-h-[70vh] md:min-h-screen">
      {/* Fondo base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>

      {/* Animación de fondo completa */}
      <motion.div
        className="absolute inset-0 opacity-60"
        animate={{
          background: [
            "linear-gradient(45deg, #000000 0%, #4c1d95 30%, #7c3aed 60%, #000000 100%)",
            "linear-gradient(135deg, #000000 0%, #7c3aed 30%, #a855f7 60%, #000000 100%)",
            "linear-gradient(225deg, #000000 0%, #a855f7 30%, #4c1d95 60%, #000000 100%)",
            "linear-gradient(315deg, #000000 0%, #4c1d95 30%, #7c3aed 60%, #000000 100%)",
            "linear-gradient(45deg, #000000 0%, #4c1d95 30%, #7c3aed 60%, #000000 100%)",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Efectos de luz flotantes */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [-50, 50, -50],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.4, 0.15],
          y: [-30, 30, -30],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Partículas flotantes por todo el espacio */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Contenido flotante */}
      <div className="relative z-20 w-full flex items-center">
        <div className="w-full max-w-2xl px-6 md:px-8 lg:px-16 mx-auto md:mx-0 md:ml-16">
          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 80 }}
            className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl mb-6 font-bold tracking-tight text-left"
          >
            <span className="block text-white leading-tight drop-shadow-lg">
              TU RUTA HACIA
            </span>
            <span className="block text-white leading-tight drop-shadow-lg">
              UNA MEJOR
            </span>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="block text-gray-300 font-light mt-2 drop-shadow-lg"
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
            className="text-gray-300 text-base sm:text-lg lg:text-xl mb-8 max-w-md text-left leading-relaxed drop-shadow-md"
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
                className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold text-lg px-8 py-4 mb-10 rounded-lg shadow-xl transition-all duration-300 hover:shadow-purple-500/25"
                onClick={() => handleScroll("courses")}
              >
                <span className="relative z-10">Explorar Certificaciones</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
