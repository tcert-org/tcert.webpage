"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries, Country } from "../../utils/countries";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export default function ContactForm() {
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/send-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showToast("success", "Formulario enviado exitosamente");
        form.reset();
      } else {
        showToast("error", "Hubo un error al enviar el formulario");
      }
    } catch {
      showToast("error", "No se pudo enviar. Verifica tu conexión.");
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <div className="relative min-h-screen p-3 md:p-6 overflow-hidden flex items-center">
      {/* Fondo integrado que continúa desde la página principal */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
      {/* Efectos sutiles púrpura */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-purple-800/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_70%)]"></div>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-6 right-6 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-white z-50 ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>{" "}
      <div className="relative mx-auto max-w-[75%] xl:max-w-[45%] w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 md:p-8 relative bg-transparent border-2 border-white/20 backdrop-blur-md overflow-hidden shadow-2xl rounded-2xl">
            {/* Efectos sutiles */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-orange-400 to-purple-400"></div>

            <div className="relative z-10">
              <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  FORMULARIO DE CONTACTO
                </h1>
                <p className="text-white/80 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                  Completa el formulario y nos pondremos en contacto contigo lo
                  antes posible
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nombre */}
                <motion.div
                  custom={0}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <Label htmlFor="name" className="text-white font-medium">
                    Nombre*
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ingrese su nombre completo"
                    required
                    className="bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-purple-400 focus:ring-purple-400/30 backdrop-blur-sm h-10 rounded-xl"
                  />
                </motion.div>

                {/* Empresa y Email en la misma fila */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    custom={1}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <Label htmlFor="company" className="text-white font-medium">
                      Empresa
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Empresa donde trabaja"
                      className="bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-purple-400 focus:ring-purple-400/30 backdrop-blur-sm h-10 rounded-xl"
                    />
                  </motion.div>

                  <motion.div
                    custom={2}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <Label htmlFor="email" className="text-white font-medium">
                      Correo electrónico*
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="ejemplo@gmail.com"
                      required
                      className="bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-purple-400 focus:ring-purple-400/30 backdrop-blur-sm h-10 rounded-xl"
                    />
                  </motion.div>
                </div>

                <motion.div
                  custom={3}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <Label className="text-white font-medium">Teléfono*</Label>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="col-span-1">
                      <Select defaultValue="+1" name="country">
                        <SelectTrigger className="bg-white/10 border-white/30 text-white focus:border-purple-400 backdrop-blur-sm h-10 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900/95 border-white/20 backdrop-blur-md">
                          {countries.map((c: Country, idx: number) => (
                            <SelectItem
                              key={idx}
                              value={c.dial_code}
                              className="text-white hover:bg-white/10 focus:bg-white/10"
                            >
                              {c.flag} {c.dial_code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3">
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="3012226235"
                        required
                        className="bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-purple-400 focus:ring-purple-400/30 backdrop-blur-sm h-10 rounded-xl"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  custom={4}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <Label htmlFor="interest" className="text-white font-medium">
                    ¿En qué certificación está interesado/a?*
                  </Label>
                  <Input
                    id="interest"
                    name="interest"
                    placeholder="Scrum Master, PMP, ITIL, etc."
                    required
                    className="bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-purple-400 focus:ring-purple-400/30 backdrop-blur-sm h-10 rounded-xl"
                  />
                </motion.div>

                <motion.div
                  custom={5}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <Label htmlFor="details" className="text-white font-medium">
                    Detalles adicionales
                  </Label>
                  <Textarea
                    id="details"
                    name="details"
                    placeholder="Escriba información que creas relevante"
                    className="min-h-[100px] bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-purple-400 focus:ring-purple-400/30 backdrop-blur-sm rounded-xl resize-none"
                  />
                </motion.div>

                <motion.div
                  custom={6}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="pt-2"
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      name="terms"
                      required
                      className="mt-1 border-white/40 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500 data-[state=checked]:text-white"
                      onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm leading-relaxed text-white/90"
                    >
                      Al enviar este formulario, acepto los{" "}
                      <Link
                        href="#"
                        className="text-orange-400 hover:text-orange-300 hover:underline font-medium transition-colors"
                      >
                        Términos y condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link
                        href="#"
                        className="text-orange-400 hover:text-orange-300 hover:underline font-medium transition-colors"
                      >
                        Política de privacidad
                      </Link>
                    </Label>
                  </div>
                </motion.div>

                <motion.div
                  custom={7}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="pt-3"
                >
                  <Button
                    type="submit"
                    className={`w-full max-w-md mx-auto h-12 font-semibold rounded-xl transition-all duration-300 ${
                      termsAccepted
                        ? "bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 hover:scale-105 text-white shadow-lg hover:shadow-purple-500/30"
                        : "bg-white/20 cursor-not-allowed text-white/50 border border-white/30"
                    }`}
                    disabled={!termsAccepted}
                  >
                    Enviar Formulario
                  </Button>
                </motion.div>
              </form>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
