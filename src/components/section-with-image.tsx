"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import DotSquare from "./dot-square";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    imageSrc.forEach((src, index) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }));
      };
    });
  }, [imageSrc]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSrc.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  const ImageCarousel = ({ images }: { images: string[] }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative w-full max-w-md xl:max-w-2xl mx-auto overflow-hidden rounded-3xl flex flex-col items-center justify-center"
    >
      <div className="relative w-full h-[300px]">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`${title} ${index + 1}`}
            width={600}
            height={600}
            className={`absolute top-0 left-0 w-full h-full object-cover rounded-3xl transition-opacity duration-500 ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
            priority={index === 0}
          />
        ))}
      </div>
      <button
        onClick={nextImage}
        className="bg-[#670EE2] p-3 mt-2 rounded-full shadow-md"
        aria-label="Next image"
      >
        <ChevronDown className="h-6 w-6 text-white" />
      </button>
    </motion.div>
  );

  return (
    <section className="max-w-[90%] mx-auto bg-gradient-to-bl from-[#C8D9E7]/50 to-gray-100 py-8 lg:py-16 px-4">
      <motion.div
        className={`lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center ps-5 ${right ? "" : ""}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        {!right && <ImageCarousel images={imageSrc} />}

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <div className="space-y-2">
            <h2 className="text-sm uppercase tracking-wide text-muted-foreground text-[#0B001A]">{miniTitle}</h2>
            <h1 className="font-light tracking-tighter text-5xl flex flex-nowrap text-[#0B001A]">{title}</h1>
          </div>
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 my-6">
              {badges.map((badge, index) => (
                <Badge key={index} variant="default" className="text-sm">{badge}</Badge>
              ))}
            </div>
          )}
          <DotSquare />
          <div className="mt-[20vh] lg:mt-[25vh] mb-10 max-w-[90%]">
            <p className="text-base text-[#0B001A]">{subtitle}</p>
          </div>
          {showButton && (
            <Button variant={"default"} size={"lg"} onClick={() => router.push("/about-us")}>
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </motion.div>

        {right && <ImageCarousel images={imageSrc} />}
      </motion.div>
    </section>
  );
}
