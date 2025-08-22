import { NextResponse } from "next/server";

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
    const response = await fetch(
      "https://app.t-cert.us/api/certification-params",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`API externa respondió con status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    if (!data.certifications || !data.params) {
      throw new Error("Estructura de datos inválida de la API externa");
    }

    const activeCertifications = data.certifications.filter(
      (cert: Certification) => cert.active === true
    );

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
