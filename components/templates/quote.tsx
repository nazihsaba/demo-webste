import { MapEmbed } from "@/components/site/map-embed";
import { OpenStatus } from "@/components/site/open-status";
import { Photo } from "@/components/site/photo";
import { PreviewBanner } from "@/components/site/preview-banner";
import { RatingBreakdown } from "@/components/site/rating-breakdown";
import { Stars } from "@/components/site/stars";
import { StickyCta } from "@/components/site/sticky-cta";
import { WhatsAppForm } from "@/components/site/whatsapp-form";
import { kindById } from "@/lib/categories";
import { buildView } from "@/lib/view";
import type { Business } from "@/lib/types";

/**
 * Quote: "the job ticket".
 * For garages, home maintenance and electronics repair (vRB sheet, family
 * "Quote marketplaces"). Steel and safety orange, condensed workshop type.
 * The page's main job is the quote form, drawn as a tear-off job ticket
 * next to the name, which sends the answers as one WhatsApp message.
 */
export function QuoteTemplate({ b }: { b: Business }) {
  const v = buildView(b);
  // A business that landed here by hand, with no quote category, borrows
  // the home-maintenance form so it still gets one.
  const k = v.kind.form ? v.kind : kindById("home");
  const form = k.form!;
  const greeting = k.cta.message.replace("{name}", v.name.primary);
  const hasForm = Boolean(v.phone);
  const heroCta = v.cta && v.phone?.isMobile ? { ...v.cta, kind: "call" as const, href: "#request" } : v.cta;

  const button =
    "rounded-lg bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-[var(--accent-ink)] transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";
  const field = {
    label: "text-sm font-medium",
    input:
      "w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-base outline-none placeholder:text-[var(--muted)] focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]/25",
    button: `mt-1 w-full ${button}`,
  };

  return (
    <div className="t-quote font-body min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased">
      <PreviewBanner business={b.business} className="bg-[var(--steel)] text-white/55" />

      {/* Hero: steel band with the job ticket */}
      <header className="bg-[var(--steel)] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-10 pb-14 sm:pt-16 md:grid-cols-[1.15fr_0.85fr] md:items-start md:gap-14 md:pb-20">
          <div className="reveal md:pt-6">
            {v.kicker ? <p className="text-base font-medium text-[#fb8a4c]">{v.kicker}</p> : null}
            <h1 className="font-display mt-2 text-[clamp(3.2rem,9vw,6.5rem)] leading-[0.88] font-bold tracking-[-0.01em] text-balance">
              {v.name.primary}
              {v.name.secondary ? (
                <span dir="rtl" lang="ar" className="mt-3 block text-[0.4em] leading-tight font-medium text-white/60">
                  {v.name.secondary}
                </span>
              ) : null}
            </h1>
            {v.headline ? <p className="mt-5 max-w-lg text-lg leading-snug text-white/70 text-balance">{v.headline}</p> : null}

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/70">
              {v.rating !== undefined ? (
                <span className="inline-flex items-center gap-2">
                  <Stars rating={v.rating} className="text-[#fbbf24]" />
                  <span className="font-semibold text-white">{v.rating.toFixed(1)}</span>
                  {v.reviews ? <span>from {v.reviews} reviews</span> : null}
                </span>
              ) : null}
              <OpenStatus week={v.week} />
            </div>

            {v.hero ? (
              <Photo src={v.hero} grade="quote" priority sizes="(min-width: 768px) 55vw, 100vw" className="mt-10 aspect-[16/10] rounded-lg" />
            ) : null}
          </div>

          {/* The job ticket */}
          {hasForm ? (
            <div id="request" className="reveal-late scroll-mt-6 rounded-xl bg-[var(--bg-2)] text-[var(--ink)] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]">
              <div className="px-6 pt-6 pb-5 sm:px-8 sm:pt-8">
                <h2 className="font-display text-3xl font-bold">{form.title}</h2>
                <p className="mt-1.5 text-sm text-[var(--muted)]">{v.phone!.isMobile ? form.intro : "This number is a landline, so call to ask for a quote."}</p>
              </div>
              <div className="perforation on-steel" aria-hidden="true" />
              <div className="px-6 pt-6 pb-7 sm:px-8 sm:pb-8">
                <WhatsAppForm phone={v.phone!} greeting={greeting} fields={form.fields} submit={form.submit} callLabel={k.cta.call} classes={field} />
              </div>
            </div>
          ) : v.directions ? (
            <a href={v.directions} target="_blank" rel="noopener noreferrer" className={`self-start ${button}`}>
              Get directions
            </a>
          ) : null}
        </div>
      </header>

      {/* What they fix */}
      {v.offerings.length || v.highlights.length ? (
        <section className="mx-auto grid max-w-6xl gap-14 px-6 py-20 sm:py-24 md:grid-cols-2">
          {v.offerings.length ? (
            <div>
              <h2 className="font-display text-4xl font-bold">{v.kind.services}</h2>
              <ul className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {v.offerings.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-4 py-4">
                    <span className="flex gap-3">
                      <span className="mt-2 size-2 shrink-0 bg-[var(--accent)]" />
                      <span>
                        <span className="font-semibold">{item.name}</span>
                        {item.description ? <span className="mt-0.5 block text-sm text-[var(--muted)]">{item.description}</span> : null}
                      </span>
                    </span>
                    {item.price ? <span className="shrink-0 font-semibold tabular-nums">{item.price}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className={v.offerings.length ? "" : "md:col-span-2 md:max-w-3xl"}>
            <h2 className="font-display text-4xl font-bold">About the shop</h2>
            <p className="mt-6 text-lg leading-relaxed">{v.about}</p>
            {v.highlights.length ? (
              <ul className="mt-8 flex flex-wrap gap-2">
                {v.highlights.map((h) => (
                  <li key={h} className="rounded-md border border-[var(--line)] bg-[var(--bg-2)] px-3 py-1.5 text-sm font-medium">
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <p className="text-xl leading-relaxed">{v.about}</p>
        </section>
      )}

      {/* Workshop photos */}
      {v.gallery.length ? (
        <section className="mx-auto max-w-6xl px-6 pb-20" aria-label="Photos">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {v.gallery.slice(0, 4).map((src, i) => (
              <Photo
                key={src}
                src={src}
                grade="quote"
                sizes={i === 0 ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 25vw, 50vw"}
                className={`rounded-lg ${i === 0 ? "col-span-2 aspect-[16/10] sm:row-span-2 sm:aspect-auto" : "aspect-square"}`}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* Reviews */}
      {v.rating !== undefined && (v.distribution || v.mentions.length) ? (
        <section className="border-y border-[var(--line)] bg-[var(--bg-2)] px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2">
            <div>
              <p className="font-display text-7xl font-bold">{v.rating.toFixed(1)}</p>
              <Stars rating={v.rating} className="mt-1 text-lg text-[#f59e0b]" />
              {v.reviews ? <p className="mt-2 text-[var(--muted)]">{v.reviews} reviews on Google</p> : null}
              {v.distribution ? (
                <div className="mt-6 max-w-sm">
                  <RatingBreakdown distribution={v.distribution} barClass="bg-[var(--accent)]" trackClass="bg-[var(--ink)]/[0.08]" labelClass="text-[var(--muted)]" />
                </div>
              ) : null}
            </div>
            {v.mentions.length ? (
              <div>
                <h2 className="font-display text-3xl font-bold">{v.kind.mentions}</h2>
                <ul className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                  {v.mentions.map((m) => (
                    <li key={m.title} className="flex items-center justify-between gap-4 py-3">
                      <span className="capitalize">{m.title}</span>
                      <span className="font-semibold text-[var(--accent)] tabular-nums">{m.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Hours and location */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="font-display text-4xl font-bold">Hours and location</h2>
            {v.hoursRows.length ? (
              <dl className="mt-8 space-y-2.5">
                {v.hoursRows.map((h) => (
                  <div key={h.label} className="flex justify-between gap-6 border-b border-[var(--line)] pb-2.5">
                    <dt className="text-[var(--muted)]">{h.label}</dt>
                    <dd className="font-semibold">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-8 text-[var(--muted)]">Call ahead to check today&apos;s hours.</p>
            )}
            <div className="mt-8 space-y-1.5">
              {v.address ? <p className="text-[var(--muted)]">{v.address}</p> : null}
              {v.phone ? (
                <a href={`tel:+${v.phone.full}`} className="block text-lg font-semibold text-[var(--accent)]">
                  {v.phone.display}
                </a>
              ) : null}
              {v.directions ? (
                <a href={v.directions} target="_blank" rel="noopener noreferrer" className="inline-block pt-2 font-semibold underline underline-offset-4">
                  Get directions
                </a>
              ) : null}
            </div>
          </div>
          {v.coords ? <MapEmbed lat={v.coords.lat} lng={v.coords.lng} title={b.business} look="plain" className="min-h-[20rem] rounded-lg" /> : null}
        </div>
      </section>

      <footer className="bg-[var(--steel)] px-6 py-10 text-center text-xs text-white/50">
        {v.name.primary}
        {b.area ? `, ${b.area}` : ""}
      </footer>

      <StickyCta cta={heroCta} barClass="border-t border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur" buttonClass="bg-[var(--accent)] text-[var(--accent-ink)]" />
    </div>
  );
}
