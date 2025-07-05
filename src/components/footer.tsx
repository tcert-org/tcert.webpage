import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#D8DBE0] to-[#DCE0E5] py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/logo/complete/sm-full-color.png"
              alt="Cert Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center gap-4">
            <Link
              href="/under-construction"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Acerca de
            </Link>
            <Link
              href="/under-construction"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Certificaciones
            </Link>
            <Link
              href="/under-construction"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contactanos
            </Link>
          </nav>

          {/* Social Media */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-600 text-sm">Síguenos en nuestras redes</p>
            <div className="flex gap-4">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-gray-600 hover:text-[#E4405F] transition-colors"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                className="text-gray-600 hover:text-[#1877F2] transition-colors"
                aria-label="Síguenos en Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="text-gray-600 hover:text-[#0A66C2] transition-colors"
                aria-label="Síguenos en LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
