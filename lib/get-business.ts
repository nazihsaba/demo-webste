import { supabase } from "./supabase";
import type { Business } from "./types";

/** The columns the pages actually use. Never `select *`. */
const COLUMNS =
  "slug, business, template, category, area, address, phone, rating, reviews, image_url, maps_url, headline, about, offerings, opening_hours";

/** Supabase uses snake_case, the templates use camelCase. Translate here, once. */
type Row = {
  slug: string;
  business: string;
  template: string;
  category: string | null;
  area: string | null;
  address: string | null;
  phone: string | null;
  rating: number | null;
  reviews: number | null;
  image_url: string | null;
  maps_url: string | null;
  headline: string | null;
  about: string | null;
  offerings: Business["offerings"] | null;
  opening_hours: Business["openingHours"] | null;
};

function toBusiness(row: Row): Business {
  return {
    slug: row.slug,
    business: row.business,
    template: row.template === "coffee-shop" ? "coffee-shop" : "restaurant",
    category: row.category ?? undefined,
    area: row.area ?? undefined,
    address: row.address ?? undefined,
    phone: row.phone ?? undefined,
    rating: row.rating ?? undefined,
    reviews: row.reviews ?? undefined,
    imageUrl: row.image_url ?? undefined,
    mapsUrl: row.maps_url ?? undefined,
    headline: row.headline ?? undefined,
    about: row.about ?? undefined,
    offerings: row.offerings ?? undefined,
    openingHours: row.opening_hours ?? undefined,
  };
}

export async function getBusiness(slug: string): Promise<Business | null> {
  const { data, error } = await supabase
    .from("businesses")
    .select(COLUMNS)
    .eq("slug", slug)
    .maybeSingle<Row>();

  if (error) {
    console.error("Supabase getBusiness failed:", error.message);
    return null;
  }
  return data ? toBusiness(data) : null;
}

/** Used by generateStaticParams and by the internal index page. */
export async function getAllBusinesses(): Promise<Business[]> {
  const { data, error } = await supabase
    .from("businesses")
    .select(COLUMNS)
    .order("created_at", { ascending: false })
    .limit(1000);

  if (error) {
    console.error("Supabase getAllBusinesses failed:", error.message);
    return [];
  }
  return (data as Row[]).map(toBusiness);
}

export async function getAllSlugs(): Promise<string[]> {
  const { data, error } = await supabase.from("businesses").select("slug");
  if (error) return [];
  return data.map((r) => r.slug as string);
}
