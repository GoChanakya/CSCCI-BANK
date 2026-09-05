/**
 * One-time migration: pushes the local content file into Firestore.
 *
 *   npm run seed:firestore
 *
 * Everything edited through the CMS while the site ran on the filesystem
 * backend lives in data/content.json. Firestore starts empty, so without this
 * the first deploy would silently fall back to the seed defaults and the
 * client's work would look lost. Leads in data/leads.json are copied too.
 *
 * Safe to re-run: it overwrites the site/content document with the local file
 * and re-writes each lead by id. Run it BEFORE the first real CMS edit in
 * production, never after — it would overwrite production content.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
  process.env;

if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  console.error(
    "Missing FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY.\n" +
      "Put them in .env.local and run with:  node --env-file=.env.local scripts/seed-firestore.mjs",
  );
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();
const dataDir = path.join(process.cwd(), "data");

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(path.join(dataDir, file), "utf8"));
  } catch {
    return fallback;
  }
}

const content = await readJson("content.json", null);
if (content) {
  await db.collection("site").doc("content").set(content, { merge: true });
  console.log(
    `Pushed ${Object.keys(content).length} section(s) to site/content:`,
    Object.keys(content).join(", "),
  );
} else {
  console.log("No data/content.json found — Firestore will use seed defaults.");
}

const leads = await readJson("leads.json", []);
for (const lead of leads) {
  await db.collection("leads").doc(lead.id).set(lead);
}
console.log(`Pushed ${leads.length} lead(s).`);

console.log("Done. The site will now read content from Firestore.");
