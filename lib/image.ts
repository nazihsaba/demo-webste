/**
 * Photos from these hosts go through Next.js resizing (see next.config.ts).
 * Anything else is shown as-is, so a photo stored somewhere new still
 * appears instead of showing a broken image.
 */
const RESIZABLE = [/\.supabase\.co$/, /\.googleusercontent\.com$/];

export function canResize(src: string): boolean {
  if (src.startsWith("/")) return true;
  try {
    const host = new URL(src).hostname;
    return RESIZABLE.some((r) => r.test(host));
  } catch {
    return false;
  }
}
