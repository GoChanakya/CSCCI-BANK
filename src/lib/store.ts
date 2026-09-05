import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { seed } from "@/content/seed";
import { adminApp, firebaseConfigured } from "@/lib/firebase";
import type { Lead, SiteContent } from "@/lib/types";

/**
 * Content store.
 *
 * Two interchangeable backends behind one interface:
 *  - `fs`        — a JSON file under /data. Default; works with zero setup and
 *                  is what runs locally and on any node host with a disk.
 *  - `firestore` — used automatically once FIREBASE_PROJECT_ID /
 *                  FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY are set
 *                  (required on Vercel, whose filesystem is read-only).
 *
 * Everything the CMS writes goes through here, so swapping backends does not
 * touch a single page or component.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

export const usingFirestore = firebaseConfigured;

/* ------------------------------------------------------------------ fs ---- */

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, value: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(file, JSON.stringify(value, null, 2), "utf8");
}

/* ----------------------------------------------------------- firestore ---- */

type Firestore = import("firebase-admin/firestore").Firestore;
let dbPromise: Promise<Firestore> | null = null;

function db(): Promise<Firestore> {
  dbPromise ??= (async () => {
    const { getFirestore } = await import("firebase-admin/firestore");
    return getFirestore(await adminApp());
  })();
  return dbPromise;
}

/* -------------------------------------------------------------- public ---- */

/** Full site content, with seed values as the floor for anything unset. */
export async function getContent(): Promise<SiteContent> {
  if (usingFirestore) {
    const snap = await (await db()).collection("site").doc("content").get();
    return merge(seed, (snap.data() ?? {}) as Partial<SiteContent>);
  }
  return merge(seed, await readJson<Partial<SiteContent>>(CONTENT_FILE, {}));
}

/** Persist a whole top-level section (schemes, org, blocks…). */
export async function saveSection<K extends keyof SiteContent>(
  key: K,
  value: SiteContent[K],
): Promise<void> {
  if (usingFirestore) {
    await (await db())
      .collection("site")
      .doc("content")
      .set({ [key]: value }, { merge: true });
    return;
  }
  const current = await readJson<Partial<SiteContent>>(CONTENT_FILE, {});
  await writeJson(CONTENT_FILE, { ...current, [key]: value });
}

export async function listLeads(): Promise<Lead[]> {
  const leads = usingFirestore
    ? (await (await db()).collection("leads").get()).docs.map(
        (d) => d.data() as Lead,
      )
    : await readJson<Lead[]>(LEADS_FILE, []);
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addLead(
  lead: Omit<Lead, "id" | "createdAt" | "status">,
): Promise<Lead> {
  const record: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  if (usingFirestore) {
    await (await db()).collection("leads").doc(record.id).set(record);
  } else {
    const leads = await readJson<Lead[]>(LEADS_FILE, []);
    await writeJson(LEADS_FILE, [record, ...leads]);
  }
  return record;
}

export async function setLeadStatus(id: string, status: Lead["status"]) {
  if (usingFirestore) {
    await (await db()).collection("leads").doc(id).update({ status });
    return;
  }
  const leads = await readJson<Lead[]>(LEADS_FILE, []);
  await writeJson(
    LEADS_FILE,
    leads.map((l) => (l.id === id ? { ...l, status } : l)),
  );
}

/** Shallow merge per section — a stored section replaces the seed section. */
function merge(base: SiteContent, stored: Partial<SiteContent>): SiteContent {
  const out = { ...base } as SiteContent;
  for (const key of Object.keys(stored) as (keyof SiteContent)[]) {
    const value = stored[key];
    if (value !== undefined && value !== null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (out as any)[key] = value;
    }
  }
  return out;
}
