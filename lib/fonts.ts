import {
  Fraunces,
  Karla,
  Space_Grotesk,
  Schibsted_Grotesk,
  Bricolage_Grotesque,
  Figtree,
  Barlow,
  Barlow_Condensed,
  Cormorant,
  Jost,
  Literata,
  Atkinson_Hyperlegible,
  Noto_Naskh_Arabic,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";

// Latin faces, one pairing per template.
export const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], axes: ["SOFT", "opsz"] });
export const karla = Karla({ variable: "--font-karla", subsets: ["latin"] });
export const spaceGrotesk = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
export const schibsted = Schibsted_Grotesk({ variable: "--font-schibsted", subsets: ["latin"] });

// The four newer templates. preload: false, so a salon page never
// downloads the wedding fonts: the browser fetches a face only when the
// page actually uses it.
const lazy = { subsets: ["latin"] as ("latin")[], preload: false, display: "swap" as const };

// Appointments: friendly, a little round, readable at small sizes.
export const bricolage = Bricolage_Grotesque({ ...lazy, variable: "--font-bricolage" });
export const figtree = Figtree({ ...lazy, variable: "--font-figtree" });
// Quote: workshop signage. Condensed for headings, plain for reading.
export const barlowCondensed = Barlow_Condensed({ ...lazy, variable: "--font-barlow-c", weight: ["500", "600", "700"] });
export const barlow = Barlow({ ...lazy, variable: "--font-barlow", weight: ["400", "500", "600"] });
// Events: invitation serif with a clean geometric partner.
export const cormorant = Cormorant({ ...lazy, variable: "--font-cormorant", style: ["normal", "italic"] });
export const jost = Jost({ ...lazy, variable: "--font-jost" });
// Education: a book serif and a face designed for easy reading.
export const literata = Literata({ ...lazy, variable: "--font-literata" });
export const atkinson = Atkinson_Hyperlegible({ ...lazy, variable: "--font-atkinson", weight: ["400", "700"] });

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

export const fontVariables = [
  fraunces,
  karla,
  spaceGrotesk,
  schibsted,
  bricolage,
  figtree,
  barlowCondensed,
  barlow,
  cormorant,
  jost,
  literata,
  atkinson,
  naskh,
  plexArabic,
]
  .map((f) => f.variable)
  .join(" ");
