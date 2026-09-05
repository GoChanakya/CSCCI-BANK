import { NextResponse } from "next/server";
import { issueVerifiedToken, normalisePhone, verifyOtp } from "@/lib/otp";

export async function POST(req: Request) {
  const { phone, code } = (await req.json()) as { phone?: string; code?: string };
  const normalised = normalisePhone(phone ?? "");
  if (!normalised || !/^\d{4,8}$/.test(code ?? "")) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  if (!(await verifyOtp(normalised, code!))) {
    return NextResponse.json({ error: "wrong_code" }, { status: 401 });
  }
  return NextResponse.json({ ok: true, token: issueVerifiedToken(normalised) });
}
