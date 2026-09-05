import "server-only";
import crypto from "node:crypto";

/**
 * OTP adapter.
 *
 * The production OTP service is an existing in-house tool (Harsh's), so this
 * file is deliberately thin: point OTP_PROVIDER_URL at it and the two functions
 * below forward to it. With no URL configured we fall back to a local dev
 * provider that prints the code to the server console — enough to build and
 * demo the whole enquiry flow without any external dependency.
 */

const PROVIDER_URL = process.env.OTP_PROVIDER_URL;
const PROVIDER_KEY = process.env.OTP_PROVIDER_KEY;
const TOKEN_SECRET = process.env.OTP_TOKEN_SECRET ?? "dev-only-insecure-secret";
const TOKEN_TTL_MS = 15 * 60 * 1000;

type DevEntry = { code: string; expires: number; attempts: number };
const devStore = new Map<string, DevEntry>();

export function normalisePhone(input: string): string | null {
  const digits = input.replace(/\D/g, "").replace(/^0+/, "").replace(/^91/, "");
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export async function sendOtp(phone: string): Promise<{ ok: boolean; devCode?: string }> {
  if (PROVIDER_URL) {
    const res = await fetch(`${PROVIDER_URL}/send`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(PROVIDER_KEY ? { authorization: `Bearer ${PROVIDER_KEY}` } : {}),
      },
      body: JSON.stringify({ phone }),
    });
    return { ok: res.ok };
  }

  const code = String(crypto.randomInt(100000, 999999));
  devStore.set(phone, { code, expires: Date.now() + 5 * 60 * 1000, attempts: 0 });
  console.info(`[otp:dev] code for ${phone} is ${code}`);
  return { ok: true, devCode: process.env.NODE_ENV === "development" ? code : undefined };
}

export async function verifyOtp(phone: string, code: string): Promise<boolean> {
  if (PROVIDER_URL) {
    const res = await fetch(`${PROVIDER_URL}/verify`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(PROVIDER_KEY ? { authorization: `Bearer ${PROVIDER_KEY}` } : {}),
      },
      body: JSON.stringify({ phone, code }),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { verified?: boolean };
    return data.verified === true;
  }

  const entry = devStore.get(phone);
  if (!entry || entry.expires < Date.now() || entry.attempts >= 5) return false;
  entry.attempts += 1;
  const ok = crypto.timingSafeEqual(Buffer.from(entry.code), Buffer.from(code.padEnd(6).slice(0, 6)));
  if (ok) devStore.delete(phone);
  return ok;
}

/* --- proof-of-verification token, so /api/leads can't be posted blindly --- */

export function issueVerifiedToken(phone: string): string {
  const payload = `${phone}.${Date.now() + TOKEN_TTL_MS}`;
  const sig = crypto.createHmac("sha256", TOKEN_SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function readVerifiedToken(token: string): string | null {
  const [phone, expiry, sig] = token.split(".");
  if (!phone || !expiry || !sig) return null;
  const expected = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(`${phone}.${expiry}`)
    .digest("hex");
  if (sig.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  if (Number(expiry) < Date.now()) return null;
  return phone;
}
