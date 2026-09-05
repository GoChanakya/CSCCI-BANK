"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/nav";
import { t } from "@/content/strings";
import { Txt } from "@/components/Txt";
import { EnquiryButton } from "@/components/Enquiry";
import type { L } from "@/lib/types";

export function Header({ orgName }: { orgName: L }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

 useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setOpenMenu(null);
      setMobileOpen(false);
    });
    return () => window.cancelAnimationFrame(frame);
 }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-white/95 shadow-[0_1px_10px_rgba(58,12,14,0.08)] backdrop-blur">
      <div className="bg-white text-ink-900">
        <div className="container-page flex items-center gap-3 py-3">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <Crest />
            <span className="min-w-0">
              <span className="block truncate font-display text-[13px] leading-tight font-bold text-maroon-700 sm:text-base">
                <Txt v={orgName} />
              </span>
              <span className="hidden text-[11px] text-ink-500 sm:block">
                Registered credit co-operative society · Kolhapur
              </span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <LangToggle />
            <EnquiryButton className="rounded-md bg-saffron-500 px-3 py-1.5 text-xs font-semibold text-maroon-900 shadow-sm transition duration-200 hover:bg-saffron-400 hover:shadow sm:text-sm">
              <Txt v={t.memberLogin} />
            </EnquiryButton>
            <button
              className="rounded p-2 text-maroon-700 transition hover:bg-sand-100 lg:hidden"
              aria-expanded={mobileOpen}
              aria-label="Menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="block h-0.5 w-5 bg-current" />
              <span className="mt-1 block h-0.5 w-5 bg-current" />
              <span className="mt-1 block h-0.5 w-5 bg-current" />
            </button>
          </div>
        </div>
      </div>

      <div className="brand-rule h-0.5" />

      {/* desktop nav */}
      <nav className="hidden border-t border-sand-100 bg-white text-ink-700 lg:block">
        <ul className="container-page flex items-stretch">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.href)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 border-b-2 border-transparent px-4 py-3 text-[13px] font-medium tracking-wide uppercase transition duration-200 hover:bg-sand-50 hover:text-maroon-700 ${
                    active ? "border-saffron-500 bg-sand-50 text-maroon-700" : ""
                  }`}
                >
                  <Txt v={item.label} />
                  {item.children && <span aria-hidden>▾</span>}
                </Link>
                {item.children && openMenu === item.href && (
                  <ul className="absolute left-0 top-full z-50 w-64 border-t-2 border-saffron-500 bg-white py-1 text-ink-700 shadow-xl ring-1 ring-sand-200">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2.5 text-sm transition hover:bg-sand-50 hover:text-maroon-700"
                        >
                          <Txt v={child.label} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* mobile nav */}
      {mobileOpen && (
        <nav className="max-h-[70vh] overflow-y-auto border-t border-sand-200 bg-white text-ink-700 lg:hidden">
          <ul className="container-page py-2">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-sand-200 last:border-0">
                <Link href={item.href} className="block py-3 text-sm font-medium text-maroon-700">
                  <Txt v={item.label} />
                </Link>
                {item.children && (
                  <ul className="pb-2 pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block py-2 text-sm text-ink-500 transition hover:text-maroon-700"
                        >
                          <Txt v={child.label} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function LangToggle() {
  const [lang, setLang] = useState<"en" | "mr">(() => {
    if (typeof document === "undefined") return "en";
    const value = document.documentElement.getAttribute("data-lang");
    return value === "mr" ? "mr" : "en";
  });

  function pick(next: "en" | "mr") {
    document.documentElement.setAttribute("data-lang", next);
    try {
      localStorage.setItem("cscci-lang", next);
    } catch {
      /* private mode — the choice just won't persist */
    }
    setLang(next);
  }

  return (
    <div className="flex overflow-hidden rounded-md border border-sand-300 text-[11px]">
      {(["en", "mr"] as const).map((code) => (
        <button
          key={code}
          onClick={() => pick(code)}
          aria-pressed={lang === code}
          className={`px-2 py-1 font-medium ${
            lang === code ? "bg-sand-100 text-maroon-800" : "text-ink-500 hover:bg-sand-50"
          }`}
        >
          {code === "en" ? "EN" : "मराठी"}
        </button>
      ))}
    </div>
  );
}

function Crest() {
  return (
    <span
      aria-hidden
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-maroon-700 bg-maroon-700 font-display text-sm font-bold text-white shadow-sm"
    >
      छ
    </span>
  );
}
