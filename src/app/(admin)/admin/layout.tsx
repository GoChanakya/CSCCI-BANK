import Link from "next/link";
import { isSignedIn } from "@/lib/auth";
import { logoutAction } from "@/app/(admin)/admin/actions";

const sections = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/leads", label: "Member enquiries" },
  { href: "/admin/organisation", label: "Institution details" },
  { href: "/admin/banners", label: "Home banners" },
  { href: "/admin/schemes", label: "Schemes" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/fees", label: "Fees table" },
  { href: "/admin/board", label: "Board of directors" },
  { href: "/admin/achievements", label: "Achievements" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/documents", label: "Documents & reports" },
  { href: "/admin/blocks", label: "Page text" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The login page renders bare; every other admin page guards itself.
  if (!(await isSignedIn())) return <>{children}</>;

  return (
    <div className="min-h-screen">
      <header className="flex items-center gap-3 bg-maroon-800 px-4 py-3 text-sand-50">
        <span className="font-semibold">Content manager</span>
        <Link href="/" target="_blank" className="text-sm text-sand-300 underline">
          View website ↗
        </Link>
        <form action={logoutAction} className="ml-auto">
          <button className="rounded border border-sand-300/40 px-3 py-1.5 text-sm">
            Sign out
          </button>
        </form>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 p-4 lg:flex-row">
        <nav className="lg:w-56 lg:shrink-0">
          <ul className="flex gap-1 overflow-x-auto lg:flex-col">
            {sections.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="block whitespace-nowrap rounded px-3 py-2 text-sm font-medium text-ink-700 hover:bg-white"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="min-w-0 flex-1 pb-16">{children}</main>
      </div>
    </div>
  );
}
