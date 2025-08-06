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
    <div className="relative min-h-screen p-4 md:p-8 overflow-hidden">
      {/* Fondo metalizado violeta */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-violet-950 to-transparent opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-violet-800/30 via-purple-900/40 to-indigo-950/50"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-violet-600/20 via-transparent to-slate-800/30"></div>

      {/* Efecto metalizado con shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]"></div>

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
      </AnimatePresence>

      <div className="relative mx-auto max-w-[85%] xl:max-w-[55%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 relative bg-white/95 border-violet-400/50 overflow-hidden shadow-xl">
            {/* Efectos sutiles violetas */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50/30 via-transparent to-purple-50/20"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.05),transparent_50%)]"></div>

            <div className="relative z-10">
              <h1 className="text-xl font-bold text-gray-800 flex justify-center">
                FORMULARIO DE CONTACTO
              </h1>
              <p className="text-gray-600 text-sm mb-6 mt-3 flex justify-center">
                Completa el formulario y nos pondremos en contacto contigo lo
                antes posible
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  {
                    id: "name",
                    label: "Nombre*",
                    type: "text",
                    placeholder: "Ingrese su nombre completo",
                  },
                  {
                    id: "company",
                    label: "Empresa",
                    type: "text",
                    placeholder: "Empresa donde trabaja",
                  },
                  {
                    id: "email",
                    label: "Correo electrónico*",
                    type: "email",
                    placeholder: "ejemplo@gmail.com",
                  },
                ].map((field, i) => (
                  <motion.div
                    key={field.id}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.label.includes("*")}
                    />
                  </motion.div>
                ))}

                <motion.div
                  custom={3}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Label>Teléfono*</Label>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="col-span-2">
                      <Select defaultValue="+57" name="country">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((c: Country, idx: number) => (
                            <SelectItem key={idx} value={c.dial_code}>
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
                >
                  <Label htmlFor="interest">
                    ¿En qué certificación está interesado/a?*
                  </Label>
                  <Input
                    id="interest"
                    name="interest"
                    placeholder="Scrum Master, PMP, ITIL, etc."
                    required
                  />
                </motion.div>

                <motion.div
                  custom={5}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Label htmlFor="details">Detalles adicionales</Label>
                  <Textarea
                    id="details"
                    name="details"
                    placeholder="Escriba información que creas relevante"
                    className="min-h-[120px]"
                  />
                </motion.div>

                <motion.div
                  custom={6}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Checkbox
                      id="terms"
                      name="terms"
                      required
                      className="mt-1"
                      onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm leading-tight text-gray-700"
                    >
                      Al enviar este formulario, acepto los{" "}
                      <Link
                        href="#"
                        className="text-violet-600 hover:text-violet-800 hover:underline"
                      >
                        Términos y condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link
                        href="#"
                        className="text-violet-600 hover:text-violet-800 hover:underline"
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
                >
                  <Button
                    type="submit"
                    className={`flex w-80 mx-auto transition-all duration-300 ${
                      termsAccepted
                        ? "bg-violet-600 hover:bg-violet-700 hover:scale-105 text-white"
                        : "bg-violet-400 cursor-not-allowed text-white"
                    }`}
                    disabled={!termsAccepted}
                  >
                    Enviar
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
