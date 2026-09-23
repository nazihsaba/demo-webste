import { MapEmbed } from "@/components/site/map-embed";
import { OpenStatus } from "@/components/site/open-status";
import { Photo } from "@/components/site/photo";
import { PreviewBanner } from "@/components/site/preview-banner";
import { RatingBreakdown } from "@/components/site/rating-breakdown";
import { Stars } from "@/components/site/stars";
import { StickyCta } from "@/components/site/sticky-cta";
import { buildView } from "@/lib/view";
import type { Business } from "@/lib/types";

/**
 * Coffee shop: "morning light".
 * Paper ground, espresso ink, one flat teal block. Photos run as a strip
 * you swipe through, like someone's camera roll from a good afternoon.
 */
export function CoffeeShopTemplate({ b }: { b: Business }) {
  const v = buildView(b);
  const strip = v.gallery.length ? v.gallery : [];

  return (
    <div className="t-coffee font-body min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased">
      <PreviewBanner business={b.business} className="border-b border-[var(--line)] bg-black/[0.03] text-[var(--muted)]" />

      {/* Hero */}
      <header className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-12 pb-16 sm:pt-20 md:grid-cols-[1.05fr_1fr] md:gap-16">
        <div className="reveal">
          {v.kicker ? <p className="text-sm font-medium text-[var(--accent)]">{v.kicker}</p> : null}
          <h1 className="font-display mt-3 text-[clamp(3.2rem,8.5vw,6rem)] leading-[0.92] font-bold tracking-tight text-balance">
            {v.name.primary}
            {v.name.secondary ? (
                <span dir="rtl" lang="ar" className="mt-3 block leading-tight text-[0.45em] font-medium text-[var(--muted)]">{v.name.secondary}</span>
              ) : null}
          </h1>
          {v.headline ? <p className="mt-6 max-w-md text-xl leading-snug text-[var(--muted)] text-balance">{v.headline}</p> : null}

          <OpenStatus week={v.week} className="mt-7 text-sm font-medium" />

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {v.cta ? (
              <a
                href={v.cta.href}
                target={v.cta.kind === "whatsapp" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--accent)] px-7 py-3.5 font-medium text-[var(--accent-ink)] transition-colors hover:bg-[#0b5748] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                {v.cta.label}
              </a>
            ) : null}
            {v.directions ? (
              <a
                href={v.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b-2 border-[var(--accent)]/30 pb-0.5 font-medium text-[var(--accent)] transition-colors hover:border-[var(--accent)]"
              >
                Get directions
              </a>
            ) : null}
          </div>
        </div>

        <div className="reveal-late relative">
          {v.hero ? (
            <Photo src={v.hero} grade="coffee" priority sizes="(min-width: 768px) 45vw, 100vw" className="aspect-[4/5] rounded-[2rem]" />
          ) : (
            <div className="aspect-[4/5] rounded-[2rem] bg-[var(--bg-2)]" />
          )}
          {v.rating !== undefined ? (
            <div className="absolute -bottom-5 -left-3 rounded-2xl bg-[var(--ink)] px-5 py-3.5 text-[var(--bg)] shadow-xl sm:-left-6">
              <p className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{v.rating.toFixed(1)}</span>
                <Stars rating={v.rating} className="text-sm text-[#f0c35a]" />
              </p>
              {v.reviews ? <p className="mt-0.5 text-xs opacity-70">{v.reviews} Google reviews</p> : null}
            </div>
          ) : null}
        </div>
      </header>

      {/* Photo strip */}
      {strip.length ? (
        <section aria-label="Photos" className="pt-6 pb-20">
          <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 px-6 sm:gap-4">
            {strip.map((src, i) => (
              <Photo
                key={src}
                src={src}
                grade="coffee"
                sizes="(min-width: 640px) 30rem, 80vw"
                className={`h-[64vw] max-h-[24rem] shrink-0 snap-start rounded-2xl ${i % 3 === 1 ? "aspect-[4/5]" : "aspect-[4/3]"}`}
              />
            ))}
            <div className="w-3 shrink-0" aria-hidden="true" />
          </div>
        </section>
      ) : null}

      {/* The one flat colour block */}
      <section className="bg-[var(--accent)] px-6 py-20 text-[var(--accent-ink)] sm:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-[clamp(1.4rem,3vw,2rem)] leading-[1.45] font-light text-balance">{v.about}</p>
          {v.highlights.length ? (
            <ul className="mt-10 flex flex-wrap gap-2.5">
              {v.highlights.map((h) => (
                <li key={h} className="rounded-full border border-white/30 px-4 py-1.5 text-sm">
                  {h}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {/* Reputation */}
      {v.rating !== undefined && (v.distribution || v.mentions.length) ? (
        <section className="mx-auto grid max-w-5xl gap-14 px-6 py-20 sm:py-28 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Loved by regulars</h2>
            <p className="mt-2 text-[var(--muted)]">
              {v.rating.toFixed(1)} out of 5{v.reviews ? `, from ${v.reviews} reviews on Google` : ""}
            </p>
            {v.distribution ? (
              <div className="mt-8 max-w-sm">
                <RatingBreakdown
                  distribution={v.distribution}
                  barClass="bg-[var(--accent)]"
                  trackClass="bg-[var(--ink)]/10"
                  labelClass="text-[var(--muted)]"
                />
              </div>
            ) : null}
          </div>
          {v.mentions.length ? (
            <div>
              <h3 className="mb-5 font-medium text-[var(--accent)]">What people mention most</h3>
              <ul className="flex flex-wrap gap-2.5">
                {v.mentions.map((m) => (
                  <li key={m.title} className="rounded-full bg-[var(--bg-2)] px-4 py-2 text-sm">
                    <span className="capitalize">{m.title}</span>
                    <span className="ml-2 text-[var(--muted)] tabular-nums">{m.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      {/* Menu */}
      {v.offerings.length ? (
        <section className="border-t border-[var(--line)] px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-10 text-3xl font-bold tracking-tight">On the menu</h2>
            <ul className="grid gap-x-12 gap-y-5 sm:grid-cols-2">
              {v.offerings.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] pb-4">
                  <span>
                    <span className="font-medium">{item.name}</span>
                    {item.description ? <span className="mt-0.5 block text-sm text-[var(--muted)]">{item.description}</span> : null}
                  </span>
                  {item.price ? <span className="shrink-0 font-medium text-[var(--accent)]">{item.price}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Visit */}
      <section className="border-t border-[var(--line)] px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Come by</h2>
            {v.address ? <p className="mt-5 leading-relaxed text-[var(--muted)]">{v.address}</p> : null}
            {v.phone ? (
              <a href={`tel:+${v.phone.full}`} className="mt-2 block font-medium hover:text-[var(--accent)]">
                {v.phone.display}
              </a>
            ) : null}

            {v.hoursRows.length ? (
              <dl className="mt-10 space-y-2.5">
                {v.hoursRows.map((h) => (
                  <div key={h.label} className="flex justify-between gap-6">
                    <dt className="text-[var(--muted)]">{h.label}</dt>
                    <dd className="font-medium">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          {v.coords ? (
            <MapEmbed lat={v.coords.lat} lng={v.coords.lng} title={b.business} look="warm" className="aspect-[4/3] rounded-3xl" />
          ) : null}
        </div>
      </section>

      <footer className="px-6 py-10 text-center text-xs text-[var(--muted)]">
        {v.name.primary}
        {b.area ? `, ${b.area}` : ""}
      </footer>

      <StickyCta cta={v.cta} barClass="border-t border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur" buttonClass="bg-[var(--accent)] text-[var(--accent-ink)]" />
    </div>
  );
}
