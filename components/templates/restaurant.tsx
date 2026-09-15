import { PreviewBanner } from "@/components/preview-banner";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Rating } from "@/components/rating";
import type { Business } from "@/lib/types";

/**
 * Restaurant template — "the room at night".
 * Deep green-black, brass rules, a printed-menu feel.
 */
export function RestaurantTemplate({ b }: { b: Business }) {
  const serif = "font-[family-name:var(--font-fraunces)]";

  return (
    <div className="min-h-screen bg-[#121A16] font-[family-name:var(--font-karla)] text-[#EDE7DA] antialiased">
      <PreviewBanner business={b.business} tone="dark" />

      {/* Hero */}
      <header className="relative flex min-h-[78vh] items-end overflow-hidden">
        {b.imageUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={b.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121A16] via-[#121A16]/75 to-[#121A16]/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,#24352C,#121A16)]" />
        )}

        <div className="relative mx-auto w-full max-w-3xl px-6 pb-16 text-center">
          {b.category ? (
            <p className="text-sm tracking-wide text-[#C9A227]">
              {b.category}
              {b.area ? ` in ${b.area}` : null}
            </p>
          ) : null}

          <h1
            className={`${serif} mt-4 text-5xl leading-[1.05] font-light text-balance sm:text-6xl`}
          >
            {b.business}
          </h1>

          {b.headline ? (
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#EDE7DA]/75 text-balance">
              {b.headline}
            </p>
          ) : null}

          <Rating
            rating={b.rating}
            reviews={b.reviews}
            className="mt-6 block text-sm text-[#C9A227]"
          />
        </div>
      </header>

      {/* About */}
      {b.about ? (
        <section className="mx-auto max-w-2xl px-6 py-20">
          <div className="mx-auto mb-10 h-px w-24 bg-[#C9A227]/40" />
          <p className={`${serif} text-center text-2xl leading-[1.6] font-light`}>
            {b.about}
          </p>
        </section>
      ) : null}

      {/* Menu */}
      {b.offerings?.length ? (
        <section className="border-y border-[#C9A227]/20 bg-[#0E1512] px-6 py-20">
          <div className="mx-auto max-w-2xl">
            <h2 className={`${serif} mb-12 text-center text-3xl font-light`}>
              From the kitchen
            </h2>

            <ul className="space-y-8">
              {b.offerings.map((item) => (
                <li key={item.name}>
                  <div className="flex items-baseline gap-4">
                    <span className={`${serif} text-xl`}>{item.name}</span>
                    <span className="h-px min-w-6 flex-1 bg-[#C9A227]/25" />
                    {item.price ? (
                      <span className="text-[#C9A227]">{item.price}</span>
                    ) : null}
                  </div>
                  {item.description ? (
                    <p className="mt-1.5 text-sm text-[#EDE7DA]/55">
                      {item.description}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Visit */}
      <section className="mx-auto max-w-2xl px-6 py-20">
        <h2 className={`${serif} mb-10 text-center text-3xl font-light`}>
          Come and find us
        </h2>

        <div className="grid gap-10 sm:grid-cols-2">
          {b.openingHours?.length ? (
            <div>
              <h3 className="mb-4 text-sm text-[#C9A227]">Hours</h3>
              <dl className="space-y-2 text-sm">
                {b.openingHours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <dt className="text-[#EDE7DA]/60">{h.day}</dt>
                    <dd>{h.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          <div>
            <h3 className="mb-4 text-sm text-[#C9A227]">Address</h3>
            {b.address ? (
              <p className="text-sm leading-relaxed text-[#EDE7DA]/80">
                {b.address}
              </p>
            ) : null}
            {b.mapsUrl ? (
              <a
                href={b.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block border-b border-[#C9A227]/50 pb-0.5 text-sm text-[#C9A227] transition-colors hover:border-[#C9A227]"
              >
                Open in Google Maps
              </a>
            ) : null}
          </div>
        </div>

        {b.phone ? (
          <div className="mt-14 text-center">
            <WhatsAppButton
              phone={b.phone}
              business={b.business}
              className="inline-block rounded-full bg-[#C9A227] px-8 py-4 font-medium text-[#121A16] transition-colors hover:bg-[#DBB53C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A227]"
            >
              Book a table on WhatsApp
            </WhatsAppButton>
            <p className="mt-4 text-sm text-[#EDE7DA]/45">
              or call +{b.phone}
            </p>
          </div>
        ) : null}
      </section>

      <footer className="border-t border-[#C9A227]/15 px-6 py-8 text-center text-xs text-[#EDE7DA]/35">
        {b.business}
        {b.area ? `, ${b.area}` : null}
      </footer>
    </div>
  );
}
