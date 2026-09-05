"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  checkPassword,
  endSession,
  requireSession,
  startSession,
} from "@/lib/auth";
import { saveSection, setLeadStatus } from "@/lib/store";
import type { Lead, SiteContent } from "@/lib/types";

export async function loginAction(_prev: string | null, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) return "Incorrect password.";
  await startSession();
  redirect("/admin");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin/login");
}

/**
 * Saves one whole section of the site content. The editor sends the section
 * back as JSON, which keeps one action serving every collection instead of a
 * bespoke endpoint per screen.
 */
export async function saveSectionAction<K extends keyof SiteContent>(
  key: K,
  json: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireSession();
  let parsed: SiteContent[K];
  try {
    parsed = JSON.parse(json) as SiteContent[K];
  } catch {
    return { ok: false, error: "Could not read the submitted data." };
  }
  await saveSection(key, parsed);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function setLeadStatusAction(id: string, status: Lead["status"]) {
  await requireSession();
  await setLeadStatus(id, status);
  revalidatePath("/admin/leads");
}
