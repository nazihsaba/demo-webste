import Image from "next/image";
import Link from "next/link";
import { getAllBusinesses } from "@/lib/get-business";

export const revalidate = 60;

const LABEL = { restaurant: "Restaurant", "coffee-shop": "Coffee shop", general: "General" } as const;

/**
 * Internal list of every preview. For you and Rayan, never for business
 * owners: send them their own link, not this page.
 */
export default async function Home() {
  const { businesses, problem } = await getAllBusinesses();

  return (
    <main className="t-general font-body min-h-screen bg-[var(--bg)] px-6 py-16 text-[var(--ink)] sm:py-24">
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
        ) : null}

        <ul className="mt-10 grid gap-3">
          {businesses.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/${b.slug}`}
                className="flex items-center gap-4 rounded-2xl bg-[var(--bg-2)] p-3 pr-5 transition-shadow hover:shadow-[0_8px_30px_-12px_rgb(20_22_27/0.3)]"
              >
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[var(--bg)]">
                  {b.imageUrl ? <Image src={b.imageUrl} alt="" fill sizes="64px" className="object-cover" /> : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p dir="auto" className="truncate font-medium">{b.business}</p>
                  <p className="truncate text-sm text-[var(--muted)]">
                    {[b.category, b.area].filter(Boolean).join(", ")}
                    {typeof b.rating === "number" ? `  ★ ${b.rating.toFixed(1)}` : ""}
                  </p>
                </div>
                <span className="hidden rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs text-[var(--accent)] sm:inline">
                  {LABEL[b.template]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
