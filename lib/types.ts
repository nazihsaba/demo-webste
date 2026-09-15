export type TemplateId = "restaurant" | "coffee-shop";

export type Offering = {
  name: string;
  description?: string;
  price?: string;
};

export type OpeningHour = {
  day: string;
  hours: string;
};

/**
 * Everything the scraper + the AI step give us about one business.
 * Only `slug`, `business` and `template` are guaranteed.
 * Every other field can be missing, so templates must handle that.
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
  headline?: string;
  about?: string;
  offerings?: Offering[];
  openingHours?: OpeningHour[];
};
