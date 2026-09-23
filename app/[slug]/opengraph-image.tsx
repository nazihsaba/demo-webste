import { ImageResponse } from "next/og";
import { getBusiness } from "@/lib/get-business";
import { latinName, photoAsDataUrl } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Website preview";

// rgb triplets: the image renderer needs rgba() for see-through colours.
const COLORS = {
  restaurant: { bg: "17,24,20", ink: "#eee8dc", accent: "#d9b23a" },
  "coffee-shop": { bg: "34,28,24", ink: "#f2f3ef", accent: "#6ddcc1" },
  general: { bg: "20,22,27", ink: "#ffffff", accent: "#9fb4ff" },
} as const;

function Star({ fill, color }: { fill: number; color: string }) {
  // One star, filled from the left by `fill` (0 to 1).
  const id = `c${Math.round(fill * 100)}`;
  return (
    <svg width="34" height="34" viewBox="0 0 24 24">
      <defs>
        <linearGradient id={id}>
          <stop offset={fill} stopColor={color} />
          <stop offset={fill} stopColor={color} stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path fill={`url(#${id})`} d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7.1L12 17.3 5.7 21l1.7-7.1L2 9.2l7.1-.6z" />
    </svg>
  );
}

/**
 * The card WhatsApp shows before anyone taps: their photo, their name,
 * their rating. This decides whether the owner opens the link at all.
 */
export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = await getBusiness(slug);
  const c = COLORS[b?.template ?? "general"];
  const photo = await photoAsDataUrl(b?.imageUrl ?? b?.galleryUrls?.[0]);
  const name = b ? latinName(b.business) : "Website preview";
  const kicker = b ? [b.category, b.area].filter(Boolean).join(" in ") : "";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: `rgb(${c.bg})` }}>
        {photo ? (
          <img src={photo} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }} />
        ) : null}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            backgroundImage: `linear-gradient(to top, rgba(${c.bg},0.96) 0%, rgba(${c.bg},0.82) 38%, rgba(${c.bg},0.25) 78%, rgba(${c.bg},0.1) 100%)`,
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "64px 72px", width: "100%" }}>
          {kicker ? <div style={{ fontSize: 30, color: c.accent, marginBottom: 14 }}>{kicker}</div> : null}
          <div style={{ fontSize: name.length > 22 ? 76 : 96, color: c.ink, lineHeight: 1, letterSpacing: -2, fontWeight: 700 }}>{name}</div>
          {typeof b?.rating === "number" ? (
            <div style={{ display: "flex", alignItems: "center", marginTop: 28, gap: 6 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} fill={Math.max(0, Math.min(1, b.rating! - i))} color="#f0c35a" />
              ))}
              <div style={{ fontSize: 30, color: c.ink, marginLeft: 14, opacity: 0.85 }}>
                {`${b.rating.toFixed(1)}${b.reviews ? ` from ${b.reviews} reviews` : ""}`}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    ),
    size,
  );
}
