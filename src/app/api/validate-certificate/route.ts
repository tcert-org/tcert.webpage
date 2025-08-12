import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const voucherCode = searchParams.get("voucher_code");

  if (!voucherCode) {
    return NextResponse.json(
      { error: "El código de voucher es requerido" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://tcert-platform.vercel.app/api/diploma/by-voucher-code?voucher_code=${encodeURIComponent(
        voucherCode
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    // Devolver la respuesta tal como la recibimos de la API externa
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error al conectar con la API externa:", error);
    return NextResponse.json(
      {
        statusCode: 500,
        error: "Error interno del servidor al validar el certificado",
      },
      { status: 500 }
    );
  }
}
