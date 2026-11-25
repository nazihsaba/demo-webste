import { AppointmentsTemplate } from "./appointments";
import { CoffeeShopTemplate } from "./coffee-shop";
import { EducationTemplate } from "./education";
import { EventsTemplate } from "./events";
import { GeneralTemplate } from "./general";
import { QuoteTemplate } from "./quote";
import { RestaurantTemplate } from "./restaurant";
import type { Business, TemplateId } from "@/lib/types";

/**
 * Template id -> component. A new look is one new file plus one line here.
 */
export const templates: Record<TemplateId, (props: { b: Business }) => React.ReactNode> = {
  restaurant: RestaurantTemplate,
  "coffee-shop": CoffeeShopTemplate,
  appointments: AppointmentsTemplate,
  quote: QuoteTemplate,
  events: EventsTemplate,
  education: EducationTemplate,
  general: GeneralTemplate,
};

/** Phone browser bar colour, so the page reads like an app, not a web page. */
export const themeColors: Record<TemplateId, string> = {
  restaurant: "#111814",
  "coffee-shop": "#f2f3ef",
  appointments: "#f5f2f4",
  quote: "#1c242d",
  events: "#eceee7",
  education: "#f3f5f7",
  general: "#f7f7f4",
};
