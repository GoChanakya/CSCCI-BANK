import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { isSignedIn } from "@/lib/auth";

/**
 * Image / PDF upload for the CMS.
 * Firebase Storage when FIREBASE_STORAGE_BUCKET is configured (required on
 * Vercel), otherwise straight into /public/uploads for local and self-hosted
 * runs. Returns the public URL the CMS stores against the record.
 */

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "application/pdf"];

export async function POST(req: Request) {
  if (!(await isSignedIn())) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no_file" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "unsupported_type" }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }

  const ext = path.extname(file.name).toLowerCase() || guessExt(file.type);
  const name = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const bucketName = process.env.FIREBASE_STORAGE_BUCKET;
  if (bucketName) {
    const { getApps, initializeApp, cert } = await import("firebase-admin/app");
    const { getStorage } = await import("firebase-admin/storage");
    if (!getApps().length) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
        storageBucket: bucketName,
      });
    }
    const blob = getStorage().bucket().file(`uploads/${name}`);
    await blob.save(bytes, { contentType: file.type });
    await blob.makePublic();
    return NextResponse.json({
      url: `https://storage.googleapis.com/${bucketName}/uploads/${name}`,
    });
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), bytes);
  return NextResponse.json({ url: `/uploads/${name}` });
}

function guessExt(type: string) {
  return (
    { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/svg+xml": ".svg", "application/pdf": ".pdf" }[
      type
    ] ?? ""
  );
}
