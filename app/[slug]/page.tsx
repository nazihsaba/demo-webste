import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { templates, themeColors } from "@/components/templates";
import { getAllSlugs, getBusiness } from "@/lib/get-business";
import { buildView } from "@/lib/view";

/**
 * One business: its data, dressed in its template.
 * Pages for businesses known at build time are made in advance. Anything
 * added later is made on its first visit, then cached (dynamicParams),
 * and refreshed in the background at most once every 10 minutes.
 */
export const revalidate = 600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = await getBusiness(slug);
  if (!b) return { title: "No preview here" };

  const v = buildView(b);
  const title = v.kicker ? `${v.name.primary}, ${v.kicker}` : v.name.primary;
  const description = v.about.length > 160 ? `${v.about.slice(0, 157).trimEnd()}...` : v.about;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  };
}

export async function generateViewport({ params }: Props): Promise<Viewport> {
  const { slug } = await params;
  const b = await getBusiness(slug);
  return { themeColor: themeColors[b?.template ?? "general"] };
}

export default async function BusinessPage({ params }: Props) {
  const { slug } = await params;
  const b = await getBusiness(slug);
  if (!b) notFound();

  const Template = templates[b.template];
  return <Template b={b} />;
}
