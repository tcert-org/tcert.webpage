"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-black via-gray-900 to-black pt-12 pb-8 px-4 md:px-8 overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ backgroundPosition: "0% 0%", scale: 1 }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(147,51,234,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(139,92,246,0.1), transparent 40%)",
          backgroundSize: "200% 200%",
        }}
      />

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
              whileHover={{ scale: 1.05, color: "#a855f7" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="/under-construction"
                className="relative text-gray-300 hover:text-purple-400 transition-colors text-lg font-bold"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full" />
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
    </footer>
  );
}
