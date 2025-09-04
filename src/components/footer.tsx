"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const handleHashClick = async (e: React.MouseEvent, href: string) => {
    // If it's an anchor to a section on the home page
    if (href.startsWith("/#")) {
      e.preventDefault();
      const hash = href.split("#")[1];
      // Navigate to home first if not already there
      if (typeof window !== "undefined") {
        if (window.location.pathname !== "/") {
          await router.push(`/${href}`);
        } else {
          // if already on home, update the hash without navigation
          history.replaceState(null, "", href);
        }

        // Wait a tick for DOM to be ready
        requestAnimationFrame(() => {
          const el = document.getElementById(hash!);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        });
      }
    }
  };
  return (
  <footer className="relative w-full bg-black pt-10 pb-8 px-4 md:px-8 overflow-visible z-20">
      {/* Gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/10 to-transparent"></div>

      {/* Efecto neón en el borde superior */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.8),0_0_40px_rgba(139,92,246,0.4)]"></div>

  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 md:gap-10 relative z-10 px-4">
        <div className="flex justify-center md:justify-center">
          <a href="/" aria-label="T-Cert" className="group inline-block">
            <Image
              src="/logo/complete/md-full-color.png"
              alt="T-Cert Logo"
              width={180}
              height={50}
              className="h-16 w-auto transition duration-500 group-hover:drop-shadow-[0_0_10px_rgba(103,14,226,0.8)] group-hover:translate-y-[-2px]"
            />
          </a>
        </div>

        <nav className="flex flex-col items-center gap-4 text-center -mb-12">
          {[
            { label: "Acerca de", href: "/#vision" },
            { label: "Certificaciones", href: "/#courses" },
            { label: "Contáctanos", href: "/#contact" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={item.href}
                onClick={(e) => handleHashClick(e as unknown as React.MouseEvent, item.href)}
                className="text-gray-300 hover:text-purple-400 transition-colors text-lg font-bold"
              >
                {item.label}
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
                url: "https://www.instagram.com/tcert_official?igsh=a2NrZTBsdHF1eDA3&utm_source=qr",
              },
              { icon: Linkedin, color: "#0A66C2", url: "https://www.linkedin.com/in/t-cert-llc-a56a36381/" },
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

        {/* Enlaces legales y créditos */}
        <div className="max-w-7xl mx-auto relative z-10 px-4 mt-8 text-center">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-4 justify-center">
              <Link href="/politica" className="hover:text-white/90 underline-offset-2 hover:underline">Políticas</Link>
              <Link href="/tratamiento-datos" className="hover:text-white/90 underline-offset-2 hover:underline">Tratamiento de datos</Link>
            </div>

            <div className="text-gray-500">Desarrollado por <a className="text-purple-400 underline" href="https://ultradevelopments.com" target="_blank" rel="noopener noreferrer">Ultra Developments S.A.S.</a></div>
          </div>
        </div>
      {/* Línea decorativa inferior con efecto neón */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-orange-500 to-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.6),0_0_30px_rgba(237,98,60,0.4)]"></div>
    </footer>
  );
}
