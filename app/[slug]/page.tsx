import { BusinessBrowser } from "@/components/site/business-browser";
import { getAllBusinesses } from "@/lib/get-business";

export const revalidate = 60;

/**
 * Internal list of every preview, grouped by business type.
 * For you and Rayan only: owners get their own link, never this page.
 */
export default async function Home() {
  const { businesses, problem } = await getAllBusinesses();

  return (
    <main className="t-general font-body min-h-screen bg-[var(--bg)] px-6 py-16 text-[var(--ink)] sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-bold tracking-tight">Website previews</h1>
        <p className="mt-3 text-[var(--muted)]">
          {businesses.length} {businesses.length === 1 ? "business" : "businesses"}. Send each owner their own link, never this list.
        </p>

        {problem ? (
          <p className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">{problem}</p>
        ) : null}

        {businesses.length === 0 && !problem ? (
          <p className="mt-10 text-[var(--muted)]">No businesses yet. Run a search in n8n and they will appear here.</p>
        ) : (
          <BusinessBrowser businesses={businesses} />
        )}
      </div>
    </main>
  );
}
