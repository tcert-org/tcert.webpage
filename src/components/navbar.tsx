"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleScroll = (sectionId: string) => {
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-2 left-0 right-0 max-w-[98%] mx-auto z-50 backdrop-blur-lg bg-white/30 border border-white/20 rounded-xl shadow-lg px-10"
    >
      <nav className="flex items-center justify-between h-16">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/complete/sm-full-color.png"
            alt="Logo"
            width={100}
            height={40}
            className="transition duration-500 hover:drop-shadow-[0_0_10px_rgba(103,14,226,0.8)]"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Sobre nosotros", id: "vision" },
            { label: "Certificaciones", id: "courses" },
            { label: "Contáctanos", id: "contact" },
          ].map((link, i) => (
            <motion.button
              key={link.id}
              whileHover={{ scale: 1.05, color: "#670EE2" }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => handleScroll(link.id)}
              className="text-[#331263] font-extralight"
            >
              {link.label}
            </motion.button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              className="relative overflow-hidden group text-white bg-[#670EE2] hover:bg-[#670EE2]/90"
              asChild
            >
              <Link href="/under-construction">
                <span className="relative z-10">Iniciar sesión</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </Button>
          </motion.div>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full p-0">
            <div className="h-full bg-gradient-to-b from-purple-600 to-red-400 text-white p-6">
              <SheetHeader className="flex justify-end">
                <DialogTitle className="flex items-center">
                  <Image
                    src="/logo/text/white.png"
                    alt="T-Cert Logo"
                    width={80}
                    height={20}
                    className="h-5 w-auto"
                  />
                </DialogTitle>
              </SheetHeader>
              <div className="flex flex-col items-center gap-8 mt-8">
                {[
                  { label: "Registrarse", link: "/" },
                  { label: "Iniciar sesión", link: "/under-construction" },
                ].map((btn, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="text-white text-xl w-full"
                    asChild
                  >
                    <Link href={btn.link} onClick={() => setOpen(false)}>
                      {btn.label}
                    </Link>
                  </Button>
                ))}
                <div className="w-full h-px bg-white/20 my-4" />
                {[
                  { label: "Sobre nosotros", id: "vision" },
                  { label: "Certificaciones", id: "courses" },
                  { label: "Contáctanos", id: "contact" },
                ].map((link, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="text-white text-xl w-full"
                    onClick={() => {
                      handleScroll(link.id);
                      setOpen(false);
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}
