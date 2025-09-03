"use client";

import SectionWithImage from "@/components/section-with-image";
import { motion } from "framer-motion";

// Componente de destello individual
const Sparkle = ({ delay, x, y, duration }: { delay: number, x: string, y: string, duration: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-white rounded-full opacity-0"
    style={{ left: x, top: y }}
    animate={{
      opacity: [0, 0.8, 0],
      scale: [0, 1.2, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    }}
  />
);

// Componente de luz pulsante más grande
const GlowOrb = ({ delay, x, y, size, color }: { delay: number, x: string, y: string, size: number, color: string }) => (
  <motion.div
    className={`absolute rounded-full opacity-0 blur-sm`}
    style={{ 
      left: x, 
      top: y, 
      width: `${size}px`, 
      height: `${size}px`,
      background: `radial-gradient(circle, ${color}, transparent 70%)`
    }}
    animate={{
      opacity: [0, 0.3, 0],
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    }}
  />
);

export default function AboutUs() {
  return (
    <div className="relative mt-28 overflow-hidden">
      {/* Background con animación de destellos */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Fondo base oscuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />
        
        {/* Destellos pequeños */}
        {Array.from({ length: 15 }, (_, i) => (
          <Sparkle
            key={`sparkle-${i}`}
            delay={i * 2 + Math.random() * 3}
            x={`${Math.random() * 100}%`}
            y={`${Math.random() * 100}%`}
            duration={2 + Math.random() * 2}
          />
        ))}
        
        {/* Luces sutiles más grandes */}
        {Array.from({ length: 6 }, (_, i) => (
          <GlowOrb
            key={`glow-${i}`}
            delay={i * 3 + Math.random() * 4}
            x={`${Math.random() * 100}%`}
            y={`${Math.random() * 100}%`}
            size={20 + Math.random() * 30}
            color={i % 3 === 0 ? '#8B5CF6' : i % 3 === 1 ? '#F97316' : '#06B6D4'}
          />
        ))}
        
        {/* Partículas flotantes muy sutiles */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.02) 0%, transparent 50%),
              radial-gradient(circle at 40% 70%, rgba(6, 182, 212, 0.02) 0%, transparent 50%)
            `
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <section>
          <SectionWithImage
            miniTitle="Compromiso con la excelencia"
            title="MISIÓN"
            subtitle="En T-CERT nos dedicamos a certificar profesionales altamente capacitados para afrontar con éxito los desafíos del mundo laboral, garantizando calidad, inmediatez y eficiencia en cada certificación."
            imageSrc={["/imgs/1.webp", "/imgs/2.webp", "/imgs/3.webp"]}
            badges={["Calidad", "Eficiencia", "Confianza"]}
            showButton={false}
            right={true}
          />
        </section>
        <section>
          <SectionWithImage
            miniTitle="Un futuro de oportunidades"
            title="VISIÓN"
            subtitle="Ser líderes en certificación profesional, formando expertos altamente capacitados para enfrentar con éxito los desafíos de la vida laboral, garantizando excelencia en cada etapa del proceso."
            imageSrc={["/imgs/9.webp", "/imgs/7.webp", "/imgs/6.webp"]}
            badges={["Liderazgo", "Progreso", "Preparación"]}
            showButton={false}
            right={false}
          />
        </section>
      </div>
    </div>
  );
}
