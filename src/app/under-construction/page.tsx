import Link from "next/link";
import Image from "next/image";

export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="animate-bounce mb-6">
        <Image
          src="/logo/complete/md-white.png"
          alt="T-Cert Logo"
          width={112} // w-28 = 7rem = 112px
          height={112}
          className="w-28 h-auto mx-auto drop-shadow-xl"
        />
      </div>
      <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
        ¡Estamos trabajando!
      </h1>
      <p className="text-lg text-gray-300 mb-8 max-w-xl text-center">
        Esta sección estará disponible muy pronto.<br />
        Nuestro equipo está preparando algo increíble para ti.<br />
        ¡Gracias por tu paciencia!
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <span className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition font-semibold">
            Volver al inicio
          </span>
        </Link>
        <a
          href="mailto:academicmanager@t-cert.us"
          className="inline-block px-6 py-3 bg-white/10 border border-white/30 text-white rounded-lg shadow-lg hover:bg-white/20 transition font-semibold backdrop-blur-sm"
        >
          Contáctanos
        </a>
      </div>
    </div>
  );
}