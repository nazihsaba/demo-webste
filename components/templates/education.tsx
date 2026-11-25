import { MapEmbed } from "@/components/site/map-embed";
import { OpenStatus } from "@/components/site/open-status";
import { Photo } from "@/components/site/photo";
import { PreviewBanner } from "@/components/site/preview-banner";
import { RatingBreakdown } from "@/components/site/rating-breakdown";
import { Stars } from "@/components/site/stars";
import { StickyCta } from "@/components/site/sticky-cta";
import { WhatsAppForm } from "@/components/site/whatsapp-form";
import { kindById } from "@/lib/categories";
import { buildView, gridPhotos } from "@/lib/view";
import type { Business } from "@/lib/types";

/**
 * Education: "the exercise book".
 * For tutors, language schools and course centres (vRB sheet, family
 * "Education"). Squared paper behind the name, subjects laid out as index
 * cards, and a short "who is it for / online or in person" question that
 * parents can answer in ten seconds.
 */
export function EducationTemplate({ b }: { b: Business }) {
  const v = buildView(b);
  const k = v.kind.form ? v.kind : kindById("education");
  const form = k.form!;
  const greeting = k.cta.message.replace("{name}", v.name.primary);
  // Landlines can't take WhatsApp, so they get a call button instead of the form.
  const hasForm = Boolean(v.phone?.isMobile);
  const heroCta = v.cta && hasForm ? { ...v.cta, kind: "call" as const, href: "#request" } : v.cta;

  const primary =
    "inline-block rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-bold text-[var(--accent-ink)] transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";
  const field = {
    label: "text-sm font-bold",
    input:
      "w-full rounded-xl border-2 border-[var(--line)] bg-[var(--bg-2)] px-4 py-3 text-base outline-none placeholder:text-[var(--muted)] focus-visible:border-[var(--accent)]",
    button: `mt-1 w-full ${primary}`,
  };

  return (
    <div className="t-edu font-body min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased">
      <PreviewBanner business={b.business} className="border-b border-[var(--line)] bg-[var(--bg-2)] text-[var(--muted)]" />

      {/* Hero on squared paper */}
      <header className="grid-paper border-b border-[var(--line)]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 sm:py-20 md:grid-cols-[1.15fr_0.85fr]">
          <div className="reveal">
            {v.kicker ? <p className="font-bold text-[var(--accent)]">{v.kicker}</p> : null}
            <h1 className="font-display mt-3 text-[clamp(2.6rem,7vw,4.75rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-balance">
              {v.name.primary}
              {v.name.secondary ? (
                <span dir="rtl" lang="ar" className="mt-3 block text-[0.45em] leading-tight font-normal text-[var(--muted)]">
                  {v.name.secondary}
                </span>
              ) : null}
            </h1>
            {v.headline ? <p className="mt-5 max-w-lg text-xl leading-snug text-[var(--muted)] text-balance">{v.headline}</p> : null}

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[var(--muted)]">
              {v.rating !== undefined ? (
                <span className="inline-flex items-center gap-2">
                  <Stars rating={v.rating} className="text-[#e4a21b]" />
                  <span className="font-bold text-[var(--ink)]">{v.rating.toFixed(1)}</span>
                  {v.reviews ? <span>from {v.reviews} reviews</span> : null}
                </span>
              ) : null}
              <OpenStatus week={v.week} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {heroCta ? (
                <a href={heroCta.href} target={heroCta.kind === "whatsapp" ? "_blank" : undefined} rel="noopener noreferrer" className={primary}>
                  {heroCta.label}
                </a>
              ) : null}
              {v.directions ? (
                <a href={v.directions} target="_blank" rel="noopener noreferrer" className="font-bold text-[var(--accent)] underline decoration-2 underline-offset-4">
                  Get directions
                </a>
              ) : null}
            </div>
          </div>

          {v.hero ? (
            <div className="reveal-late rotate-[1.5deg] rounded-2xl bg-[var(--bg-2)] p-2.5 shadow-[0_20px_50px_-24px_rgb(25_33_46/0.45)]">
              <Photo src={v.hero} grade="edu" priority sizes="(min-width: 768px) 38vw, 90vw" className="aspect-[4/3] rounded-xl" />
            </div>
          ) : null}
        </div>
      </header>

      {/* Subjects as index cards */}
      {v.offerings.length ? (
        <section className="mx-auto max-w-6xl px-6 pt-20 sm:pt-24" aria-labelledby="subjects">
          <h2 id="subjects" className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {v.kind.services}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {v.offerings.map((item) => (
              <li key={item.name} className="rounded-xl border-t-4 border-[var(--accent)] bg-[var(--bg-2)] p-6 shadow-[0_1px_0_var(--line)]">
                <p className="font-display text-xl font-semibold">{item.name}</p>
                {item.description ? <p className="mt-2 leading-relaxed text-[var(--muted)]">{item.description}</p> : null}
                {item.price ? <p className="mt-4 font-bold">{item.price}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* About */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 md:grid-cols-[1.4fr_1fr]">
        <p className="text-[clamp(1.2rem,2.2vw,1.45rem)] leading-[1.65]">{v.about}</p>
        {v.highlights.length ? (
          <ul className="space-y-3 self-center">
            {v.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-[var(--accent)] text-xs font-bold text-[var(--accent-ink)]" aria-hidden="true">
                  ✓
                </span>
                {h}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {/* Ask about classes */}
      {hasForm ? (
        <section id="request" className="grid-paper scroll-mt-4 border-y border-[var(--line)] px-6 py-20 sm:py-24">
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <h2 className="font-display text-4xl font-semibold tracking-tight">
                <span className="marker">{form.title}</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
                {form.intro}
              </p>
            </div>
            <div className="rounded-2xl bg-[var(--bg-2)] p-6 shadow-[0_20px_50px_-30px_rgb(25_33_46/0.5)] sm:p-8">
              <WhatsAppForm phone={v.phone!} greeting={greeting} fields={form.fields} submit={form.submit} callLabel={k.cta.call} classes={field} />
            </div>
          </div>
        </section>
      ) : null}

      {/* Photos */}
      {v.gallery.length ? (
        <section className="mx-auto max-w-6xl px-6 pt-20 sm:pt-24" aria-label="Photos">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {gridPhotos(v.gallery).map(({ src, wide }) => (
              <Photo
                key={src}
                src={src}
                grade="edu"
                sizes={wide ? "(min-width: 640px) 66vw, 100vw" : "(min-width: 640px) 33vw, 50vw"}
                className={`rounded-xl ${wide ? "col-span-2 aspect-[8/3]" : "aspect-[4/3]"}`}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* Reviews */}
      {v.rating !== undefined && (v.distribution || v.mentions.length) ? (
        <section className="mx-auto grid max-w-6xl gap-12 px-6 pt-20 sm:pt-24 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              {v.rating.toFixed(1)} out of 5
            </h2>
            <Stars rating={v.rating} className="mt-2 text-lg text-[#e4a21b]" />
            {v.reviews ? <p className="mt-2 text-[var(--muted)]">from {v.reviews} reviews on Google</p> : null}
            {v.distribution ? (
              <div className="mt-6 max-w-sm">
                <RatingBreakdown distribution={v.distribution} barClass="bg-[var(--accent)]" trackClass="bg-[var(--ink)]/[0.08]" labelClass="text-[var(--muted)]" />
              </div>
            ) : null}
          </div>
          {v.mentions.length ? (
            <div>
              <h3 className="font-display text-xl font-semibold">{v.kind.mentions}</h3>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {v.mentions.map((m) => (
                  <li key={m.title} className="rounded-lg border-2 border-[var(--line)] bg-[var(--bg-2)] px-3.5 py-1.5">
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
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">Opening hours</h2>
            {v.hoursRows.length ? (
              <dl className="mt-6 space-y-2.5">
                {v.hoursRows.map((h) => (
                  <div key={h.label} className="flex justify-between gap-6">
                    <dt className="text-[var(--muted)]">{h.label}</dt>
                    <dd className="font-bold">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-6 text-[var(--muted)]">Call ahead to check class times.</p>
            )}
            <div className="mt-8 space-y-1.5 border-t-2 border-[var(--line)] pt-6">
              {v.address ? <p className="text-[var(--muted)]">{v.address}</p> : null}
              {v.phone ? (
                <a href={`tel:+${v.phone.full}`} className="block font-bold text-[var(--accent)]">
                  {v.phone.display}
                </a>
              ) : null}
            </div>
          </div>
          {v.coords ? <MapEmbed lat={v.coords.lat} lng={v.coords.lng} title={b.business} look="plain" className="min-h-[20rem] rounded-2xl" /> : null}
        </div>
      </section>

      <footer className="border-t border-[var(--line)] px-6 py-10 text-center text-xs text-[var(--muted)]">
        {v.name.primary}
        {b.area ? `, ${b.area}` : ""}
      </footer>

      <StickyCta cta={heroCta} barClass="border-t border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur" buttonClass="bg-[var(--accent)] text-[var(--accent-ink)]" />
    </div>
  );
}
