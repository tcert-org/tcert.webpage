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
    <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden">
      {/* Fondo futurista épico */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-blue-950/30 to-black/90"></div>

      {/* Sistema de red neural de fondo */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1920 1080">
          <defs>
            <radialGradient id="neuralGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
            </radialGradient>
          </defs>

          {/* Nodos de red neural */}
          {[...Array(12)].map((_, i) => {
            const x = 200 + (i % 4) * 400;
            const y = 200 + Math.floor(i / 4) * 300;
            return (
              <g key={`neural-${i}`}>
                <circle cx={x} cy={y} r="4" fill="url(#neuralGlow)" />
                {/* Conexiones */}
                {i < 8 && (
                  <line
                    x1={x}
                    y1={y}
                    x2={200 + ((i + 4) % 4) * 400}
                    y2={200 + Math.floor((i + 4) / 4) * 300}
                    stroke="#3b82f6"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                  />
                )}
                {i % 4 !== 3 && (
                  <line
                    x1={x}
                    y1={y}
                    x2={x + 400}
                    y2={y}
                    stroke="#8b5cf6"
                    strokeWidth="1"
                    strokeOpacity="0.2"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Partículas de datos flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`data-${i}`}
            className="absolute text-xs font-mono text-blue-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-50, 50, -50],
              opacity: [0.1, 0.6, 0.1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear",
            }}
          >
            {["01", "11", "10", "00"][Math.floor(Math.random() * 4)]}
          </motion.div>
        ))}
      </div>

      {/* Líneas de código flotantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`code-${i}`}
            className="absolute font-mono text-sm text-emerald-400/20 whitespace-nowrap"
            style={{
              top: `${15 + i * 15}%`,
              right: "-100%",
            }}
            animate={{
              x: [1920, -400],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          >
            {
              [
                "function certify() {",
                "const skills = await learn();",
                "return success.guaranteed;",
                "if (motivated) level.up();",
                "export default Excellence;",
                'console.log("Achievement unlocked!");',
              ][i]
            }
          </motion.div>
        ))}
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-32 lg:pt-36">
        {/* Marco simple */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-sm border border-slate-700/30" />

        {/* Título principal limpio */}
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl mb-4 font-bold tracking-tight relative z-20"
        >
          <span
            className="block text-white"
            style={{
              filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))",
            }}
          >
            TU RUTA HACIA UNA MEJOR
          </span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
            className="font-light block mt-2 text-slate-300"
            style={{
              filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2))",
            }}
          >
            VERSIÓN DE TI MISMO
            {/* Cursor de terminal */}
            <motion.span
              className="inline-block w-2 h-8 bg-blue-400 ml-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </motion.span>
        </motion.h1>

        {/* Elementos de interfaz futurista */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex justify-center gap-4 mb-4"
        >
          {/* Indicadores de progreso */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`indicator-${i}`}
              className="flex flex-col items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
            >
              <div className="w-2 h-8 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-full mb-1">
                <motion.div
                  className="w-full bg-white rounded-full"
                  animate={{ height: ["0%", "100%", "0%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              </div>
              <span className="text-xs text-blue-300 font-mono">
                {["SCAN", "PROC", "CERT", "COMP"][i]}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Botón mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="relative z-20"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg px-10 py-4 rounded-lg shadow-lg border border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25"
              onClick={() => handleScroll("courses")}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: [-100, 300] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
              <span className="relative z-10">Explorar Certificaciones</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
