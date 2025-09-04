import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20">
      <section className="max-w-3xl w-full">
        <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-white/10 rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center gap-6">
            <div className="flex-none w-20 h-20 rounded-full bg-green-600/20 flex items-center justify-center ring-1 ring-green-400/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white">¡Pago exitoso!</h1>
              <p className="mt-2 text-sm md:text-base text-white/80">
                Gracias por tu compra. Hemos recibido el pago correctamente y tu certificación estará disponible pronto.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
                <Link href="/" className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-black font-semibold shadow">
                  Volver al inicio
                </Link>
                <Link href="/obtener-certificacion" className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-white/10 text-white/90 hover:bg-white/5">
                  Ver mi certificación
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-white/70">
            <p>
              ¿Necesitas ayuda? Contacta a nuestro equipo de soporte en <a className="text-purple-400 underline" href="mailto:soporte@t-cert.us">soporte@t-cert.us</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
