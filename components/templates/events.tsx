import { MapEmbed } from "@/components/site/map-embed";
import { Mosaic } from "@/components/site/mosaic";
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
 * Events: "the invitation".
 * For wedding and event vendors (vRB sheet, family "Event vendors").
 * The name sits in a double-ruled card like a printed invitation, the
 * portfolio comes straight after, and the page ends on one question that
 * matters most to a couple: is our date free?
 */
export function EventsTemplate({ b }: { b: Business }) {
  const v = buildView(b);
  const k = v.kind.form ? v.kind : kindById("events");
  const form = k.form!;
  const greeting = k.cta.message.replace("{name}", v.name.primary);
  // Landlines can't take WhatsApp, so they get a call button instead of the form.
  const hasForm = Boolean(v.phone?.isMobile);
  const heroCta = v.cta && hasForm ? { ...v.cta, kind: "call" as const, href: "#request" } : v.cta;

  const primary =
    "inline-block rounded-full bg-[var(--accent)] px-8 py-3.5 text-center font-medium tracking-wide text-[var(--accent-ink)] transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";
  const field = {
    label: "text-sm text-[var(--muted)]",
    input:
      "w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-2.5 text-lg outline-none placeholder:text-[var(--muted)]/70 focus-visible:border-[var(--accent)]",
    button: `mt-4 w-full ${primary}`,
  };

  return (
    <div className="t-events font-body min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased">
      <PreviewBanner business={b.business} className="border-b border-[var(--line)] text-[var(--muted)]" />

      {/* Hero: photo, then the invitation card over it */}
      <header>
        {v.hero ? <Photo src={v.hero} grade="events" priority sizes="100vw" className="h-[52svh] sm:h-[68svh]" /> : null}
        <div className={`mx-auto max-w-3xl px-4 sm:px-6 ${v.hero ? "-mt-28 sm:-mt-40" : "pt-14 sm:pt-20"}`}>
          <div className="invite-frame reveal relative bg-[var(--bg-2)] px-8 py-14 text-center sm:px-16 sm:py-20">
            {v.kicker ? <p className="text-sm tracking-wide text-[var(--accent)]">{v.kicker}</p> : null}
            <h1 className="font-display mt-4 text-[clamp(3rem,8.5vw,5.75rem)] leading-[0.95] font-medium text-balance">
              {v.name.primary}
              {v.name.secondary ? (
                <span dir="rtl" lang="ar" className="mt-3 block text-[0.42em] leading-tight font-normal text-[var(--muted)]">
                  {v.name.secondary}
                </span>
              ) : null}
            </h1>
            {v.headline ? <p className="font-display mx-auto mt-5 max-w-md text-2xl leading-snug text-[var(--muted)] italic text-balance">{v.headline}</p> : null}
            {v.rating !== undefined ? (
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
                <Stars rating={v.rating} className="text-[var(--accent)]" />
                {v.rating.toFixed(1)}
                {v.reviews ? ` from ${v.reviews} reviews` : ""}
              </p>
            ) : null}
            {heroCta ? (
              <div className="mt-9">
                <a href={heroCta.href} target={heroCta.kind === "whatsapp" ? "_blank" : undefined} rel="noopener noreferrer" className={primary}>
                  {heroCta.label}
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {/* Portfolio */}
      {v.gallery.length ? (
        <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-28" aria-labelledby="portfolio">
          <h2 id="portfolio" className="font-display mb-8 text-center text-4xl font-medium">
            Portfolio
          </h2>
          <Mosaic photos={v.gallery} grade="events" />
        </section>
      ) : null}

      {/* About */}
      <section className="mx-auto max-w-2xl px-6 py-20 text-center sm:py-28">
        <p className="text-[clamp(1.2rem,2.3vw,1.45rem)] leading-[1.7]">{v.about}</p>
        {v.highlights.length ? (
          <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
            {v.highlights.map((h) => (
              <li key={h} className="rounded-full border border-[var(--line)] px-4 py-1.5 text-sm">
                {h}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {/* Packages */}
      {v.offerings.length ? (
        <section className="mx-auto max-w-5xl px-6 pb-20 sm:pb-28" aria-labelledby="packages">
          <h2 id="packages" className="font-display mb-10 text-center text-4xl font-medium">
            {v.kind.services}
          </h2>
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {v.offerings.map((item) => (
              <li key={item.name} className="border-t border-[var(--accent)]/40 pt-5">
                <p className="font-display text-2xl font-medium">{item.name}</p>
                {item.description ? <p className="mt-2 leading-relaxed text-[var(--muted)]">{item.description}</p> : null}
                {item.price ? <p className="mt-3 font-medium text-[var(--accent)]">{item.price}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Is our date free? */}
      {hasForm ? (
        <section id="request" className="scroll-mt-4 bg-[var(--bg-2)] px-6 py-20 sm:py-28">
          <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="font-display text-5xl leading-[1] font-medium">{form.title}</h2>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">
                {form.intro}
              </p>
            </div>
            <WhatsAppForm phone={v.phone!} greeting={greeting} fields={form.fields} submit={form.submit} callLabel={k.cta.call} classes={field} />
          </div>
        </section>
      ) : null}

      {/* Reviews */}
      {v.rating !== undefined && (v.distribution || v.mentions.length) ? (
        <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
          <p className="font-display text-8xl leading-none font-medium">{v.rating.toFixed(1)}</p>
          <Stars rating={v.rating} className="mt-3 text-lg text-[var(--accent)]" />
          {v.reviews ? <p className="mt-2 text-[var(--muted)]">{v.reviews} reviews on Google</p> : null}
          {v.distribution ? (
            <div className="mx-auto mt-8 max-w-xs text-left">
              <RatingBreakdown distribution={v.distribution} barClass="bg-[var(--accent)]" trackClass="bg-[var(--ink)]/[0.08]" labelClass="text-[var(--muted)]" />
            </div>
          ) : null}
          {v.mentions.length ? (
            <div className="mt-14">
              <h2 className="font-display text-2xl font-medium">{v.kind.mentions}</h2>
              <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
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

      {/* Visit */}
      <section className="border-t border-[var(--line)] px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="font-display text-4xl font-medium">Where to find us</h2>
            {v.address ? <p className="mt-5 leading-relaxed text-[var(--muted)]">{v.address}</p> : null}
            {v.phone ? (
              <a href={`tel:+${v.phone.full}`} className="mt-2 block font-medium hover:text-[var(--accent)]">
                {v.phone.display}
              </a>
            ) : null}
            {v.hoursRows.length ? (
              <dl className="mt-8 space-y-2.5">
                {v.hoursRows.map((h) => (
                  <div key={h.label} className="flex justify-between gap-6">
                    <dt className="text-[var(--muted)]">{h.label}</dt>
                    <dd>{h.hours}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {v.directions ? (
              <a href={v.directions} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block border-b border-[var(--accent)] pb-0.5 text-[var(--accent)]">
                Get directions
              </a>
            ) : null}
          </div>
          {v.coords ? <MapEmbed lat={v.coords.lat} lng={v.coords.lng} title={b.business} look="warm" className="aspect-[4/3]" /> : null}
        </div>
      </section>

      <footer className="px-6 py-10 text-center text-xs text-[var(--muted)]">
        {v.name.primary}
        {b.area ? `, ${b.area}` : ""}
      </footer>

      <StickyCta cta={heroCta} barClass="border-t border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur" buttonClass="bg-[var(--accent)] text-[var(--accent-ink)]" />
    </div>
  );
}
