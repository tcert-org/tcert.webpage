import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  try {
    const { email, cert, certId, price } = await req.json();

    if (!email || !cert || !certId || !price) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

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

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
