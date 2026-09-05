import "server-only";
import type { App } from "firebase-admin/app";

/**
 * Single place the Firebase Admin app is created.
 *
 * It used to be initialised separately in the content store and in the upload
 * route; whichever ran first won, and if that was the store (no storageBucket
 * configured) every upload failed with "Bucket name not specified". One shared
 * initialiser removes the ordering trap.
 */

export const firebaseConfigured = Boolean(
  process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY,
);

export const bucketName = process.env.FIREBASE_STORAGE_BUCKET || null;

let appPromise: Promise<App> | null = null;

export function adminApp(): Promise<App> {
  appPromise ??= (async () => {
    const { getApps, initializeApp, cert } = await import("firebase-admin/app");
    const existing = getApps();
    if (existing.length) return existing[0];

    return initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Env vars keep newlines escaped.
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
      ...(bucketName ? { storageBucket: bucketName } : {}),
    });
  })();
  return appPromise;
}
