"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import Notiflix from "notiflix";
import { countries, Country } from "../../utils/countries";

export default function ContactForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/send-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Notiflix.Notify.success("Formulario enviado exitosamente");
        form.reset();
      } else {
        Notiflix.Notify.failure(
          "Hubo un error al enviar el formulario. Inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      Notiflix.Notify.failure(
        "No se pudo enviar el formulario. Verifica tu conexión."
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="absolute inset-0 bg-[url('/bg-form-section.webp')] bg-cover bg-center opacity-80"></div>
      <div className="relative mx-auto max-w-[95%] xl:max-w-[75%]">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="hidden md:block"></div>

          <Card className="p-6 animation">
            <h1 className="text-xl font-bold tracking-tight text-[#27282B]">
              FORMULARIO DE CONTACTO
            </h1>
            <p className=" text-gray-600 text-sm mb-6 mt-3">
              Completa el formulario y nos pondremos en contacto contigo lo
              antes posible
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Campos del formulario */}
                <div>
                  <Label htmlFor="name">Nombre*</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ingrese su nombre completo"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Empresa donde trabaja"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Correo electrónico*</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ejemplo@gmail.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-5 gap-2">
                  <div className="col-span-2">
                    <Label htmlFor="country">Teléfono*</Label>
                    <Select defaultValue="+57" name="country">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country: Country, index: number) => (
                          <SelectItem key={index} value={country.dial_code}>
                            <span className="flex items-center gap-2">
                              {country.flag} {country.dial_code}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-3">
                    <Label htmlFor="phone">&nbsp;</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="3012226235"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="interest">
                    ¿En qué certificación está interesado/a?*
                  </Label>
                  <Input
                    id="interest"
                    name="interest"
                    placeholder="Scrum Master, PMP, ITIL, etc."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="where">¿Dónde nos conociste?*</Label>
                  <Select name="where">
                    <SelectTrigger id="where">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="redes-sociales">
                        Redes sociales
                      </SelectItem>
                      <SelectItem value="recomendacion">
                        Recomendación
                      </SelectItem>
                      <SelectItem value="publicidad-online">
                        Publicidad en línea
                      </SelectItem>
                      <SelectItem value="google">Búsqueda en Google</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="details">Detalles adicionales</Label>
                  <Textarea
                    id="details"
                    name="details"
                    placeholder="Escriba información que creas relevante"
                    className="min-h-[120px]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" name="terms" required className="mt-1" />
                  <Label htmlFor="terms" className="text-sm leading-tight">
                    Al enviar este formulario, acepto los{" "}
                    <Link href="#" className="text-purple-600 hover:underline">
                      Términos y condiciones
                    </Link>{" "}
                    y la{" "}
                    <Link href="#" className="text-purple-600 hover:underline">
                      Política de privacidad
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Enviar
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
