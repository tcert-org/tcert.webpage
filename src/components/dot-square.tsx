"use client";
import React from "react";
import { motion } from "framer-motion";

interface DotSquareProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width?: string;
  height?: string;
  opacity?: number;
  color?: string;
}

const DotSquare: React.FC<DotSquareProps> = ({
  top,
  left,
  right,
  bottom,
  width = "88px",
  height = "80px",
  opacity = 0.7,
  color = "#9CA3AF", // gris por defecto
}) => {
  const rows = 6;
  const cols = 8;
  const totalDots = rows * cols;

  return (
    <div
      className="absolute"
      style={{
        top,
        left,
        right,
        bottom,
        width,
        height,
        opacity,
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: "5px",
      }}
    >
      {Array.from({ length: totalDots }).map((_, index) => (
        <motion.div
          key={index}
          className="rounded-full"
          style={{
            width: "4px",
            height: "4px",
            backgroundColor: color,
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.03,
          }}
        />
      ))}
    </div>
  );
};

export default DotSquare;
