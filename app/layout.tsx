import type { Metadata } from "next";
import { Public_Sans, Source_Serif_4 } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.person} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description:
    "The online office of Rob Sanders, Commonwealth's Attorney for Kentucky's 16th Judicial Circuit — prosecuting all felonies in Kenton County and keeping the community informed.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    images: [
      { url: "/images/beechwood-classroom.jpg", width: 2000, height: 1333 },
    ],
  },
  icons: { icon: "/images/kenton-seal.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
