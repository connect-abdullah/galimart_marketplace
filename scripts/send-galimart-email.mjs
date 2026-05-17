import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  const envPath = resolve(root, ".env.local");
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const key = trimmed.slice(0, i);
    let val = trimmed.slice(i + 1);
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

loadEnv();

const html = readFileSync(resolve(root, "components/email/galimart-marketing.html"), "utf8");
const logo = readFileSync(resolve(root, "public/Logo.png"));

const user = process.env.GOOGLE_EMAIL ?? "insights.abdullah@gmail.com";
const pass = process.env.GOOGLE_PASSWORD;

if (!pass) {
  console.error("Missing GOOGLE_PASSWORD in .env.local");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: process.env.GOOGLE_SMTP ?? "smtp.gmail.com",
  port: Number(process.env.GOOGLE_PORT ?? 587),
  secure: false,
  auth: { user, pass },
});

const info = await transporter.sendMail({
  from: `GaliMart <${user}>`,
  to: "abdullah.mani.nani@gmail.com",
  subject: "GaliMart Marketplace",
  html,
  attachments: [
    {
      filename: "Logo.png",
      content: logo,
      cid: "galimartlogo",
    },
  ],
});

console.log("Email sent to abdullah.mani.nani@gmail.com —", info.messageId);
