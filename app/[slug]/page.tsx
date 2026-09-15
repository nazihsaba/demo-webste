import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getBusiness } from "@/lib/get-business";
import { templates } from "@/components/templates";

type Props = { params: Promise<{ slug: string }> };

// Re-check Supabase at most once an hour for pages already built.
export const revalidate = 3600;

// Build the pages we know about now. A business added later is still served:
// Next.js renders it on the first visit and caches it from then on.
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * This is what WhatsApp reads when the link is pasted into a chat.
 * It has to run on the server, which is why the page is not a client component.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = await getBusiness(slug);
  if (!b) return { title: "Not found" };

  const title = b.area ? `${b.business} — ${b.area}` : b.business;
  const description =
    b.headline ?? b.about ?? `A website preview for ${b.business}.`;

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      type: "website",
      images: b.imageUrl ? [{ url: b.imageUrl }] : undefined,
    },
    twitter: {
      card: b.imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: b.imageUrl ? [b.imageUrl] : undefined,
    },
  };
}

export default async function BusinessPage({ params }: Props) {
  const { slug } = await params;
  const b = await getBusiness(slug);
  if (!b) notFound();

  const Template = templates[b.template] ?? templates.restaurant;
  return <Template b={b} />;
}
