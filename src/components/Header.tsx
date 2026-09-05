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
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <div className="bg-maroon-700 text-sand-50">
        <div className="container-page flex items-center gap-3 py-2.5">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <Crest />
            <span className="min-w-0">
              <span className="block truncate font-display text-[13px] leading-tight font-semibold sm:text-base">
                <Txt v={orgName} />
              </span>
              <span className="hidden text-[11px] text-sand-300 sm:block">
                Registered credit co-operative society · Kolhapur
              </span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <LangToggle />
            <EnquiryButton className="rounded bg-saffron-500 px-3 py-1.5 text-xs font-semibold text-maroon-900 transition hover:bg-saffron-400 sm:text-sm">
              <Txt v={t.memberLogin} />
            </EnquiryButton>
            <button
              className="rounded p-2 lg:hidden"
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
      <nav className="hidden bg-maroon-800 text-sand-100 lg:block">
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
                  className={`flex items-center gap-1 px-4 py-3 text-[13px] font-medium tracking-wide uppercase transition hover:bg-maroon-900 ${
                    active ? "bg-maroon-900 text-saffron-300" : ""
                  }`}
                >
                  <Txt v={item.label} />
                  {item.children && <span aria-hidden>▾</span>}
                </Link>
                {item.children && openMenu === item.href && (
                  <ul className="absolute left-0 top-full z-50 w-64 border-t-2 border-saffron-500 bg-maroon-900 py-1 shadow-xl">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2.5 text-sm hover:bg-maroon-800 hover:text-saffron-300"
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
        <nav className="max-h-[70vh] overflow-y-auto bg-maroon-800 text-sand-100 lg:hidden">
          <ul className="container-page py-2">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-maroon-700/60 last:border-0">
                <Link href={item.href} className="block py-3 text-sm font-medium">
                  <Txt v={item.label} />
                </Link>
                {item.children && (
                  <ul className="pb-2 pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block py-2 text-sm text-sand-300"
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
  const [lang, setLang] = useState<"en" | "mr">("en");

  useEffect(() => {
    setLang((document.documentElement.dataset.lang as "en" | "mr") ?? "en");
  }, []);

  function pick(next: "en" | "mr") {
    document.documentElement.dataset.lang = next;
    try {
      localStorage.setItem("cscci-lang", next);
    } catch {
      /* private mode — the choice just won't persist */
    }
    setLang(next);
  }

  return (
    <div className="flex overflow-hidden rounded border border-sand-300/40 text-[11px]">
      {(["en", "mr"] as const).map((code) => (
        <button
          key={code}
          onClick={() => pick(code)}
          aria-pressed={lang === code}
          className={`px-2 py-1 font-medium ${
            lang === code ? "bg-sand-100 text-maroon-800" : "text-sand-200"
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
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-saffron-400 bg-maroon-900 font-display text-sm font-bold text-saffron-300"
    >
      छ
    </span>
  );
}
