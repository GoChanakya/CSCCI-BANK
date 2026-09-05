"use client";

import { useState, useTransition } from "react";
import { saveSectionAction } from "@/app/(admin)/admin/actions";
import type { SiteContent } from "@/lib/types";

/**
 * One schema-driven editor drives every CMS screen. Each collection declares
 * its fields; this renders plain labelled inputs (no rich-text, no jargon) and
 * saves the whole section in one action. Written for a manager, not a
 * developer: every field carries a plain-English hint and nothing is required
 * to be filled in a particular order.
 */

export type Field = {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "bilingual"
    | "bilingual-long"
    | "number"
    | "boolean"
    | "select"
    | "image"
    | "pdf";
  hint?: string;
  options?: { value: string; label: string }[];
  /** Fields the client must supply before launch get a reminder badge. */
  clientSupplied?: boolean;
};

type Rec = Record<string, unknown>;

export function RecordEditor({
  sectionKey,
  fields,
  initial,
  blank,
  titleField,
  allowAdd = true,
}: {
  sectionKey: keyof SiteContent;
  fields: Field[];
  initial: Rec[];
  blank: Rec;
  titleField: string;
  allowAdd?: boolean;
}) {
  const [items, setItems] = useState<Rec[]>(initial);
  const [openIndex, setOpenIndex] = useState<number | null>(
    initial.length === 1 ? 0 : null,
  );

  function update(i: number, key: string, value: unknown) {
    setItems((prev) =>
      prev.map((item, idx) => (idx === i ? { ...item, [key]: value } : item)),
    );
  }

  function move(i: number, dir: -1 | 1) {
    setItems((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next.map((item, idx) =>
        "order" in item ? { ...item, order: idx + 1 } : item,
      );
    });
  }

  return (
    <SaveShell sectionKey={sectionKey} value={items}>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={String(item.id ?? item.slug ?? i)} className="rounded-lg border border-sand-300 bg-white">
            <div className="flex items-center gap-2 px-3 py-2">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex-1 text-left font-medium text-maroon-700"
              >
                {label(item[titleField]) || "(untitled)"}
              </button>
              <button type="button" onClick={() => move(i, -1)} aria-label="Move up" className="px-1.5 text-ink-500">
                ↑
              </button>
              <button type="button" onClick={() => move(i, 1)} aria-label="Move down" className="px-1.5 text-ink-500">
                ↓
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Remove this entry from the website?")) {
                    setItems((prev) => prev.filter((_, idx) => idx !== i));
                    setOpenIndex(null);
                  }
                }}
                className="rounded px-2 py-1 text-xs text-maroon-600 hover:bg-maroon-50"
              >
                Remove
              </button>
            </div>

            {openIndex === i && (
              <div className="space-y-4 border-t border-sand-200 px-3 py-4">
                {fields.map((f) => (
                  <FieldInput
                    key={f.key}
                    field={f}
                    value={item[f.key]}
                    onChange={(v) => update(i, f.key, v)}
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      {allowAdd && (
        <button
          type="button"
          onClick={() => {
            setItems((prev) => [
              ...prev,
              { ...structuredClone(blank), id: crypto.randomUUID().slice(0, 8) },
            ]);
            setOpenIndex(items.length);
          }}
          className="mt-3 rounded border border-dashed border-maroon-400 px-4 py-2 text-sm font-medium text-maroon-700"
        >
          + Add new
        </button>
      )}
    </SaveShell>
  );
}

export function SingleEditor({
  sectionKey,
  fields,
  initial,
}: {
  sectionKey: keyof SiteContent;
  fields: Field[];
  initial: Rec;
}) {
  const [value, setValue] = useState<Rec>(initial);
  return (
    <SaveShell sectionKey={sectionKey} value={value}>
      <div className="space-y-4 rounded-lg border border-sand-300 bg-white p-4">
        {fields.map((f) => (
          <FieldInput
            key={f.key}
            field={f}
            value={value[f.key]}
            onChange={(v) => setValue((prev) => ({ ...prev, [f.key]: v }))}
          />
        ))}
      </div>
    </SaveShell>
  );
}

function SaveShell({
  sectionKey,
  value,
  children,
}: {
  sectionKey: keyof SiteContent;
  value: unknown;
  children: React.ReactNode;
}) {
  const [pending, start] = useTransition();
  const [status, setStatus] = useState<string | null>(null);

  return (
    <div>
      {children}
      <div className="sticky bottom-0 mt-5 flex items-center gap-3 border-t border-sand-300 bg-sand-50/95 py-3 backdrop-blur">
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            start(async () => {
              const res = await saveSectionAction(
                sectionKey,
                JSON.stringify(value),
              );
              setStatus(res.ok ? "Saved — the website is updated." : res.error);
            })
          }
          className="rounded bg-maroon-600 px-5 py-2.5 font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
        {status && <span className="text-sm text-ink-700">{status}</span>}
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const l = (value ?? { en: "", mr: "" }) as { en: string; mr: string };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-sm font-semibold text-ink-900">{field.label}</label>
        {field.clientSupplied && (
          <span className="rounded bg-saffron-100 px-1.5 py-0.5 text-[11px] font-medium text-saffron-700">
            leave blank until the society confirms it
          </span>
        )}
      </div>
      {field.hint && <p className="mb-1 text-xs text-ink-500">{field.hint}</p>}

      {field.type === "bilingual" && (
        <div className="grid gap-2 sm:grid-cols-2">
          <Input
            placeholder="English"
            value={l.en ?? ""}
            onChange={(v) => onChange({ ...l, en: v })}
          />
          <Input
            placeholder="मराठी"
            value={l.mr ?? ""}
            onChange={(v) => onChange({ ...l, mr: v })}
          />
        </div>
      )}

      {field.type === "bilingual-long" && (
        <div className="grid gap-2 sm:grid-cols-2">
          <Area
            placeholder="English"
            value={l.en ?? ""}
            onChange={(v) => onChange({ ...l, en: v })}
          />
          <Area
            placeholder="मराठी"
            value={l.mr ?? ""}
            onChange={(v) => onChange({ ...l, mr: v })}
          />
        </div>
      )}

      {field.type === "text" && (
        <Input
          value={(value as string) ?? ""}
          onChange={(v) => onChange(v === "" ? null : v)}
        />
      )}

      {field.type === "textarea" && (
        <Area
          value={(value as string) ?? ""}
          onChange={(v) => onChange(v === "" ? null : v)}
        />
      )}

      {field.type === "number" && (
        <Input
          type="number"
          value={String(value ?? "")}
          onChange={(v) => onChange(Number(v))}
        />
      )}

      {field.type === "boolean" && (
        <label className="mt-1 inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4"
          />
          Shown on the website
        </label>
      )}

      {field.type === "select" && (
        <select
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded border border-sand-300 bg-white px-3 py-2"
        >
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}

      {(field.type === "image" || field.type === "pdf") && (
        <Uploader
          kind={field.type}
          value={(value as string) ?? null}
          onChange={onChange}
        />
      )}
    </div>
  );
}

function Uploader({
  kind,
  value,
  onChange,
}: {
  kind: "image" | "pdf";
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? "upload failed");
      onChange(data.url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {value &&
        (kind === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="Current"
            className="h-16 w-24 rounded object-cover ring-1 ring-sand-300"
          />
        ) : (
          <a href={value} target="_blank" rel="noreferrer" className="text-sm text-maroon-700 underline">
            Current file
          </a>
        ))}
      <input
        type="file"
        accept={kind === "image" ? "image/*" : "application/pdf"}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
        }}
        className="text-sm"
      />
      {busy && <span className="text-sm text-ink-500">Uploading…</span>}
      {value && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-sm text-maroon-600 underline"
        >
          Remove
        </button>
      )}
      {error && <span className="text-sm text-maroon-700">{error}</span>}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border border-sand-300 bg-white px-3 py-2"
    />
  );
}

function Area({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <textarea
      rows={5}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border border-sand-300 bg-white px-3 py-2"
    />
  );
}

function label(v: unknown): string {
  if (typeof v === "string") return v;
  if (v && typeof v === "object" && "en" in (v as object)) {
    return String((v as { en: string }).en);
  }
  return "";
}
