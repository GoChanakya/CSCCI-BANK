import { NextResponse } from "next/server";
import { readVerifiedToken } from "@/lib/otp";
import { addLead } from "@/lib/store";

/** Notify the manager. Webhook if configured; always visible in the CMS. */
async function notifyManager(summary: string) {
  const url = process.env.MANAGER_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: summary }),
    });
  } catch (err) {
    console.error("[leads] manager notification failed", err);
  }
}

export async function POST(req: Request) {
  const body = (await req.json()) as {
    token?: string;
    name?: string;
    schemeInterest?: string;
    note?: string;
  };

  const phone = body.token ? readVerifiedToken(body.token) : null;
  if (!phone) {
    return NextResponse.json({ error: "not_verified" }, { status: 401 });
  }

  const name = (body.name ?? "").trim().slice(0, 80);
  const schemeInterest = (body.schemeInterest ?? "").trim().slice(0, 120);
  if (name.length < 2) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }

  const lead = await addLead({
    name,
    phone,
    schemeInterest: schemeInterest || "General enquiry",
    note: (body.note ?? "").trim().slice(0, 500) || undefined,
  });

  await notifyManager(
    `New member enquiry: ${lead.name}, +91 ${lead.phone} — ${lead.schemeInterest}`,
  );

  return NextResponse.json({ ok: true });
}
