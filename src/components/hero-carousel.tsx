"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function HeroCarousel() {
  const [itemWidth, setItemWidth] = useState(250);
  const itemCount = 10;

  useEffect(() => {
    const updateItemWidth = () => {
      const screenWidth = window.innerWidth;
      let newItemWidth;
      if (screenWidth < 640) {
        // móvil
        newItemWidth = screenWidth / 2 - 10;
      } else if (screenWidth < 1024) {
        // tablet
        newItemWidth = screenWidth / 3 - 10;
      } else {
        // desktop
        newItemWidth = screenWidth / 4 - 20;
      }
      setItemWidth(newItemWidth);
    };

    updateItemWidth();
    window.addEventListener("resize", updateItemWidth);
    return () => window.removeEventListener("resize", updateItemWidth);
  }, []);

  const items = Array.from({ length: itemCount }, (_, i) => (
    <div
      key={i}
      className="flex-shrink-0 p-2"
      style={{ width: `${itemWidth}px` }}
    >
      <Card className="rounded-3xl">
        <CardContent className="flex aspect-square items-center justify-center p-0 ">
          <Image
            width={itemWidth}
            height={500}
            src={`/imgs/${i + 1}.webp`}
            alt={`Imagen ${i + 1}`}
            className="w-full h-full object-cover rounded-3xl"
          />
        </CardContent>
      </Card>
    </div>
  ));

  return (
    <div className="w-full overflow-hidden bg-transparent">
      <div
        className="flex animate-scroll"
        style={{
          width: `${itemCount * itemWidth * 2}px`,
        }}
      >
        {items}
        {items}
      </div>
    </div>
  );
}
