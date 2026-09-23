import { collapseWeek, normalizeWeek, tidyHours } from "./hours";
import type { Business, OpeningHour, ReviewTag, TemplateId } from "./types";

/**
 * Everything the templates display, worked out once from the raw business.
 * Templates stay pure layout: no parsing, no fallbacks, no guessing.
 */
export type View = ReturnType<typeof buildView>;

const CTA_TEXT: Record<TemplateId, { whatsapp: string; call: string; message: string }> = {
  restaurant: {
    whatsapp: "Book a table on WhatsApp",
    call: "Call to book a table",
    message: "Hi {name}, I'd like to book a table for ",
  },
  "coffee-shop": {
    whatsapp: "Order on WhatsApp",
    call: "Call to order",
    message: "Hi {name}, I'd like to order ",
  },
  general: {
    whatsapp: "Message us on WhatsApp",
    call: "Call us",
    message: "Hi {name}, I'd like to ask about ",
  },
};

/**
 * Lebanese numbers, stored as digits with 961 in front.
 * Mobiles (3, 70, 71, 76, 78, 79, 81) are on WhatsApp. Landlines are not,
 * so a landline gets a call button instead of a WhatsApp link that fails.
 */
export function describePhone(raw?: string) {
  const digits = (raw ?? "").replace(/\D/g, "");
  if (!digits) return null;
  const local = digits.startsWith("961") ? digits.slice(3) : digits.replace(/^0+/, "");
  const full = `961${local}`;
  const isMobile = /^(3\d{6}|7[016789]\d{6}|81\d{6})$/.test(local);
  const display =
    local.length === 8
      ? `+961 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5)}`
      : local.length === 7
        ? `+961 ${local[0]} ${local.slice(1, 4)} ${local.slice(4)}`
        : `+${full}`;
  return { full, display, isMobile };
}

function article(word: string) {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

function listJoin(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** Owner summaries can run long. Keep whole sentences, stop around 420 characters. */
function trimSummary(text?: string) {
  if (!text) return undefined;
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= 420) return clean;
  const sentences = clean.match(/[^.!?]+[.!?]+/g) ?? [clean];
  let out = "";
  for (const s of sentences) {
    if ((out + s).length > 420) break;
    out += s;
  }
  return (out || clean.slice(0, 420)).trim();
}

/** When nobody has written anything yet, say only what the data proves. */
function generatedAbout(b: Business, name: string, mentions: ReviewTag[]) {
  const parts: string[] = [];
  const cat = b.category?.toLowerCase();
  if (cat && b.area) parts.push(`${name} is ${article(cat)} ${cat} in ${b.area}.`);
  else if (cat) parts.push(`${name} is ${article(cat)} ${cat}.`);
  else parts.push(`Welcome to ${name}.`);

  if (b.rating && b.reviews)
    parts.push(`Rated ${b.rating.toFixed(1)} out of 5 by ${b.reviews} people on Google.`);

  if (mentions.length >= 2)
    parts.push(`Regulars keep mentioning the ${listJoin(mentions.slice(0, 3).map((m) => m.title))}.`);

  return parts.join(" ");
}

/** Arabic, Hebrew and similar scripts render right to left. */
export const hasRtl = (text: string) => /[\u0590-\u08FF]/.test(text);

/**
 * "Ahwet el Mina - قهوة الميناء" -> primary "Ahwet el Mina", secondary Arabic.
 * Works in either order. Names without a second script stay whole.
 */
export function splitName(name: string): { primary: string; secondary?: string } {
  const parts = name.split(/\s+[-–|]\s+/);
  if (parts.length === 2) {
    const [a, c] = parts.map((x) => x.trim());
    if (!hasRtl(a) && hasRtl(c)) return { primary: a, secondary: c };
    if (hasRtl(a) && !hasRtl(c)) return { primary: c, secondary: a };
  }
  return { primary: name };
}

export function buildView(b: Business) {
  const name = splitName(b.business);
  const photos = Array.from(new Set([b.imageUrl, ...(b.galleryUrls ?? [])].filter(Boolean))) as string[];

  const phone = describePhone(b.phone);
  const text = CTA_TEXT[b.template];
  const message = encodeURIComponent(text.message.replace("{name}", name.primary));

  const cta = phone
    ? phone.isMobile
      ? { kind: "whatsapp" as const, href: `https://wa.me/${phone.full}?text=${message}`, label: text.whatsapp }
      : { kind: "call" as const, href: `tel:+${phone.full}`, label: text.call }
    : null;

  const week = normalizeWeek(b.openingHours);
  const today: OpeningHour | undefined = b.openingHoursToday
    ? { day: b.openingHoursToday.day, hours: tidyHours(b.openingHoursToday.hours) }
    : undefined;
  const hoursRows = week
    ? collapseWeek(week)
    : today
      ? [{ label: today.day, hours: today.hours }]
      : [];

  const mentions = (b.reviewTags ?? [])
    .filter((t) => t && t.title && t.count >= 2)
    .sort((x, y) => y.count - x.count)
    .slice(0, 6);

  const directions =
    b.lat !== undefined && b.lng !== undefined
      ? `https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`
      : b.mapsUrl;

  return {
    name,
    hero: photos[0],
    gallery: photos.slice(1, 7),
    photoCount: photos.length,
    kicker: [b.category, b.area].filter(Boolean).join(" in "),
    about: b.about || trimSummary(b.editorialSummary) || generatedAbout(b, name.primary, mentions),
    headline: b.headline,
    phone,
    cta,
    week,
    hoursRows,
    highlights: (b.highlights ?? []).filter(Boolean).slice(0, 6),
    mentions,
    offerings: (b.offerings ?? []).filter((o) => o && o.name),
    rating: typeof b.rating === "number" ? b.rating : undefined,
    reviews: typeof b.reviews === "number" ? b.reviews : undefined,
    distribution: b.reviewsDistribution,
    coords: b.lat !== undefined && b.lng !== undefined ? { lat: b.lat, lng: b.lng } : undefined,
    mapsUrl: b.mapsUrl,
    directions,
    address: b.address,
  };
}
