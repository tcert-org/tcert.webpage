import { NextResponse } from "next/server";

// Definir interfaces para tipado
interface CertificationParam {
  id: number;
  name: string;
  value: string;
}

interface Certification {
  id: number;
  name: string;
  description: string;
  logo_url: string;
  active: boolean;
}

interface ApiResponse {
  params: CertificationParam[];
  certifications: Certification[];
  timestamp: string;
}

export async function GET() {
  try {
    // Realizar la petición a la API externa
    const response = await fetch(
      "https://tcert-platform.vercel.app/api/certification-params",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Sin cache para obtener siempre datos actualizados
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error(`API externa respondió con status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    // Validar que la respuesta tenga la estructura esperada
    if (!data.certifications || !data.params) {
      throw new Error("Estructura de datos inválida de la API externa");
    }

    // Procesar y filtrar solo certificaciones activas
    const activeCertifications = data.certifications.filter(
      (cert: Certification) => cert.active === true
    );

    // Devolver la respuesta procesada
    return NextResponse.json(
      {
        statusCode: 200,
        data: {
          params: data.params,
          certifications: activeCertifications,
          totalCertifications: activeCertifications.length,
          timestamp: data.timestamp,
        },
        message: "Certificaciones obtenidas correctamente",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error al obtener certificaciones:", error);

    return NextResponse.json(
      {
        statusCode: 500,
        data: null,
        error:
          error instanceof Error
            ? error.message
            : "Error interno del servidor al obtener certificaciones",
      },
      { status: 500 }
    );
  }
}
