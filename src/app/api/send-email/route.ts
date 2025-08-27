import { NextResponse } from "next/server";
import { sendMail } from "@/tool-email/mailer";

export async function POST(req: Request) {
  try {
    const { to, subject, text, html } = await req.json();
    if (!to || !subject || (!text && !html)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const info = await sendMail({ to, subject, text, html });
    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: unknown) {
    let message = "Failed to send email";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
