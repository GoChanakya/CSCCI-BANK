import { NextResponse } from "next/server";
import { normalisePhone, sendOtp } from "@/lib/otp";

const recent = new Map<string, number>();

export async function POST(req: Request) {
  const { phone } = (await req.json()) as { phone?: string };
  const normalised = normalisePhone(phone ?? "");
  if (!normalised) {
    return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
  }

  const last = recent.get(normalised) ?? 0;
  if (Date.now() - last < 30_000) {
    return NextResponse.json({ error: "too_soon" }, { status: 429 });
  }
  recent.set(normalised, Date.now());

  const result = await sendOtp(normalised);
  if (!result.ok) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, devCode: result.devCode });
}
