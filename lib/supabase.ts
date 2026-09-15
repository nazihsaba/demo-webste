import { createClient } from "@supabase/supabase-js";

/**
 * Read-only Supabase client.
 * The anon key is safe in the browser because Row Level Security on the
 * businesses table allows select and nothing else.
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
