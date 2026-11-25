import { MapEmbed } from "@/components/site/map-embed";
import { OpenStatus } from "@/components/site/open-status";
import { Photo } from "@/components/site/photo";
import { PreviewBanner } from "@/components/site/preview-banner";
import { RatingBreakdown } from "@/components/site/rating-breakdown";
import { Stars } from "@/components/site/stars";
import { StickyCta } from "@/components/site/sticky-cta";
import { buildView, gridPhotos } from "@/lib/view";
import type { Business } from "@/lib/types";

/**
 * Appointments: "the mirror and the price list".
 * For salons, barbers, clinics, fitness studios and pet care (vRB sheet,
 * family "Appointments"). The photo sits in an arch like a salon mirror,
 * and every service on the list has its own Book button that opens
 * WhatsApp with that service already typed in.
 * The accent colour changes with the kind of shop (see globals.css).
 */
export function AppointmentsTemplate({ b }: { b: Business }) {
  const v = buildView(b);
  const canBook = v.cta?.kind === "whatsapp" && v.phone;
  const bookHref = (service: string) =>
    `https://wa.me/${v.phone!.full}?text=${encodeURIComponent(v.greeting + service)}`;

  const primary =
    "rounded-full bg-[var(--accent)] px-7 py-3.5 text-center font-medium text-[var(--accent-ink)] transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";
  const card = "rounded-[1.75rem] bg-[var(--bg-2)]";

  return (
    <div className={`t-appt k-${v.kind.id} font-body min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased`}>
      <PreviewBanner business={b.business} className="border-b border-[var(--line)] text-[var(--muted)]" />

      {/* Hero: name on the left, the arched photo on the right */}
      <header className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-10 pb-16 sm:pt-16 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:pb-24">
        <div className="reveal">
          {v.kicker ? <p className="text-sm font-medium text-[var(--accent)]">{v.kicker}</p> : null}
          <h1 className="font-display mt-3 text-[clamp(2.8rem,7.5vw,5.25rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-balance">
            {v.name.primary}
            {v.name.secondary ? (
              <span dir="rtl" lang="ar" className="mt-3 block text-[0.45em] leading-tight font-medium text-[var(--muted)]">
                {v.name.secondary}
              </span>
            ) : null}
          </h1>
          {v.headline ? <p className="mt-5 max-w-md text-lg leading-snug text-[var(--muted)] text-balance">{v.headline}</p> : null}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
            {v.rating !== undefined ? (
              <span className="inline-flex items-center gap-2">
                <Stars rating={v.rating} className="text-[#e0a526]" />
                <span className="font-medium text-[var(--ink)]">{v.rating.toFixed(1)}</span>
                {v.reviews ? <span>from {v.reviews} reviews</span> : null}
              </span>
            ) : null}
            <OpenStatus week={v.week} />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {v.cta ? (
              <a href={v.cta.href} target={v.cta.kind === "whatsapp" ? "_blank" : undefined} rel="noopener noreferrer" className={primary}>
                {v.cta.label}
              </a>
            ) : null}
            {v.directions ? (
              <a href={v.directions} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4 hover:decoration-[var(--accent)]">
                Get directions
              </a>
            ) : null}
          </div>
        </div>

        <div className="reveal-late mx-auto w-full max-w-md md:mr-0">
          {v.hero ? (
            <Photo src={v.hero} grade="appt" priority sizes="(min-width: 768px) 28rem, 90vw" className="arch aspect-[4/5]" />
          ) : (
            <div className="arch grid aspect-[4/5] place-items-center bg-[var(--soft)]" aria-hidden="true">
              <span className="font-display text-[9rem] leading-none font-semibold text-[var(--accent)]/25">
                {v.name.primary.match(/\p{L}/u)?.[0] ?? ""}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Service list, each one bookable */}
      {v.offerings.length ? (
        <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6" aria-labelledby="services">
          <h2 id="services" className="font-display mb-6 px-2 text-3xl font-semibold tracking-tight">
            {v.kind.services}
          </h2>
          <ul className={`${card} divide-y divide-[var(--line)] px-5 sm:px-8`}>
            {v.offerings.map((item) => (
              <li key={item.name} className="flex items-center justify-between gap-4 py-5">
                <span className="min-w-0">
                  <span className="font-medium">{item.name}</span>
                  {item.description ? <span className="mt-0.5 block text-sm text-[var(--muted)]">{item.description}</span> : null}
                </span>
                <span className="flex shrink-0 items-center gap-4">
                  {item.price ? <span className="font-medium tabular-nums">{item.price}</span> : null}
                  {canBook ? (
                    <a
                      href={bookHref(item.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-[var(--accent)]/35 px-4 py-1.5 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
                      aria-label={`Book ${item.name}`}
                    >
                      Book
                    </a>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* About and what to expect */}
      <section className="bg-[var(--soft)] px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.3fr_1fr]">
          <p className="text-[clamp(1.25rem,2.4vw,1.6rem)] leading-[1.55]">{v.about}</p>
          {v.highlights.length ? (
            <ul className="space-y-3.5 self-center">
              {v.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[var(--accent)]" />
                  {h}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {/* Photos */}
      {v.gallery.length ? (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-label="Photos">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {gridPhotos(v.gallery).map(({ src, wide }) => (
              <Photo
                key={src}
                src={src}
                grade="appt"
                sizes={wide ? "(min-width: 640px) 66vw, 100vw" : "(min-width: 640px) 33vw, 50vw"}
                className={`rounded-2xl ${wide ? "col-span-2 aspect-[8/5]" : "aspect-[4/5]"}`}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* The week, laid out like an appointment book */}
      {v.week || v.hoursRows.length ? (
        <section className={`mx-auto max-w-6xl px-4 sm:px-6 ${v.gallery.length ? "pb-20" : "py-20"}`} aria-labelledby="hours">
          <h2 id="hours" className="font-display mb-6 px-2 text-3xl font-semibold tracking-tight">
            Opening hours
          </h2>
          {v.week ? (
            <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
              {v.week.map((d) => {
                const closed = /^closed/i.test(d.hours);
                return (
                  <li key={d.day} className={`${card} px-4 py-4 ${closed ? "opacity-55" : ""}`}>
                    <p className="text-sm text-[var(--muted)]">{d.day}</p>
                    <p className="mt-1 font-medium">{d.hours}</p>
                  </li>
                );
              })}
            </ol>
          ) : (
            <dl className={`${card} space-y-2.5 p-6 text-sm`}>
              {v.hoursRows.map((h) => (
                <div key={h.label} className="flex justify-between gap-6">
                  <dt className="text-[var(--muted)]">{h.label}</dt>
                  <dd className="font-medium">{h.hours}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>
      ) : null}

      {/* Reviews */}
      {v.rating !== undefined && (v.distribution || v.mentions.length) ? (
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className={`grid gap-4 ${v.mentions.length ? "md:grid-cols-[0.9fr_1.1fr]" : ""}`}>
            <div className={`${card} grid gap-6 p-8 ${v.mentions.length ? "" : "md:grid-cols-2 md:items-center md:gap-14"}`}>
              <div>
                <p className="font-display text-6xl font-semibold tracking-tight">{v.rating.toFixed(1)}</p>
                <Stars rating={v.rating} className="mt-2 text-lg text-[#e0a526]" />
                {v.reviews ? <p className="mt-2 text-sm text-[var(--muted)]">{v.reviews} reviews on Google</p> : null}
              </div>
              {v.distribution ? (
                <div>
                  <RatingBreakdown distribution={v.distribution} barClass="bg-[var(--accent)]" trackClass="bg-[var(--ink)]/[0.07]" labelClass="text-[var(--muted)]" />
                </div>
              ) : null}
            </div>
            {v.mentions.length ? (
              <div className={`${card} p-8`}>
                <h2 className="font-display text-xl font-semibold">{v.kind.mentions}</h2>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {v.mentions.map((m) => (
                    <li key={m.title} className="rounded-full bg-[var(--soft)] px-4 py-2 text-sm">
                      <span className="capitalize">{m.title}</span>
                      <span className="ml-2 text-[var(--muted)] tabular-nums">{m.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Find us */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
          <div className={`${card} p-8`}>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Find us</h2>
            <div className="mt-5 space-y-2">
              {v.address ? <p className="leading-relaxed text-[var(--muted)]">{v.address}</p> : null}
              {v.phone ? (
                <a href={`tel:+${v.phone.full}`} className="block font-medium text-[var(--accent)]">
                  {v.phone.display}
                </a>
              ) : null}
            </div>
            {v.directions ? (
              <a href={v.directions} target="_blank" rel="noopener noreferrer" className={`mt-8 inline-block ${primary}`}>
                Get directions
              </a>
            ) : null}
          </div>
          {v.coords ? (
            <MapEmbed lat={v.coords.lat} lng={v.coords.lng} title={b.business} look="plain" className="min-h-[20rem] rounded-[1.75rem]" />
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
