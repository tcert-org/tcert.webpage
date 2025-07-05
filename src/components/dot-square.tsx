import React from "react";

interface DotSquareProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width?: string;
  height?: string;
  opacity?: number;
}

const DotSquare: React.FC<DotSquareProps> = ({
  top,
  left,
  right,
  bottom,
  width = "88px",
  height = "80px",
  opacity = 0.7,
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
        <div
          key={index}
          className="bg-gray-400 rounded-full"
          style={{
            width: "4px",
            height: "4px",
          }}
        ></div>
      ))}
    </div>
  );
};

export default DotSquare;
