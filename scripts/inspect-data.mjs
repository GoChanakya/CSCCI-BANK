// Prints what is actually stored where: Firestore documents and bucket objects.
// Handy for handover and for debugging "where did that value go?".
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

const db = getFirestore();

const content = (await db.collection("site").doc("content").get()).data() ?? {};
console.log("FIRESTORE  site/content");
for (const [key, value] of Object.entries(content)) {
  const size = Array.isArray(value) ? `${value.length} item(s)` : "object";
  console.log(`  ${key.padEnd(12)} ${size}`);
}

const leads = await db.collection("leads").get();
console.log(`\nFIRESTORE  leads: ${leads.size} document(s)`);
leads.forEach((d) => {
  const l = d.data();
  console.log(`  ${l.createdAt}  ${l.name} · ${l.phone} · ${l.schemeInterest} · ${l.status}`);
});

const [files] = await getStorage().bucket().getFiles();
console.log(`\nBUCKET  ${process.env.FIREBASE_STORAGE_BUCKET}: ${files.length} object(s)`);
files.slice(0, 20).forEach((f) => {
  console.log(`  ${f.name}  ${Math.round(Number(f.metadata.size) / 1024)} KB`);
});
