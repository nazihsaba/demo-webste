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
 * General: for everything that isn't food. Salons, garages, clinics, gyms.
 * Clean, bright and practical: a photo band, a contact card that sits over
 * it, and every useful fact one tap away.
 */
export function GeneralTemplate({ b }: { b: Business }) {
  const v = buildView(b);

  const primary =
    "rounded-full bg-[var(--accent)] px-6 py-3 text-center font-medium text-[var(--accent-ink)] transition-colors hover:bg-[#1c3993] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";
  const secondary =
    "rounded-full border border-[var(--line)] bg-[var(--bg-2)] px-6 py-3 text-center font-medium transition-colors hover:border-[var(--accent)]";

  return (
    <div className="t-general font-body min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased">
      <PreviewBanner business={b.business} className="border-b border-[var(--line)] text-[var(--muted)]" />

      {/* Photo band */}
      {v.hero ? (
        <Photo src={v.hero} grade="general" priority sizes="100vw" className="h-[44svh] sm:h-[58svh]" />
      ) : (
        <div className="h-[30svh] bg-[linear-gradient(135deg,#dfe5f6,#f7f7f4)]" />
      )}

      {/* Contact card over the photo */}
      <header className="relative mx-auto -mt-20 max-w-5xl px-4 sm:-mt-28 sm:px-6">
        <div className="reveal rounded-3xl bg-[var(--bg-2)] p-7 shadow-[0_24px_60px_-24px_rgb(20_22_27/0.35)] sm:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              {v.kicker ? <p className="text-sm font-medium text-[var(--accent)]">{v.kicker}</p> : null}
              <h1 className="font-display mt-2 text-[clamp(2.5rem,6vw,4.25rem)] leading-[1] font-bold tracking-tight text-balance">
                {v.name.primary}
                {v.name.secondary ? (
                <span dir="rtl" lang="ar" className="mt-3 block leading-tight text-[0.5em] font-medium text-[var(--muted)]">{v.name.secondary}</span>
              ) : null}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
                {v.rating !== undefined ? (
                  <span className="inline-flex items-center gap-2">
                    <Stars rating={v.rating} className="text-[#f0b429]" />
                    <span className="font-medium text-[var(--ink)]">{v.rating.toFixed(1)}</span>
                    {v.reviews ? <span>({v.reviews} reviews)</span> : null}
                  </span>
                ) : null}
                <OpenStatus week={v.week} />
              </div>
            </div>

            <div className="hidden flex-col gap-3 sm:flex md:min-w-[15rem]">
              {v.cta ? (
                <a href={v.cta.href} target={v.cta.kind === "whatsapp" ? "_blank" : undefined} rel="noopener noreferrer" className={primary}>
                  {v.cta.label}
                </a>
              ) : null}
              {v.directions ? (
                <a href={v.directions} target="_blank" rel="noopener noreferrer" className={secondary}>
                  Get directions
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {/* About */}
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-16 sm:pt-28">
        {v.headline ? <h2 className="font-display mb-5 text-2xl font-bold tracking-tight">{v.headline}</h2> : null}
        <p className="text-[clamp(1.2rem,2.4vw,1.5rem)] leading-[1.6] text-[var(--ink)]/85">{v.about}</p>
        {v.highlights.length ? (
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {v.highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 rounded-2xl bg-[var(--bg-2)] px-4 py-3 text-sm">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--accent)]/10 text-xs text-[var(--accent)]">✓</span>
                {h}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {/* Gallery */}
      {v.gallery.length ? (
        <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6" aria-label="Photos">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {v.gallery.slice(0, 6).map((src) => (
              <Photo key={src} src={src} grade="general" sizes="(min-width: 640px) 33vw, 50vw" className="aspect-square rounded-2xl" />
            ))}
          </div>
        </section>
      ) : null}

      {/* Services */}
      {v.offerings.length ? (
        <section className="mx-auto max-w-3xl px-6 pb-20">
          <h2 className="font-display mb-8 text-3xl font-bold tracking-tight">Services</h2>
          <ul className="divide-y divide-[var(--line)] rounded-3xl bg-[var(--bg-2)] px-6">
            {v.offerings.map((item) => (
              <li key={item.name} className="flex items-baseline justify-between gap-4 py-4">
                <span>
                  <span className="font-medium">{item.name}</span>
                  {item.description ? <span className="mt-0.5 block text-sm text-[var(--muted)]">{item.description}</span> : null}
                </span>
                {item.price ? <span className="shrink-0 font-medium text-[var(--accent)]">{item.price}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Reviews */}
      {v.rating !== undefined && (v.distribution || v.mentions.length) ? (
        <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-[var(--bg-2)] p-8">
              <p className="font-display text-6xl font-bold tracking-tight">{v.rating.toFixed(1)}</p>
              <Stars rating={v.rating} className="mt-2 text-lg text-[#f0b429]" />
              {v.reviews ? <p className="mt-2 text-sm text-[var(--muted)]">{v.reviews} reviews on Google</p> : null}
              {v.distribution ? (
                <div className="mt-6">
                  <RatingBreakdown distribution={v.distribution} barClass="bg-[#f0b429]" trackClass="bg-[var(--ink)]/[0.07]" labelClass="text-[var(--muted)]" />
                </div>
              ) : null}
            </div>
            {v.mentions.length ? (
              <div className="rounded-3xl bg-[var(--bg-2)] p-8">
                <h2 className="font-medium">What clients mention</h2>
                <ul className="mt-5 space-y-3">
                  {v.mentions.map((m) => (
                    <li key={m.title} className="flex items-center justify-between gap-4 text-sm">
                      <span className="capitalize">{m.title}</span>
                      <span className="rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 text-[var(--accent)] tabular-nums">{m.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Visit */}
      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <div className="grid gap-4 md:grid-cols-[1fr_1.3fr]">
          <div className="rounded-3xl bg-[var(--bg-2)] p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight">Opening hours</h2>
            {v.hoursRows.length ? (
              <dl className="mt-6 space-y-2.5 text-sm">
                {v.hoursRows.map((h) => (
                  <div key={h.label} className="flex justify-between gap-6">
                    <dt className="text-[var(--muted)]">{h.label}</dt>
                    <dd className="font-medium">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-6 text-sm text-[var(--muted)]">Call ahead for today&apos;s hours.</p>
            )}
            <div className="mt-8 space-y-1.5 border-t border-[var(--line)] pt-6 text-sm">
              {v.address ? <p>{v.address}</p> : null}
              {v.phone ? (
                <a href={`tel:+${v.phone.full}`} className="block font-medium text-[var(--accent)]">
                  {v.phone.display}
                </a>
              ) : null}
            </div>
          </div>
          {v.coords ? (
            <MapEmbed lat={v.coords.lat} lng={v.coords.lng} title={b.business} look="plain" className="min-h-[20rem] rounded-3xl" />
          ) : null}
        </div>
      </section>

      <footer className="border-t border-[var(--line)] px-6 py-10 text-center text-xs text-[var(--muted)]">
        {v.name.primary}
        {b.area ? `, ${b.area}` : ""}
      </footer>

      <StickyCta cta={v.cta} barClass="border-t border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur" buttonClass="bg-[var(--accent)] text-[var(--accent-ink)]" />
    </div>
  );
}
