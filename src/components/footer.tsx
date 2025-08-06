"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-[#ECEFF3] to-[#DCE0E5] pt-10 pb-6 px-4 md:px-8 overflow-hidden">

      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-pink-400 to-purple-500"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ backgroundPosition: "0% 0%", scale: 1 }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(103,14,226,0.25), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,105,180,0.2), transparent 40%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8 relative z-10">

        <div className="flex justify-center md:justify-center">
          <Image
            src="/logo/complete/sm-full-color.png"
            alt="Cert Logo"
            width={140}
            height={40}
            className="h-12 w-auto"
          />
        </div>

        <nav className="flex flex-col items-center gap-3 text-center">
          {["Acerca de", "Certificaciones", "Contáctanos"].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, color: "#670EE2" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="/under-construction"
                className="relative text-gray-600 hover:text-[#670EE2] transition-colors"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#670EE2] transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-600 text-sm">Síguenos en nuestras redes</p>
          <div className="flex gap-4">
            {[
              { icon: Instagram, color: "#E4405F", url: "https://instagram.com" },
              { icon: Facebook, color: "#1877F2", url: "https://facebook.com" },
              { icon: Linkedin, color: "#0A66C2", url: "https://linkedin.com" },
            ].map(({ icon: Icon, color, url }, idx) => (
              <motion.a
                key={idx}
                href={url}
                target="_blank"
                className="text-gray-600 transition-colors"
                aria-label="Síguenos en redes"
                whileHover={{ scale: 1.2, color }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
