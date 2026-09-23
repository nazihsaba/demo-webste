export type TemplateId = "restaurant" | "coffee-shop" | "general";

export type Offering = { name: string; description?: string; price?: string };
export type OpeningHour = { day: string; hours: string };
export type ReviewTag = { title: string; count: number };
export type ReviewsDistribution = {
  oneStar?: number;
  twoStar?: number;
  threeStar?: number;
  fourStar?: number;
  fiveStar?: number;
};

/**
 * One business, as the templates see it.
 * Only slug, business and template are guaranteed. Everything else can be
 * missing, and every template must still look finished without it.
 */
export type Business = {
  slug: string;
  business: string;
  template: TemplateId;
  category?: string;
  area?: string;
  address?: string;
  phone?: string;
  rating?: number;
  reviews?: number;
  imageUrl?: string;
  galleryUrls?: string[];
  mapsUrl?: string;
  lat?: number;
  lng?: number;
  headline?: string;
  about?: string;
  editorialSummary?: string;
  offerings?: Offering[];
  openingHours?: OpeningHour[];
  openingHoursToday?: OpeningHour;
  highlights?: string[];
  reviewTags?: ReviewTag[];
  reviewsDistribution?: ReviewsDistribution;
};
