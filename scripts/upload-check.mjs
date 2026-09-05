// Exercises /api/admin/upload exactly as the CMS does: a signed manager
// session cookie plus a multipart file. Prints the raw server response so a
// failing upload shows its real reason instead of a silent empty field.
import crypto from "node:crypto";

const base = process.argv[2] ?? "http://localhost:3000";
const secret = process.env.ADMIN_SESSION_SECRET ?? "dev-only-insecure-secret";

const expiry = String(Date.now() + 10 * 60 * 1000);
const sig = crypto.createHmac("sha256", secret).update(expiry).digest("hex");
const cookie = `cscci_admin=${expiry}.${sig}`;

// A 1x1 PNG.
const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

const form = new FormData();
form.append("file", new Blob([png], { type: "image/png" }), "check.png");

const res = await fetch(`${base}/api/admin/upload`, {
  method: "POST",
  headers: { cookie },
  body: form,
});

const text = await res.text();
console.log("status:", res.status);
console.log("body  :", text);

try {
  const { url } = JSON.parse(text);
  if (url) {
    const head = await fetch(url);
    console.log("public fetch:", head.status, head.headers.get("content-type"));
  }
} catch {
  /* non-JSON body already printed */
}
