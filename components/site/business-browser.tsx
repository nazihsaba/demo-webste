"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Business, TemplateId } from "@/lib/types";

const TYPES: { id: TemplateId; label: string }[] = [
  { id: "restaurant", label: "Restaurants" },
  { id: "coffee-shop", label: "Coffee shops" },
  { id: "general", label: "Everything else" },
];

/**
 * The internal browser: businesses grouped by type, with filters for type
 * and area, plus a search box. Runs in the browser so filtering is instant
 * and costs no database queries.
 */
export function BusinessBrowser({ businesses }: { businesses: Business[] }) {
  const [type, setType] = useState<TemplateId | "all">("all");
  const [area, setArea] = useState("all");
  const [query, setQuery] = useState("");

  const areas = useMemo(
    () => Array.from(new Set(businesses.map((b) => b.area).filter(Boolean) as string[])).sort(),
    [businesses],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: businesses.length };
    for (const b of businesses) c[b.template] = (c[b.template] ?? 0) + 1;
    return c;
  }, [businesses]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return businesses.filter(
      (b) =>
        (type === "all" || b.template === type) &&
        (area === "all" || b.area === area) &&
        (!q || `${b.business} ${b.category ?? ""} ${b.area ?? ""}`.toLowerCase().includes(q)),
    );
  }, [businesses, type, area, query]);

  // Grouped when showing everything; one flat list when a type is picked.
  const groups =
    type === "all"
      ? TYPES.map((t) => ({ ...t, items: visible.filter((b) => b.template === t.id) })).filter((g) => g.items.length)
      : [{ id: type, label: TYPES.find((t) => t.id === type)!.label, items: visible }];

  const chip = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm transition-colors ${
      active ? "bg-[var(--accent)] text-[var(--accent-ink)]" : "bg-[var(--bg-2)] text-[var(--muted)] hover:text-[var(--ink)]"
    }`;

  return (
    <div>
      {/* Filters */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => setType("all")} className={chip(type === "all")}>
          All <span className="tabular-nums opacity-60">{counts.all ?? 0}</span>
        </button>
        {TYPES.map((t) => (
          <button key={t.id} type="button" onClick={() => setType(t.id)} className={chip(type === t.id)} disabled={!counts[t.id]}>
            {t.label} <span className="tabular-nums opacity-60">{counts[t.id] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or category"
          className="min-w-0 flex-1 rounded-full border border-[var(--line)] bg-[var(--bg-2)] px-5 py-2.5 text-sm outline-none placeholder:text-[var(--muted)] focus-visible:border-[var(--accent)]"
        />
        {areas.length > 1 ? (
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="rounded-full border border-[var(--line)] bg-[var(--bg-2)] px-5 py-2.5 text-sm outline-none focus-visible:border-[var(--accent)]"
          >
            <option value="all">All areas</option>
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        ) : null}
      </div>

      {/* Results */}
      {visible.length === 0 ? (
        <p className="mt-12 text-[var(--muted)]">Nothing matches those filters.</p>
      ) : null}

      {groups.map((group) => (
        <section key={group.id} className="mt-12">
          <h2 className="mb-4 flex items-baseline gap-3 text-sm font-medium tracking-wide text-[var(--muted)] uppercase">
            {group.label}
            <span className="tabular-nums">{group.items.length}</span>
          </h2>

          <ul className="grid gap-3">
            {group.items.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/${b.slug}`}
                  className="flex items-center gap-4 rounded-2xl bg-[var(--bg-2)] p-3 pr-5 transition-shadow hover:shadow-[0_8px_30px_-12px_rgb(20_22_27/0.3)]"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[var(--bg)]">
                    {b.imageUrl ? <Image src={b.imageUrl} alt="" fill sizes="64px" className="object-cover" /> : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p dir="auto" className="truncate font-medium">
                      {b.business}
                    </p>
                    <p className="truncate text-sm text-[var(--muted)]">
                      {[b.category, b.area].filter(Boolean).join(", ")}
                    </p>
                  </div>
                  {typeof b.rating === "number" ? (
                    <span className="shrink-0 text-sm tabular-nums text-[var(--muted)]">
                      ★ {b.rating.toFixed(1)}
                      {b.reviews ? <span className="ml-1 opacity-70">({b.reviews})</span> : null}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
