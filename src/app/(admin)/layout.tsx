import type { Metadata } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";
import "../globals.css";

const noto = Noto_Sans_Devanagari({
  weight: ["400", "500", "700"],
  subsets: ["latin", "devanagari"],
  variable: "--font-noto",
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
    <html lang="en" data-lang="en" className={`${noto.variable} h-full`}>
      <body className="min-h-full bg-sand-100 antialiased">{children}</body>
    </html>
  );
}
