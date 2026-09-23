import { CoffeeShopTemplate } from "./coffee-shop";
import { GeneralTemplate } from "./general";
import { RestaurantTemplate } from "./restaurant";
import type { Business, TemplateId } from "@/lib/types";

/**
 * Template id -> component. A new look is one new file plus one line here.
 */
export const templates: Record<TemplateId, (props: { b: Business }) => React.ReactNode> = {
  restaurant: RestaurantTemplate,
  "coffee-shop": CoffeeShopTemplate,
  general: GeneralTemplate,
};

/** Phone browser bar colour, so the page reads like an app, not a web page. */
export const themeColors: Record<TemplateId, string> = {
  restaurant: "#111814",
  "coffee-shop": "#f2f3ef",
  general: "#f7f7f4",
};
