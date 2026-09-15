import type { Metadata } from "next";
import { Fraunces, Karla, Space_Grotesk } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const karla = Karla({ variable: "--font-karla", subsets: ["latin"] });

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Website previews",
  // These are previews of real businesses that did not ask for them,
  // so they must never show up in search results.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${karla.variable} ${spaceGrotesk.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
