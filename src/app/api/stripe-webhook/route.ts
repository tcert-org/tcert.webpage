import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendMail } from "@/tool-email/mailer";

const stripe = new Stripe(process.env.STRIPE_API_KEY!);

// Opcional: pon tu secret de webhook en .env
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Función auxiliar para obtener el nombre de la certificación
async function getCertificationName(certificationId: number): Promise<string> {
  try {
    const response = await fetch("https://app.t-cert.us/api/certification-params", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API respondió con status: ${response.status}`);
    }

    const data = await response.json();
    const certification = data.certifications?.find(
      (cert: { id: number; name: string }) => cert.id === certificationId
    );

    return certification?.name || `Certificación ID: ${certificationId}`;
  } catch (error) {
    console.error("Error obteniendo nombre de certificación:", error);
    return `Certificación ID: ${certificationId}`;
  }
}

export async function POST(req: NextRequest) {
  console.log("[stripe-webhook] 🚀 Webhook recibido - Iniciando procesamiento");
  console.log("[stripe-webhook] Variables de entorno disponibles:", {
    STRIPE_API_KEY: process.env.STRIPE_API_KEY ? "✅ Configurada" : "❌ No configurada",
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ? "✅ Configurada" : "❌ No configurada",
    MAILER_HOST: process.env.MAILER_HOST ? "✅ Configurada" : "❌ No configurada",
    MAILER_EMAIL: process.env.MAILER_EMAIL ? "✅ Configurada" : "❌ No configurada",
  });

  const sig = req.headers.get("stripe-signature");
  console.log("[stripe-webhook] Stripe signature recibida:", sig ? "✅ Presente" : "❌ Ausente");
  
  const rawBody = await req.text();
  console.log("[stripe-webhook] Body length:", rawBody.length);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
    console.log("[stripe-webhook] ✅ Evento Stripe construido correctamente:", event.type);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Error desconocido";
    console.error("[stripe-webhook] ❌ Error construyendo evento:", errorMessage);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  console.log("[stripe-webhook] 📋 Procesando evento:", event.type);
  
  if (event.type === "checkout.session.completed") {
    console.log("[stripe-webhook] 💳 Procesando checkout.session.completed");
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;
    const certification = session.metadata?.certification;

    console.log("[stripe-webhook] 📧 Datos extraídos del evento:", {
      email,
      certification,
      sessionId: session.id,
      amount: session.amount_total,
      currency: session.currency,
    });

    if (email && certification) {
      console.log("[stripe-webhook] ✅ Datos válidos, creando voucher...");
      try {
        console.log("[stripe-webhook] 🔄 Enviando petición para crear voucher:", {
          url: "https://app.t-cert.us/api/vouchers/public",
          body: { email, certification: Number(certification) }
        });

        const voucherRes = await fetch("https://app.t-cert.us/api/vouchers/public", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "User-Agent": "tcert-webhook/1.0",
            "Authorization": `Bearer ${process.env.LANDING_API_KEY}`,
            "X-API-Key": process.env.LANDING_API_KEY!
          },
          body: JSON.stringify({ email, certification: Number(certification) }),
        });
        
        const voucherText = await voucherRes.text();
        console.log("[stripe-webhook] 📝 Respuesta completa de /api/vouchers/public:");
        console.log("[stripe-webhook] Status:", voucherRes.status);
        console.log("[stripe-webhook] Status Text:", voucherRes.statusText);
        console.log("[stripe-webhook] Headers:", Object.fromEntries(voucherRes.headers.entries()));
        console.log("[stripe-webhook] Body:", voucherText);
        console.log("[stripe-webhook] Body length:", voucherText.length);

        // Intentar parsear como JSON para ver si hay un error específico
        if (voucherText) {
          try {
            const parsedResponse = JSON.parse(voucherText);
            console.log("[stripe-webhook] 📊 Respuesta parseada:", parsedResponse);
          } catch {
            console.log("[stripe-webhook] ⚠️ No se pudo parsear la respuesta como JSON");
          }
        } else {
          console.log("[stripe-webhook] ⚠️ Respuesta vacía de la API externa");
        }

        if (!voucherRes.ok) {
          console.error("[stripe-webhook] ❌ Error al crear voucher. Status:", voucherRes.status, "Body:", voucherText);
        } else {
          console.log("[stripe-webhook] ✅ Voucher creado exitosamente para:", email);
          
          try {
            const voucherData = JSON.parse(voucherText);
            const voucherCode = voucherData.voucher_code || voucherData.code || voucherData.data?.voucher_code || voucherData.data?.code || "Código no disponible";
            console.log("[stripe-webhook] 🎫 Código de voucher obtenido:", voucherCode);

            // Obtener el nombre de la certificación
            console.log("[stripe-webhook] 🔍 Obteniendo nombre de certificación para ID:", certification);
            const certificationName = await getCertificationName(Number(certification));
            console.log("[stripe-webhook] 📋 Nombre de certificación obtenido:", certificationName);

            // Enviar correo con el voucher
            console.log("[stripe-webhook] 📧 Enviando correo con voucher...");
            await sendMail({
              to: email,
              subject: `Tu código de voucher para ${certificationName} - T-CERT`,
              template: "voucher.ejs",
              context: {
                email,
                voucherCode,
                certificationName,
              },
            });

            console.log("[stripe-webhook] ✅ Correo de voucher enviado exitosamente a:", email);
          } catch (emailError) {
            console.error("[stripe-webhook] ❌ Error al enviar correo de voucher:", emailError);
            // No retornamos error aquí porque el voucher ya se creó exitosamente
          }
        }
      } catch (err) {
        console.error("[stripe-webhook] ❌ Error general al procesar voucher:", err);
      }
    } else {
      console.warn("[stripe-webhook] ⚠️ Faltan datos para crear voucher:", {
        email: email ? "✅ Presente" : "❌ Ausente",
        certification: certification ? "✅ Presente" : "❌ Ausente",
      });
    }
  } else {
    console.log("[stripe-webhook] ℹ️ Evento no procesado:", event.type);
  }

  console.log("[stripe-webhook] 🏁 Webhook procesado completamente");
  return NextResponse.json({ received: true });
}
