"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  className={`fixed top-0 left-0 right-0 w-full z-50 px-4 md:px-10 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
  <nav className="flex items-center justify-between h-14 md:h-16">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/complete/sm-full-color.png"
            alt="Logo"
            width={100}
            height={40}
            className="transition duration-500 hover:drop-shadow-[0_0_10px_rgba(103,14,226,0.8)]"
          />
        </Link>

  <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {/* Menú desplegable de Inicio */}
          <DropdownMenu>
            <DropdownMenuTrigger className="group text-white font-semibold transition-all duration-300 flex items-center gap-1 relative py-2">
              <span className="relative z-10 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-500">
                Inicio
              </span>
              <ChevronDown className="h-4 w-4 group-hover:text-purple-400 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="bg-gradient-to-b from-zinc-900/95 to-black/95 backdrop-blur-md border-0 shadow-[0_0_1rem_0_rgba(103,14,226,0.3)] p-2 rounded-xl min-w-[220px]"
              sideOffset={20}
            >
              <motion.div className="space-y-1">
                {[
                  { id: "vision", label: "Nuestra Visión" },
                  { id: "courses", label: "Nuestros Cursos" },
                  { id: "contact", label: "Contáctanos" }
                ].map((item, index) => (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => handleScroll(item.id)}
                    className="group text-white/90 hover:text-black rounded-lg p-3 cursor-pointer data-[highlighted]:bg-white/10 transition-all duration-200"
                  >
                    <motion.div
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="font-medium relative">
                        {item.label}
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </motion.div>
                  </DropdownMenuItem>
                ))}
              </motion.div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Link a About Us */}
          <Link href="/about-us">
            <motion.div className="group text-white font-semibold transition-all duration-300 relative py-2">
              <span className="relative z-10 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-500">
                Sobre Nosotros
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </motion.div>
          </Link>

          {/* Link a Validar Certificado */}
          <Link href="/autenticator">
            <motion.div className="group text-white font-semibold transition-all duration-300 relative py-2">
              <span className="relative z-10 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-500">
                Validar Certificado
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </motion.div>
          </Link>
        </div>

  <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              className="relative overflow-hidden group text-white bg-[#670EE2] hover:bg-[#670EE2]/90"
              asChild
            >
              <Link href="https://app.t-cert.us/sign-in">
                <span className="relative z-10">Iniciar sesión</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </Button>
          </motion.div>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
            >
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
                {/* Secciones de Inicio */}
                <Button
                  variant="ghost"
                  className="relative overflow-hidden group text-white text-xl w-full hover:bg-transparent font-semibold"
                  onClick={() => handleScroll("vision")}
                >
                  <span className="relative z-10">Nuestra Visión</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Button>
                <Button
                  variant="ghost"
                  className="relative overflow-hidden group text-white text-xl w-full hover:bg-transparent font-semibold"
                  onClick={() => handleScroll("courses")}
                >
                  <span className="relative z-10">Nuestros Cursos</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Button>
                <Button
                  variant="ghost"
                  className="relative overflow-hidden group text-white text-xl w-full hover:bg-transparent font-semibold"
                  onClick={() => handleScroll("contact")}
                >
                  <span className="relative z-10">Contáctanos</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Button>

                <div className="w-full h-px bg-white/20 my-4" />

                {/* About Us y Validar Certificado */}
                <Link href="/about-us" onClick={() => setOpen(false)}>
                  <Button
                    variant="ghost"
                    className="relative overflow-hidden group text-white text-xl w-full hover:bg-transparent font-semibold"
                  >
                    <span className="relative z-10">Sobre Nosotros</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </Button>
                </Link>
                <Link href="/autenticator" onClick={() => setOpen(false)}>
                  <Button
                    variant="ghost"
                    className="relative overflow-hidden group text-white text-xl w-full hover:bg-transparent font-semibold"
                  >
                    <span className="relative z-10">Validar Certificado</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}
