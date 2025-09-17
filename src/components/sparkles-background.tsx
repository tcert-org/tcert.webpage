"use client";

import { motion } from "framer-motion";
import React from "react";

const Sparkle = ({ delay, x, y, duration }: { delay: number; x: string; y: string; duration: number }) => (
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

const GlowOrb = ({ delay, x, y, size, color }: { delay: number; x: string; y: string; size: number; color: string }) => (
  <motion.div
    className={`absolute rounded-full opacity-0 blur-sm`}
    style={{
      left: x,
      top: y,
      width: `${size}px`,
      height: `${size}px`,
      background: `radial-gradient(circle, ${color}, transparent 70%)`,
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

export default function SparklesBackground({
  sparkleCount = 150,
  glowCount = 6,
}: {
  sparkleCount?: number;
  glowCount?: number;
}) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />

      {Array.from({ length: sparkleCount }, (_, i) => (
        <Sparkle key={`sparkle-${i}`} delay={i * 0.25 + Math.random() * 1.2} x={`${Math.random() * 100}%`} y={`${Math.random() * 100}%`} duration={0.9 + Math.random() * 1.4} />
      ))}

      {Array.from({ length: glowCount }, (_, i) => (
        <GlowOrb
          key={`glow-${i}`}
          delay={i * 1.2 + Math.random() * 1.8}
          x={`${Math.random() * 100}%`}
          y={`${Math.random() * 100}%`}
          size={20 + Math.random() * 60}
          color={i % 3 === 0 ? 'rgba(139,92,246,0.9)' : i % 3 === 1 ? 'rgba(249,115,22,0.85)' : 'rgba(6,182,212,0.85)'}
        />
      ))}

      <motion.div
        className="absolute inset-0"
        style={{
        background: `
          radial-gradient(circle at 15% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 85% 20%, rgba(249, 115, 22, 0.06) 0%, transparent 45%),
          radial-gradient(circle at 40% 70%, rgba(6, 182, 212, 0.06) 0%, transparent 45%)
        ` }}
        animate={{ opacity: [0.6, 1, 0.6], transform: ["scale(1)", "scale(1.02)", "scale(1)"] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
      />
    </div>
  );
}
