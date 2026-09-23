import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { templates, themeColors } from "@/components/templates";
import { getAllSlugs, getBusiness } from "@/lib/get-business";

type Props = { params: Promise<{ slug: string }> };

// Pages re-check Supabase at most once an hour.
export const revalidate = 3600;

// Build every business known now. One added later is built on its first
// visit and cached from then on, so new links work without a redeploy.
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateViewport({ params }: Props): Promise<Viewport> {
  const { slug } = await params;
  const b = await getBusiness(slug);
  return { themeColor: b ? themeColors[b.template] : "#ffffff" };
}

/** What WhatsApp reads when the link is pasted into a chat. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = await getBusiness(slug);
  if (!b) return { title: "Preview not found" };

  const title = b.area ? `${b.business}, ${b.area}` : b.business;
  const description =
    b.headline ??
    [b.category, typeof b.rating === "number" ? `rated ${b.rating.toFixed(1)} on Google` : null]
      .filter(Boolean)
      .join(", ");

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BusinessPage({ params }: Props) {
  const { slug } = await params;
  const b = await getBusiness(slug);
  if (!b) notFound();

  const Template = templates[b.template] ?? templates.general;
  return <Template b={b} />;
}
