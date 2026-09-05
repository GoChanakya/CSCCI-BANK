import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";

/**
 * Single-credential manager login (requirements: one shared CMS account, no
 * roles). Password lives in ADMIN_PASSWORD; the session is a signed cookie, so
 * there is no session store to maintain.
 */

const COOKIE = "cscci_admin";
const SECRET = process.env.ADMIN_SESSION_SECRET ?? "dev-only-insecure-secret";
const TTL_MS = 12 * 60 * 60 * 1000;

function sign(value: string) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "cscci-dev";
  const a = Buffer.from(input.padEnd(64).slice(0, 64));
  const b = Buffer.from(expected.padEnd(64).slice(0, 64));
  return crypto.timingSafeEqual(a, b);
}

export async function startSession() {
  const expiry = String(Date.now() + TTL_MS);
  const jar = await cookies();
  jar.set(COOKIE, `${expiry}.${sign(expiry)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TTL_MS / 1000,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isSignedIn(): Promise<boolean> {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return false;
  const [expiry, sig] = raw.split(".");
  if (!expiry || !sig) return false;
  const expected = sign(expiry);
  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  return Number(expiry) > Date.now();
}

/** Throws for any CMS action attempted without a valid session. */
export async function requireSession() {
  if (!(await isSignedIn())) throw new Error("unauthorised");
}
