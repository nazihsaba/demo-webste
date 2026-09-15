import Link from "next/link";
import { getAllBusinesses } from "@/lib/get-business";

/**
 * Internal index. Not for business owners — just a way to open each
 * preview while building. Do not link to this from anywhere public.
 */
export const revalidate = 60;

export default async function Home() {
  const businesses = await getAllBusinesses();

  return (
    <main className="mx-auto min-h-screen max-w-2xl bg-[#F2F3EF] px-6 py-20 font-[family-name:var(--font-space)] text-[#221C18]">
      <h1 className="text-3xl font-bold tracking-tight">Website previews</h1>
      <p className="mt-3 text-[#221C18]/60">
        One page per business. Send the link, not this list.
      </p>

      {businesses.length === 0 ? (
        <p className="mt-10 text-[#221C18]/60">
          No businesses yet. Run a search in n8n and they will show up here.
        </p>
      ) : null}

      <ul className="mt-10 divide-y divide-[#221C18]/10 border-y border-[#221C18]/10">
        {businesses.map((b) => (
          <li key={b.slug}>
            <Link
              href={`/${b.slug}`}
              className="flex items-baseline justify-between gap-4 py-4 hover:text-[#0F6E5C]"
            >
              <span className="font-medium">{b.business}</span>
              <span className="text-sm text-[#221C18]/50">{b.template}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
