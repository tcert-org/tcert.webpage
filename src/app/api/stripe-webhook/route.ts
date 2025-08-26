import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2022-11-15",
});

// Opcional: pon tu secret de webhook en .env
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
  } catch (err: any) {
    console.error("[stripe-webhook] Error construyendo evento:", err);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;
    const certification = session.metadata?.certification;

    console.log("[stripe-webhook] Evento checkout.session.completed recibido", {
      email,
      certification,
    });

    if (email && certification) {
      try {
        const res = await fetch("http://localhost:3000/api/vouchers/public", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, certification: Number(certification) }),
        });
        const text = await res.text();
        console.log(
          "[stripe-webhook] Respuesta de /api/vouchers/public:",
          res.status,
          text
        );
      } catch (err) {
        console.error(
          "[stripe-webhook] Error al hacer fetch a /api/vouchers/public:",
          err
        );
      }
    } else {
      console.warn("[stripe-webhook] Faltan datos para crear voucher", {
        email,
        certification,
      });
    }
  }

  return NextResponse.json({ received: true });
}
