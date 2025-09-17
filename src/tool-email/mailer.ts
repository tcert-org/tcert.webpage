import path from "path";
import ejs from "ejs";
import fs from "fs/promises";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: Number(process.env.MAILER_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
});

type MailOptions = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  context?: Record<string, unknown>;
};

export async function sendMail({
  to,
  subject,
  text,
  html,
  template,
  context,
}: MailOptions) {
  let htmlContent = html;
  if (template) {
    const templatePath = path.join(
      process.cwd(),
      "src/tool-email/templates",
      template
    );
    const templateStr = await fs.readFile(templatePath, "utf8");
    htmlContent = ejs.render(templateStr, context || {});
  }
  const mailOptions = {
    from: process.env.MAILER_EMAIL,
    to,
    subject,
    text,
    html: htmlContent,
  };
  return transporter.sendMail(mailOptions);
}
