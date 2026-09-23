import {
  Fraunces,
  Karla,
  Space_Grotesk,
  Schibsted_Grotesk,
  Noto_Naskh_Arabic,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";

// Latin faces, one pairing per template.
export const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], axes: ["SOFT", "opsz"] });
export const karla = Karla({ variable: "--font-karla", subsets: ["latin"] });
export const spaceGrotesk = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
export const schibsted = Schibsted_Grotesk({ variable: "--font-schibsted", subsets: ["latin"] });

// Arabic partners. The browser only downloads them when a page has Arabic
// letters, so they cost nothing on English-only pages.
export const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  weight: ["400", "500"],
  preload: false,
});
export const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-ar",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  preload: false,
});

export const fontVariables = [fraunces, karla, spaceGrotesk, schibsted, naskh, plexArabic]
  .map((f) => f.variable)
  .join(" ");
