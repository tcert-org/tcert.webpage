"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ObtenerCertificacionForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const cert = searchParams.get("cert");
  const certId = searchParams.get("certId");
  const price = searchParams.get("price");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/obtener-certificacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          cert,
          certId,
          price,
        }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Error al crear la sesión de pago");
      }
    } catch (err) {
      setError("Error al enviar el formulario");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-green-500 mb-4">
          ¡Solicitud enviada!
        </h2>
        <p className="text-white">Revisa tu correo para más instrucciones.</p>
        <Button className="mt-6" onClick={() => router.push("/")}>
          Volver al inicio
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-900 via-fuchsia-900 to-slate-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-white/10"
      >
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Obtener Certificación
        </h1>
        <div>
          <label className="block text-white/80 mb-1">Certificación</label>
          <input
            type="text"
            value={cert || ""}
            readOnly
            className="w-full px-4 py-2 rounded bg-white/20 text-white border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        </div>
        <div>
          <label className="block text-white/80 mb-1">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@email.com"
            className="w-full px-4 py-2 rounded bg-white/20 text-white border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <Button
          type="submit"
          className="w-full rounded-full py-3 px-6 font-medium bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 hover:from-violet-600 hover:via-fuchsia-600 hover:to-orange-500 transition-all shadow-md hover:shadow-lg hover:scale-105 bg-[length:200%_200%] animate-gradient"
          disabled={submitting}
        >
          {submitting ? "Enviando..." : "Comprar Certificación"}
        </Button>
      </form>
    </div>
  );
}
