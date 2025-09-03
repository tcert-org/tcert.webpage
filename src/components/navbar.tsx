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
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);
  // We'll avoid updating React state on every scroll to prevent re-renders.
  // Use a ref to the header element and update its style/classList via RAF.
  const headerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Detect and listen to the actual scroll container (window or a scrollable element)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const getScrollContainer = () => {
      const docEl = document.scrollingElement || document.documentElement || document.body;
      // If document element is scrollable, use it
      if (docEl && docEl.scrollHeight > docEl.clientHeight) return docEl;

      // Try some common containers that might hold the scroll (main, #__next, body, html)
      const candidates = Array.from(document.querySelectorAll("main, #__next, body, html"));
      for (const el of candidates) {
        try {
          if (el && (el as Element).scrollHeight > (el as Element).clientHeight) return el as Element;
        } catch (e) {
          // ignore
        }
      }

      // Fallback to window
      return window;
    };

    const container = getScrollContainer();
    console.log("Navbar scroll container:", container === window ? "window" : (container as Element).tagName);

    let latestPos = 0;
    let ticking = false;

    const applyOpacity = (pos: number) => {
      let opacity = 0;
      if (pos >= 50) {
        opacity = 0.1 + (pos - 50) * 0.004; // reaches 1 at pos ~= 275
      }
      if (opacity > 1) opacity = 1;
      opacity = Math.max(0, Math.min(1, opacity));

      const headerEl = headerRef.current;
      if (!headerEl) return;

      // Update background color (cheap) and toggle expensive effects via classList
      headerEl.style.backgroundColor = `rgba(0,0,0,${opacity})`;

      const showEffects = opacity > 0.001;
      if (showEffects) {
        headerEl.classList.add("backdrop-blur-lg", "shadow-xl");
      } else {
        headerEl.classList.remove("backdrop-blur-lg", "shadow-xl");
      }
    };

    const rafHandler = () => {
      ticking = false;
      applyOpacity(latestPos);
    };

    const onScroll = () => {
      latestPos = container === window ? window.scrollY : ((container as Element).scrollTop || 0);
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(rafHandler);
      }
    };

    // Attach
    if (container === window) {
      window.addEventListener("scroll", onScroll, { passive: true });
    } else {
      (container as Element).addEventListener("scroll", onScroll, { passive: true });
    }

    // initial check
    onScroll();

    return () => {
      if (container === window) {
        window.removeEventListener("scroll", onScroll as EventListener);
      } else {
        (container as Element).removeEventListener("scroll", onScroll as EventListener);
      }
    };
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
      ref={(el) => { headerRef.current = el as HTMLElement | null; }}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ backgroundColor: `rgba(0,0,0,0)` }}
      className={`fixed top-0 left-0 right-0 w-full z-50 px-4 md:px-10 transition-all duration-200 bg-transparent`}
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
                  {/* Logo removed from mobile hamburger menu as requested */}
                </DialogTitle>
              </SheetHeader>
              <div className="flex flex-col items-center gap-8 mt-8">
                {/* Secciones de Inicio */}
                <Button
                  variant="ghost"
                  className="relative overflow-hidden group text-white text-xl w-full hover:bg-transparent font-semibold"
                  onClick={() => { handleScroll("vision"); setOpen(false); }}
                >
                  <span className="relative z-10">Nuestra Visión</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Button>
                <Button
                  variant="ghost"
                  className="relative overflow-hidden group text-white text-xl w-full hover:bg-transparent font-semibold"
                  onClick={() => { handleScroll("courses"); setOpen(false); }}
                >
                  <span className="relative z-10">Nuestros Cursos</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Button>
                <Button
                  variant="ghost"
                  className="relative overflow-hidden group text-white text-xl w-full hover:bg-transparent font-semibold"
                  onClick={() => { handleScroll("contact"); setOpen(false); }}
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
