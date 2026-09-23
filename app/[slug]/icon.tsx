import { ImageResponse } from "next/og";
import { getBusiness } from "@/lib/get-business";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const COLORS = {
  restaurant: ["#111814", "#c9a227"],
  "coffee-shop": ["#0f6e5c", "#f2f3ef"],
  general: ["#2447b8", "#ffffff"],
} as const;

/** The browser tab shows their initial, not the Vercel logo. */
export default async function Icon({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = await getBusiness(slug);
  const [bg, ink] = COLORS[b?.template ?? "general"];
  const letter = (b?.business.match(/[A-Za-z0-9]/)?.[0] ?? "•").toUpperCase();

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: bg, color: ink, fontSize: 40, fontWeight: 700, borderRadius: 14 }}>
        {letter}
      </div>
    ),
    size,
  );
}
