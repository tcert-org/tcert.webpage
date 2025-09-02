import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY!);

export async function POST(req: NextRequest) {
  console.log("[obtener-certificacion] 🚀 Iniciando proceso de creación de sesión de pago");
  
  try {
    const { email, cert, certId, price } = await req.json();
    console.log("[obtener-certificacion] 📋 Datos recibidos:", { email, cert, certId, price });

    if (!email || !cert || !certId || !price) {
      console.error("[obtener-certificacion] ❌ Faltan datos requeridos:", { email, cert, certId, price });
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
    console.log("[obtener-certificacion] 🌐 Base URL:", baseUrl);

    console.log("[obtener-certificacion] 💳 Creando sesión de Stripe...");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Certificación ${cert}`,
            },
            unit_amount: Number(price) * 100, // Stripe espera centavos
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        certification: certId,
        email,
      },
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
    });

    console.log("[obtener-certificacion] ✅ Sesión de Stripe creada exitosamente:");
    console.log("[obtener-certificacion] Session ID:", session.id);
    console.log("[obtener-certificacion] URL:", session.url);
    console.log("[obtener-certificacion] Metadata:", session.metadata);
    console.log("[obtener-certificacion] Customer email:", session.customer_email);

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    console.error("[obtener-certificacion] ❌ Error al crear sesión:", errorMessage);
    console.error("[obtener-certificacion] Stack trace:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
