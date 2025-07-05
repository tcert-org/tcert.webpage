import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, company, email, phone, interest, where, details } = body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tcert.ultra@gmail.com",
      pass: "czrrdzdrswcwxoja",
    },
  });

  const mailOptions = {
    from: "tcert.ultra@gmail.com",
    to: "academicmanager@t-cert.us",
    subject: "Nuevo formulario de contacto",
    text: `
      Nombre: ${name}
      Empresa: ${company || "No especificado"}
      Correo: ${email}
      Teléfono: ${phone}
      Interés: ${interest}
      Dónde nos conoció: ${where}
      Detalles: ${details || "Sin detalles adicionales"}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return NextResponse.json(
      { error: "No se pudo enviar el correo" },
      { status: 500 }
    );
  }
}
