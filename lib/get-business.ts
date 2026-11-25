import { cache } from "react";
import { kindFor } from "./categories";
import { getSupabase, isSampleMode } from "./supabase";
import { sampleBusinesses } from "./sample-data";
import { TEMPLATE_IDS, type Business, type TemplateId } from "./types";

/**
 * The only file that knows where business data comes from.
 * Supabase columns are snake_case; the templates use camelCase.
 * The translation happens here, once.
 */

type Row = Record<string, unknown>;

const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
const num = (v: unknown) => {
  const n = typeof v === "string" ? Number(v) : v;
  return typeof n === "number" && Number.isFinite(n) ? n : undefined;
};
const arr = <T>(v: unknown): T[] | undefined => (Array.isArray(v) && v.length ? (v as T[]) : undefined);
const obj = <T>(v: unknown): T | undefined =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as T) : undefined;

/**
 * "batroun" or "BATROUN" typed into the form becomes "Batroun".
 * Mixed case someone typed on purpose ("Jal el Dib") is left alone.
 */
const titleCase = (s?: string) => {
  if (!s || (s !== s.toLowerCase() && s !== s.toUpperCase())) return s;
  return s.toLowerCase().replace(/(^|[\s-])\p{L}/gu, (c) => c.toUpperCase());
};

/**
 * Which design a business gets.
 * A specific template saved in Supabase wins, so you can always override
 * one business by hand. "general" or an empty column means "not decided":
 * the Google category picks the design, using the categories in
 * lib/categories.ts. No n8n change is needed for the new templates.
 */
export function pickTemplate(saved: unknown, category?: string): TemplateId {
  const stored = TEMPLATE_IDS.includes(saved as TemplateId) ? (saved as TemplateId) : undefined;
  if (stored && stored !== "general") return stored;
  return kindFor(category).template;
}

export function toBusiness(row: Row): Business {
  const category = str(row.category);
  return {
    slug: String(row.slug),
    business: str(row.business) ?? "Business",
    template: pickTemplate(row.template, category),
    kind: kindFor(category).id,
    category,
    area: titleCase(str(row.area) ?? str(row.city)),
    address: str(row.address),
    phone: str(row.phone),
    rating: num(row.rating),
    reviews: num(row.reviews),
    imageUrl: str(row.image_url),
    galleryUrls: arr<string>(row.image_urls),
    mapsUrl: str(row.maps_url),
    lat: num(row.lat),
    lng: num(row.lng),
    headline: str(row.headline),
    about: str(row.about),
    editorialSummary: str(row.editorial_summary),
    offerings: arr(row.offerings),
    openingHours: arr(row.opening_hours),
    openingHoursToday: obj(row.opening_hours_today),
    highlights: arr<string>(row.highlights),
    reviewTags: arr(row.review_tags),
    reviewsDistribution: obj(row.reviews_distribution),
  };
}

/**
 * One business by its link. Wrapped in cache() because the page, its
 * title, its tab icon and its WhatsApp card all ask for the same row:
 * this makes it one database query per visit instead of four.
 */
export const getBusiness = cache(async (slug: string): Promise<Business | null> => {
  if (isSampleMode) return sampleBusinesses.map(fromSample).find((b) => b.slug === slug) ?? null;

  const db = getSupabase();
  if (!db) return null;

  // select("*") on purpose: if a newer column hasn't been added in Supabase
  // yet, the page still works with what exists instead of failing outright.
  const { data, error } = await db.from("businesses").select("*").eq("slug", slug).maybeSingle();
  if (error) {
    console.error(`Supabase: could not load "${slug}":`, error.message);
    return null;
  }
  return data ? toBusiness(data) : null;
});

/** Samples go through the same template choice as real rows. */
function fromSample(b: Omit<Business, "kind">): Business {
  return { ...b, template: pickTemplate(b.template, b.category), kind: kindFor(b.category).id };
}

export type ListResult = { businesses: Business[]; problem?: string };

/** For the internal index page. Only light columns, never the raw archive. */
export async function getAllBusinesses(): Promise<ListResult> {
  if (isSampleMode) return { businesses: sampleBusinesses.map(fromSample), problem: "Showing sample data (USE_SAMPLE_DATA is on)." };

  const db = getSupabase();
  if (!db)
    return {
      businesses: [],
      problem: "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example).",
    };

  const { data, error } = await db
    .from("businesses")
    .select("slug, business, template, category, area, rating, reviews, image_url, created_at")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) return { businesses: [], problem: `Supabase error: ${error.message}` };
  return { businesses: (data ?? []).map(toBusiness) };
}

export async function getAllSlugs(): Promise<string[]> {
  if (isSampleMode) return sampleBusinesses.map((b) => b.slug);
  const db = getSupabase();
  if (!db) return [];
  const { data, error } = await db.from("businesses").select("slug").limit(500);
  if (error || !data) return [];
  return data.map((r) => String(r.slug));
}
