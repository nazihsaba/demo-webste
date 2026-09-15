import { PreviewBanner } from "@/components/preview-banner";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Rating } from "@/components/rating";
import type { Business } from "@/lib/types";

/**
 * Coffee shop template — "specialty roaster, daylight".
 * Paper ground, espresso ink, one flat teal block, asymmetric hero.
 */
export function CoffeeShopTemplate({ b }: { b: Business }) {
  return (
    <div className="min-h-screen bg-[#F2F3EF] font-[family-name:var(--font-space)] text-[#221C18] antialiased">
      <PreviewBanner business={b.business} tone="light" />

      {/* Hero */}
      <header className="mx-auto max-w-6xl px-6 pt-14 pb-16 sm:pt-20">
        <div className="grid items-end gap-10 md:grid-cols-[1.1fr_1fr]">
          <div>
            {b.category ? (
              <p className="text-sm font-medium text-[#0F6E5C]">
                {b.category}
                {b.area ? ` in ${b.area}` : null}
              </p>
            ) : null}

            <h1 className="mt-3 text-6xl leading-[0.95] font-bold tracking-tight text-balance sm:text-7xl">
              {b.business}
            </h1>

            {b.headline ? (
              <p className="mt-6 max-w-md text-xl leading-snug text-[#221C18]/70 text-balance">
                {b.headline}
              </p>
            ) : null}

            {b.phone ? (
              <WhatsAppButton
                phone={b.phone}
                business={b.business}
                className="mt-8 inline-block rounded-full bg-[#0F6E5C] px-7 py-3.5 font-medium text-[#F2F3EF] transition-colors hover:bg-[#0B5748] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F6E5C]"
              >
                Order on WhatsApp
              </WhatsAppButton>
            ) : null}
          </div>

          <div className="relative">
            {b.imageUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.imageUrl}
                  alt=""
                  className="aspect-4/5 w-full rounded-[2rem] object-cover"
                />
                <Rating
                  rating={b.rating}
                  reviews={b.reviews}
                  className="absolute -bottom-4 -left-4 rounded-full bg-[#221C18] px-5 py-2.5 text-sm text-[#F2F3EF] shadow-lg"
                />
              </>
            ) : (
              <Rating
                rating={b.rating}
                reviews={b.reviews}
                className="inline-block rounded-full bg-[#221C18] px-5 py-2.5 text-sm text-[#F2F3EF]"
              />
            )}
          </div>
        </div>
      </header>

      {/* About — the one flat colour block */}
      {b.about ? (
        <section className="bg-[#0F6E5C] px-6 py-20 text-[#F2F3EF]">
          <p className="mx-auto max-w-2xl text-2xl leading-[1.5] font-light text-balance">
            {b.about}
          </p>
        </section>
      ) : null}

      {/* Menu */}
      {b.offerings?.length ? (
        <section className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="mb-10 text-3xl font-bold tracking-tight">On the menu</h2>

          <ul className="grid gap-x-12 gap-y-5 sm:grid-cols-2">
            {b.offerings.map((item) => (
              <li
                key={item.name}
                className="flex items-baseline justify-between gap-4 border-b border-[#221C18]/10 pb-4"
              >
                <span>
                  <span className="font-medium">{item.name}</span>
                  {item.description ? (
                    <span className="mt-0.5 block text-sm text-[#221C18]/55">
                      {item.description}
                    </span>
                  ) : null}
                </span>
                {item.price ? (
                  <span className="shrink-0 font-medium text-[#0F6E5C]">
                    {item.price}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Visit */}
      <section className="border-t border-[#221C18]/10 px-6 py-20">
        <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2">
          <div>
            <h2 className="mb-5 text-3xl font-bold tracking-tight">Find us</h2>
            {b.address ? (
              <p className="leading-relaxed text-[#221C18]/70">{b.address}</p>
            ) : null}
            {b.mapsUrl ? (
              <a
                href={b.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block border-b-2 border-[#0F6E5C]/30 pb-0.5 font-medium text-[#0F6E5C] transition-colors hover:border-[#0F6E5C]"
              >
                Open in Google Maps
              </a>
            ) : null}
            {b.phone ? (
              <p className="mt-6 text-[#221C18]/70">+{b.phone}</p>
            ) : null}
          </div>

          {b.openingHours?.length ? (
            <div>
              <h3 className="mb-5 font-medium text-[#0F6E5C]">Open</h3>
              <dl className="space-y-2">
                {b.openingHours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <dt className="text-[#221C18]/60">{h.day}</dt>
                    <dd className="font-medium">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </div>
      </section>

      {/* Sticky action on mobile, where nearly everyone opens this */}
      {b.phone ? (
        <div className="sticky bottom-0 border-t border-[#221C18]/10 bg-[#F2F3EF]/95 p-4 backdrop-blur sm:hidden">
          <WhatsAppButton
            phone={b.phone}
            business={b.business}
            className="block rounded-full bg-[#0F6E5C] py-3.5 text-center font-medium text-[#F2F3EF]"
          >
            Order on WhatsApp
          </WhatsAppButton>
        </div>
      ) : null}

      <footer className="px-6 py-8 text-center text-xs text-[#221C18]/40">
        {b.business}
        {b.area ? `, ${b.area}` : null}
      </footer>
    </div>
  );
}
