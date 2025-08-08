"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, XCircle, Loader2, Shield, X } from "lucide-react";

interface ApiResponse {
  statusCode: number;
  data?: {
    voucher: {
      id: number;
      code: string;
    };
    student: {
      id: number;
      fullname: string;
      email: string;
      document_type: string;
      document_number: string;
      voucher_id: number;
    };
    diploma: unknown;
    certification: unknown;
  };
  message?: string;
  error?: string;
}

export default function AuthenticatorPage() {
  const [voucherCode, setVoucherCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const validateCertificate = async () => {
    if (!voucherCode.trim()) {
      setError("Por favor ingresa un código de voucher");
      return;
    }

    setIsLoading(true);
    setError(null);
    setApiResponse(null);

    try {
      const response = await fetch(
        `/api/validate-certificate?voucher_code=${encodeURIComponent(
          voucherCode.trim()
        )}`
      );

      const data = await response.json();
      setApiResponse(data);
      setShowModal(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al conectar con el servidor"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateCertificate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Validar Certificado
          </h1>
          <p className="text-gray-400 text-lg">
            Ingresa el código de voucher para verificar la autenticidad del
            certificado
          </p>
        </motion.div>

        {/* Formulario de búsqueda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="h-5 w-5" />
                Código de Voucher
              </CardTitle>
              <CardDescription className="text-gray-400">
                Introduce el código único que viene en tu certificado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="Ej: VCHR-2OGR3TTPWA"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !voucherCode.trim()}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resultados */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6"
          >
            <Card className="bg-red-900/20 border-red-500/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-red-400">
                  <XCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Modal de resultados */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-gray-800 border border-gray-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header del modal */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    {apiResponse?.statusCode === 200 ? (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    ) : (
                      <XCircle className="h-6 w-6 text-yellow-400" />
                    )}
                    <h2 className="text-xl font-bold text-white">
                      {apiResponse?.statusCode === 200
                        ? "Certificado Válido"
                        : "Certificado No Encontrado"}
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Contenido del modal */}
                <div className="p-6">
                  {apiResponse?.statusCode === 200 && apiResponse.data ? (
                    <div className="space-y-6">
                      {/* Mensaje de éxito */}
                      <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
                        <p className="text-green-400">{apiResponse.message}</p>
                      </div>

                      {/* Información del Voucher */}
                      <div className="bg-gray-700/50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <Shield className="h-5 w-5 text-purple-400" />
                          Información del Voucher
                        </h3>
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div>
                            <span className="text-gray-400">Código:</span>
                            <p className="text-white font-mono">
                              {apiResponse.data.voucher.code}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Información del Estudiante */}
                      <div className="bg-gray-700/50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-3">
                          Información del Estudiante
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-400">
                              Nombre Completo:
                            </span>
                            <p className="text-white">
                              {apiResponse.data.student.fullname}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-400">
                              NI (Número de Identificación):
                            </span>
                            <p className="text-white">
                              {apiResponse.data.student.document_number}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Información del Diploma y Certificación */}
                      <div className="bg-gray-700/50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-3">
                          Estado del Diploma y Certificación
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-400">Diploma:</span>
                            <p className="text-gray-300">
                              {apiResponse.data.diploma
                                ? JSON.stringify(apiResponse.data.diploma)
                                : "No disponible"}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-400">
                              Certificación:
                            </span>
                            <p className="text-gray-300">
                              {apiResponse.data.certification
                                ? JSON.stringify(apiResponse.data.certification)
                                : "No disponible"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Mensaje de error */}
                      <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
                        <p className="text-yellow-400 text-center">
                          {apiResponse?.error ||
                            "No se encontraron datos para este código de voucher"}
                        </p>
                      </div>

                      <div className="text-center text-gray-400">
                        <p>
                          Por favor verifica que el código ingresado sea
                          correcto.
                        </p>
                        <p className="text-sm mt-2">
                          Código buscado:{" "}
                          <span className="font-mono text-white">
                            {voucherCode}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer del modal */}
                <div className="border-t border-gray-700 p-4">
                  <Button
                    onClick={() => setShowModal(false)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Cerrar
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            Este validador verifica la autenticidad de los certificados emitidos
            por T-Cert. Si tienes problemas con la validación, contacta a
            nuestro equipo de soporte.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
