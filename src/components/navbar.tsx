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
import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

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
    <header className="fixed top-2 left-0 right-0 max-w-[98%] mx-auto z-50 backdrop-blur-lg bg-[#670EE2]/5 rounded-lg px-10">
      <nav className="flex items-center justify-between h-16">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/complete/sm-full-color.png"
            alt="T-Cert Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleScroll("vision")}
            className="text-[#331263] font-extralight hover:text-[#670EE2]"
          >
            Sobre nosotros
          </button>
          <button
            onClick={() => handleScroll("courses")}
            className="text-[#331263] font-extralight hover:text-[#670EE2]"
          >
            Certificaciones
          </button>
          <button
            onClick={() => handleScroll("contact")}
            className="text-[#331263] font-extralight hover:text-[#670EE2]"
          >
            Contáctanos
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button
            className="text-white bg-[#670EE2] hover:bg-[#670EE2]/90"
            asChild
          >
            <Link href="/under-construction">Iniciar sesión</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
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
                <Button
                  variant="ghost"
                  className="text-white text-xl w-full"
                  asChild
                >
                  <Link href="/" onClick={() => setOpen(false)}>
                    Registrarse
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="text-white text-xl w-full"
                  asChild
                >
                  <Link href="/under-construction" onClick={() => setOpen(false)}>
                    Iniciar sesión
                  </Link>
                </Button>
                <div className="w-full h-px bg-white/20 my-4" />
                <Button
                  variant="ghost"
                  className="text-white text-xl w-full"
                  onClick={() => {
                    handleScroll("vision");
                    setOpen(false);
                  }}
                >
                  Sobre nosotros
                </Button>
                <Button
                  variant="ghost"
                  className="text-white text-xl w-full"
                  onClick={() => {
                    handleScroll("courses");
                    setOpen(false);
                  }}
                >
                  Certificaciones
                </Button>
                <Button
                  variant="ghost"
                  className="text-white text-xl w-full"
                  onClick={() => {
                    handleScroll("contact");
                    setOpen(false);
                  }}
                >
                  Contáctanos
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
