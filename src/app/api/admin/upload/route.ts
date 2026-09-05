import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { isSignedIn } from "@/lib/auth";
import { adminApp, bucketName } from "@/lib/firebase";

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

  if (bucketName) {
    try {
      const { getStorage } = await import("firebase-admin/storage");
      // Bucket named explicitly: the shared app may have been initialised by
      // the content store before this route ran.
      const blob = getStorage(await adminApp())
        .bucket(bucketName)
        .file(`uploads/${name}`);
      // No per-object ACL: the bucket uses uniform access and grants allUsers
      // objectViewer once, at bucket level. Everything in it is public media by
      // design (banner photos, board portraits, annual report PDFs).
      await blob.save(bytes, {
        contentType: file.type,
        metadata: { cacheControl: "public, max-age=31536000, immutable" },
      });
      return NextResponse.json({
        url: `https://storage.googleapis.com/${bucketName}/uploads/${name}`,
      });
    } catch (err) {
      // Without this the CMS just showed a blank failure.
      console.error("[upload] bucket write failed", err);
      return NextResponse.json(
        { error: `upload failed: ${(err as Error).message}` },
        { status: 500 },
      );
    }
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
