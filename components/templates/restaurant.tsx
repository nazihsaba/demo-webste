import { MapEmbed } from "@/components/site/map-embed";
import { Mosaic } from "@/components/site/mosaic";
import { OpenStatus } from "@/components/site/open-status";
import { Photo } from "@/components/site/photo";
import { PreviewBanner } from "@/components/site/preview-banner";
import { RatingBreakdown } from "@/components/site/rating-breakdown";
import { Stars } from "@/components/site/stars";
import { StickyCta } from "@/components/site/sticky-cta";
import { buildView } from "@/lib/view";
import type { Business } from "@/lib/types";

/**
 * Restaurant: "the room at night".
 * Dark green-black, brass rules, serif display, a printed-menu feel.
 * The photos carry the page; the type stays quiet around them.
 */
export function RestaurantTemplate({ b }: { b: Business }) {
  const v = buildView(b);

  return (
    <div className="t-restaurant font-body min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased">
      <PreviewBanner business={b.business} className="border-b border-white/10 bg-black/50 text-white/55" />

      {/* Hero */}
      <header className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden">
        {v.hero ? (
          <Photo src={v.hero} grade="restaurant" sizes="100vw" priority className="absolute inset-0 -z-20" />
        ) : (
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_120%,#26382d,#111814)]" />
        )}
        <div className="fade-restaurant absolute inset-0 -z-10" />

        <div className="mx-auto w-full max-w-6xl px-6 pb-14 sm:pb-20">
          {v.kicker ? <p className="reveal text-sm tracking-wide text-[var(--accent)]">{v.kicker}</p> : null}
          <h1
            className="reveal font-display mt-4 max-w-4xl text-[clamp(3rem,9vw,7rem)] leading-[0.95] font-light text-balance"
          >
            {v.name.primary}
            {v.name.secondary ? (
                <span dir="rtl" lang="ar" className="mt-3 block leading-tight text-[0.42em] font-normal text-[var(--muted)]">{v.name.secondary}</span>
              ) : null}
          </h1>

          <div className="reveal-late mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-[var(--muted)]">
            {v.rating !== undefined ? (
              <span className="inline-flex items-center gap-2.5">
                <Stars rating={v.rating} className="text-[var(--accent)]" />
                <span>
                  {v.rating.toFixed(1)}
                  {v.reviews ? ` from ${v.reviews} reviews` : ""}
                </span>
              </span>
            ) : null}
            <OpenStatus week={v.week} />
          </div>

          <div className="reveal-late mt-9 hidden flex-wrap gap-3 sm:flex">
            {v.cta ? (
              <a
                href={v.cta.href}
                target={v.cta.kind === "whatsapp" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--accent)] px-7 py-3.5 font-medium text-[var(--accent-ink)] transition-colors hover:bg-[#dbb53c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                {v.cta.label}
              </a>
            ) : null}
            {v.directions ? (
              <a
                href={v.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--line)] px-7 py-3.5 text-[var(--ink)] transition-colors hover:border-[var(--accent)]"
              >
                Get directions
              </a>
            ) : null}
          </div>
        </div>
      </header>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <div className="mx-auto mb-10 h-px w-20 bg-[var(--accent)]/50" />
        {v.headline ? <p className="mb-6 text-sm tracking-wide text-[var(--accent)]">{v.headline}</p> : null}
        <p className="font-display text-[clamp(1.45rem,3vw,2.1rem)] leading-[1.45] font-light text-balance">{v.about}</p>
        {v.highlights.length ? (
          <ul className="mt-12 flex flex-wrap justify-center gap-2.5">
            {v.highlights.map((h) => (
              <li key={h} className="rounded-full border border-[var(--line)] px-4 py-1.5 text-sm text-[var(--muted)]">
                {h}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {/* Gallery */}
      {v.gallery.length ? (
        <section className="mx-auto max-w-6xl px-3 pb-24 sm:px-6 sm:pb-32" aria-label="Photos">
          <Mosaic photos={v.gallery} grade="restaurant" />
        </section>
      ) : null}

      {/* Reputation */}
      {v.rating !== undefined ? (
        <section className="border-y border-[var(--line)] bg-[var(--bg-2)]">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-[auto_1fr_1fr] md:items-center md:gap-16">
            <div>
              <p className="font-display text-[5.5rem] leading-none font-light">{v.rating.toFixed(1)}</p>
              <Stars rating={v.rating} className="mt-3 text-lg text-[var(--accent)]" />
              {v.reviews ? <p className="mt-3 text-sm text-[var(--muted)]">from {v.reviews} Google reviews</p> : null}
            </div>
            {v.distribution ? (
              <RatingBreakdown
                distribution={v.distribution}
                barClass="bg-[var(--accent)]"
                trackClass="bg-white/10"
                labelClass="text-[var(--muted)]"
              />
            ) : (
              <div className="hidden md:block" />
            )}
            {v.mentions.length ? (
              <div>
                <h2 className="mb-5 text-sm text-[var(--accent)]">What guests talk about</h2>
                <ul className="space-y-3">
                  {v.mentions.slice(0, 5).map((m) => (
                    <li key={m.title} className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] pb-3">
                      <span className="font-display text-xl capitalize">{m.title}</span>
                      <span className="text-sm text-[var(--muted)] tabular-nums">{m.count} mentions</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Menu */}
      {v.offerings.length ? (
        <section className="px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display mb-14 text-center text-4xl font-light">From the kitchen</h2>
            <ul className="space-y-9">
              {v.offerings.map((item) => (
                <li key={item.name}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-xl">{item.name}</span>
                    <span className="h-px min-w-6 flex-1 bg-[var(--line)]" />
                    {item.price ? <span className="text-[var(--accent)]">{item.price}</span> : null}
                  </div>
                  {item.description ? <p className="mt-1.5 text-sm text-[var(--muted)]">{item.description}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Visit */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:py-32 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-display text-4xl font-light">Come and find us</h2>

          {v.hoursRows.length ? (
            <dl className="mt-10 space-y-3 text-sm">
              {v.hoursRows.map((h) => (
                <div key={h.label} className="flex justify-between gap-6 border-b border-[var(--line)] pb-3">
                  <dt className="text-[var(--muted)]">{h.label}</dt>
                  <dd>{h.hours}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-10 space-y-2 text-sm">
            {v.address ? <p className="text-[var(--ink)]/85">{v.address}</p> : null}
            {v.phone ? (
              <a href={`tel:+${v.phone.full}`} className="block text-[var(--muted)] hover:text-[var(--ink)]">
                {v.phone.display}
              </a>
            ) : null}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {v.cta ? (
              <a
                href={v.cta.href}
                target={v.cta.kind === "whatsapp" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-ink)] hover:bg-[#dbb53c]"
              >
                {v.cta.label}
              </a>
            ) : null}
            {v.directions ? (
              <a
                href={v.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--line)] px-6 py-3 text-sm hover:border-[var(--accent)]"
              >
                Get directions
              </a>
            ) : null}
          </div>
        </div>

        {v.coords ? (
          <MapEmbed
            lat={v.coords.lat}
            lng={v.coords.lng}
            title={b.business}
            look="dark"
            className="aspect-[4/3] rounded-sm border border-[var(--line)] md:aspect-auto md:min-h-[26rem]"
          />
        ) : null}
      </section>

      <footer className="border-t border-[var(--line)] px-6 py-10 text-center text-xs text-[var(--muted)]">
        {v.name.primary}
        {b.area ? `, ${b.area}` : ""}
      </footer>

      <StickyCta cta={v.cta} barClass="bg-[var(--bg)]/95 backdrop-blur" buttonClass="bg-[var(--accent)] text-[var(--accent-ink)]" />
    </div>
  );
}
