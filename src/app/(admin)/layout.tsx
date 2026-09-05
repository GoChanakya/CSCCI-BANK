import type { Metadata } from "next";
import { Mukta } from "next/font/google";
import "../globals.css";

const body = Mukta({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "devanagari"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Content manager",
  robots: { index: false, follow: false },
};

/** The CMS has its own root layout — no public header, footer or chat widget. */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-lang="en" className={`${body.variable} h-full`}>
      <body className="min-h-full bg-sand-100 antialiased">{children}</body>
    </html>
  );
}
