import Link from "next/link";

export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f3e8ff] via-[#e0e7ff] to-[#f0fdfa] px-4">
      <div className="animate-bounce mb-6">
        <img
          src="/logo/complete/sm-full-color.png"
          alt="T-Cert Logo"
          className="w-28 h-auto mx-auto drop-shadow-xl"
        />
      </div>
      <h1 className="text-4xl font-extrabold text-[#670EE2] mb-2 drop-shadow-lg">
        ¡Estamos trabajando!
      </h1>
      <p className="text-lg text-gray-700 mb-8 max-w-xl">
        Esta sección estará disponible muy pronto.<br />
        Nuestro equipo está preparando algo increíble para ti.<br />
        ¡Gracias por tu paciencia!
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <span className="inline-block px-6 py-3 bg-[#670EE2] text-white rounded-lg shadow-lg hover:bg-[#4d0bb3] transition font-semibold">
            Volver al inicio
          </span>
        </Link>
        <a
          href="mailto:academicmanager@t-cert.us"
          className="inline-block px-6 py-3 bg-white border border-[#670EE2] text-[#670EE2] rounded-lg shadow-lg hover:bg-[#f3e8ff] transition font-semibold"
        >
          Contáctanos
        </a>
      </div>
    </div>
  );
}