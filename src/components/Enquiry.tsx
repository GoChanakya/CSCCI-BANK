"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { t } from "@/content/strings";
import { Txt } from "@/components/Txt";

/**
 * Member enquiry flow — lead capture only, deliberately not an onboarding.
 * phone → OTP (existing in-house OTP service) → name + interest → lead saved,
 * manager notified. No member session or account is ever created.
 */

type Ctx = { open: (scheme?: string) => void };
const EnquiryContext = createContext<Ctx>({ open: () => {} });
export const useEnquiry = () => useContext(EnquiryContext);

type Step = "phone" | "otp" | "details" | "done";

export function EnquiryProvider({
  children,
  schemeOptions,
}: {
  children: React.ReactNode;
  schemeOptions: string[];
}) {
  const [isOpen, setOpen] = useState(false);
  const [scheme, setScheme] = useState("");

  const open = useCallback((s?: string) => {
    setScheme(s ?? "");
    setOpen(true);
  }, []);

  return (
    <EnquiryContext.Provider value={{ open }}>
      {children}
      {isOpen && (
        <EnquiryDialog
          initialScheme={scheme}
          schemeOptions={schemeOptions}
          onClose={() => setOpen(false)}
        />
      )}
    </EnquiryContext.Provider>
  );
}

function EnquiryDialog({
  initialScheme,
  schemeOptions,
  onClose,
}: {
  initialScheme: string;
  schemeOptions: string[];
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [scheme, setScheme] = useState(initialScheme || schemeOptions[0] || "");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [devCode, setDevCode] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("input")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function post(url: string, body: unknown) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error ?? "failed");
      return data as Record<string, unknown>;
    } finally {
      setBusy(false);
    }
  }

  const errors: Record<string, string> = {
    invalid_phone: "Enter a valid 10-digit Indian mobile number.",
    too_soon: "An OTP was just sent. Please wait a moment before retrying.",
    wrong_code: "That code did not match. Please try again.",
    invalid_name: "Please enter your name.",
    failed: "Something went wrong. Please try again.",
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-900/50 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Member enquiry"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        className="w-full max-w-md rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
      >
        <div className="brand-rule h-1 rounded-t-2xl" />
        <div className="flex items-start justify-between px-5 pt-4">
          <h2 className="font-display text-lg font-semibold text-maroon-700">
            <Txt v={t.enquiryTitle} />
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 rounded p-1 text-ink-500 hover:bg-sand-100"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 px-5 pb-5 pt-3">
          {step !== "done" && (
            <p className="text-sm text-ink-500">
              <Txt v={t.enquiryIntro} />
            </p>
          )}

          {error && (
            <p className="rounded border border-maroon-200 bg-maroon-50 px-3 py-2 text-sm text-maroon-700">
              {errors[error] ?? errors.failed}
            </p>
          )}

          {step === "phone" && (
            <form
              className="space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const data = await post("/api/otp/send", { phone });
                  setDevCode((data.devCode as string) ?? null);
                  setStep("otp");
                } catch (err) {
                  setError((err as Error).message);
                }
              }}
            >
              <Field label={<Txt v={t.phoneLabel} />}>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-ink-500">+91</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    required
                    className="w-full rounded border border-sand-300 px-3 py-2 text-base"
                  />
                </div>
              </Field>
              <Submit busy={busy}>
                <Txt v={t.sendOtp} />
              </Submit>
            </form>
          )}

          {step === "otp" && (
            <form
              className="space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const data = await post("/api/otp/verify", { phone, code });
                  setToken(data.token as string);
                  setStep("details");
                } catch (err) {
                  setError((err as Error).message);
                }
              }}
            >
              {devCode && (
                <p className="rounded bg-sand-100 px-3 py-2 text-xs text-ink-500">
                  Development mode — OTP is <strong>{devCode}</strong>
                </p>
              )}
              <Field label={<Txt v={t.otpLabel} />}>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  inputMode="numeric"
                  maxLength={6}
                  required
                  className="w-full rounded border border-sand-300 px-3 py-2 text-base tracking-[0.4em]"
                />
              </Field>
              <Submit busy={busy}>
                <Txt v={t.verify} />
              </Submit>
            </form>
          )}

          {step === "details" && (
            <form
              className="space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await post("/api/leads", {
                    token,
                    name,
                    schemeInterest: scheme,
                    note,
                  });
                  setStep("done");
                } catch (err) {
                  setError((err as Error).message);
                }
              }}
            >
              <Field label={<Txt v={t.yourName} />}>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded border border-sand-300 px-3 py-2 text-base"
                />
              </Field>
              <Field label={<Txt v={t.interestedIn} />}>
                <select
                  value={scheme}
                  onChange={(e) => setScheme(e.target.value)}
                  className="w-full rounded border border-sand-300 bg-white px-3 py-2 text-base"
                >
                  {schemeOptions.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                  <option>General enquiry</option>
                </select>
              </Field>
              <Field label={<Txt v={t.noteLabel} />}>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="w-full rounded border border-sand-300 px-3 py-2 text-base"
                />
              </Field>
              <Submit busy={busy}>
                <Txt v={t.submit} />
              </Submit>
            </form>
          )}

          {step === "done" && (
            <div className="space-y-4 py-2 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-saffron-100 text-2xl">
                ✓
              </div>
              <p className="text-sm text-ink-700">
                <Txt v={t.thanks} />
              </p>
              <button
                onClick={onClose}
                className="rounded bg-maroon-600 px-4 py-2 text-sm font-medium text-white"
              >
                <Txt v={t.close} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-ink-700">{label}</span>
      {children}
    </label>
  );
}

function Submit({ busy, children }: { busy: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="w-full rounded bg-maroon-600 px-4 py-2.5 font-medium text-white transition hover:bg-maroon-700 disabled:opacity-60"
    >
      {children}
    </button>
  );
}

/** Any button anywhere on the site can start the flow. */
export function EnquiryButton({
  scheme,
  className = "",
  children,
}: {
  scheme?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useEnquiry();
  return (
    <button type="button" onClick={() => open(scheme)} className={className}>
      {children}
    </button>
  );
}
