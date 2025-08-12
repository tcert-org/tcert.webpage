"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative w-full bg-black pt-12 pb-8 px-4 md:px-8 overflow-hidden">
      {/* Gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/10 to-transparent"></div>

      {/* Efecto neón en el borde superior */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.8),0_0_40px_rgba(139,92,246,0.4)]"></div>

      <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-10 relative z-10">
        <div className="flex justify-center md:justify-center">
          <Image
            src="/logo/complete/md-full-color.png"
            alt="T-Cert Logo"
            width={180}
            height={50}
            className="h-16 w-auto"
          />
        </div>

        <nav className="flex flex-col items-center gap-4 text-center">
          {["Acerca de", "Certificaciones", "Contáctanos"].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="/under-construction"
                className="text-gray-300 hover:text-purple-400 transition-colors text-lg font-bold"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-400 text-base font-bold">
            Síguenos en nuestras redes
          </p>
          <div className="flex gap-6">
            {[
              {
                icon: Instagram,
                color: "#E4405F",
                url: "https://instagram.com",
              },
              { icon: Facebook, color: "#1877F2", url: "https://facebook.com" },
              { icon: Linkedin, color: "#0A66C2", url: "https://linkedin.com" },
            ].map(({ icon: Icon, color, url }, idx) => (
              <motion.a
                key={idx}
                href={url}
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Síguenos en redes"
                whileHover={{ scale: 1.3, color }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="h-7 w-7 stroke-2" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Línea decorativa inferior con efecto neón */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-orange-500 to-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.6),0_0_30px_rgba(237,98,60,0.4)]"></div>
    </footer>
  );
}
