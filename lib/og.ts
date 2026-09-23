import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Social images are drawn on the server, which needs the photo as data.
 * Works for Supabase URLs and for the local /samples files. Returns null
 * rather than failing, so the card still renders without a photo.
 */
export async function photoAsDataUrl(src?: string): Promise<string | null> {
  if (!src) return null;
  try {
    if (src.startsWith("/")) {
      const file = await readFile(path.join(process.cwd(), "public", src));
      return `data:image/jpeg;base64,${file.toString("base64")}`;
    }
    const res = await fetch(src, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const type = res.headers.get("content-type") ?? "image/jpeg";
    if (!/jpe?g|png/.test(type)) return null; // the image renderer can't draw webp
    const buf = Buffer.from(await res.arrayBuffer());
    return `data:${type};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

/** The default image font has no Arabic, so "Name - الاسم" becomes "Name". */
export function latinName(name: string): string {
  const cut = name.replace(/\s*[-–|]\s*[\u0590-\u08FF].*$/, "").trim();
  return /[A-Za-z]/.test(cut) ? cut : name;
}
