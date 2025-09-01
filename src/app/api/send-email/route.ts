import { NextResponse } from "next/server";
import { sendMail } from "@/tool-email/mailer";

export async function POST(req: Request) {
  try {
    const { to, subject, name, company, email, phone, details } =
      await req.json();
    if (!to || !subject || !name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const info = await sendMail({
      to,
      subject,
      template: "contact.ejs",
      context: {
        name,
        company: company || "-",
        email,
        phone,
        details: details || "-",
      },
    });
    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: unknown) {
    let message = "Failed to send email";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
