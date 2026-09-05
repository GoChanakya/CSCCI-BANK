// Proves the Firebase service account (project cscci-kolhapur) can write to
// the bucket that lives in gochanakya-main, and that the object is publicly
// readable — the exact path /api/admin/upload takes.
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const bucketName = process.env.FIREBASE_STORAGE_BUCKET;

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    storageBucket: bucketName,
  });
}

const name = `uploads/_healthcheck-${Date.now()}.txt`;
const file = getStorage().bucket().file(name);
await file.save(Buffer.from("cscci upload path ok"), {
  contentType: "text/plain",
  metadata: { cacheControl: "public, max-age=60" },
});
console.log("wrote:", name);

const url = `https://storage.googleapis.com/${bucketName}/${name}`;
const res = await fetch(url);
console.log("public read:", res.status, JSON.stringify(await res.text()));

await file.delete();
console.log("cleaned up");
