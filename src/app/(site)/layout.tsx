import type { Metadata } from "next";
import { Mukta, Tiro_Devanagari_Marathi } from "next/font/google";
import "../globals.css";
import { getContent } from "@/lib/store";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { EnquiryProvider } from "@/components/Enquiry";

const display = Tiro_Devanagari_Marathi({
  weight: "400",
  subsets: ["latin", "devanagari"],
  variable: "--font-display",
  display: "swap",
});

const body = Mukta({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "devanagari"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Chhatrapati Shivaji Co-operative Credit Institution, Kolhapur",
    template: "%s · Chhatrapati Shivaji Co-operative Credit Institution",
  },
  description:
    "A registered teachers' credit co-operative society in Kolhapur offering deposit schemes, member loans and assisted services. Not a bank; not RBI-regulated.",
};

/** Restores the member's language choice before first paint. */
const langScript = `try{var l=localStorage.getItem('cscci-lang');if(l==='mr'||l==='en')document.documentElement.dataset.lang=l}catch(e){}`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent();
  const schemeOptions = content.schemes
    .filter((s) => s.active)
    .map((s) => s.name.en);

  return (
    <html
      lang="en"
      data-lang="en"
      className={`${display.variable} ${body.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: langScript }} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <EnquiryProvider schemeOptions={schemeOptions}>
          <Header orgName={content.org.name} />
          <main className="flex-1">{children}</main>
          <Footer org={content.org} />
          <ChatWidget
            orgName={content.org.name}
            whatsapp={content.org.whatsapp}
          />
        </EnquiryProvider>
      </body>
    </html>
  );
}
