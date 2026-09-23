import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Set USE_SAMPLE_DATA=1 to run the site on the built-in samples, no database needed. */
export const isSampleMode =
  process.env.USE_SAMPLE_DATA === "1" || process.env.USE_SAMPLE_DATA === "true";

let client: SupabaseClient | null | undefined;

/**
 * Created on first use, not at import time. If the keys are missing the site
 * still builds and the index page explains what is wrong, instead of the
 * whole deployment crashing.
 */
export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn(
      "Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
    client = null;
    return client;
  }

  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}
