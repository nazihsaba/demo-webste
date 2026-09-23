import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { siteUrl } from "@/lib/supabase";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: "Website previews",
  // Previews of real businesses that didn't ask for them: never in search results.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={fontVariables}>{children}</body>
    </html>
  );
}
