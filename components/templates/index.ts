import { RestaurantTemplate } from "./restaurant";
import { CoffeeShopTemplate } from "./coffee-shop";
import type { Business, TemplateId } from "@/lib/types";

/**
 * The template registry.
 * Adding a third look (hair salon, garage, gym) is one new file
 * plus one line here. Nothing else in the project changes.
 */
export const templates: Record<
  TemplateId,
  (props: { b: Business }) => React.ReactNode
> = {
  restaurant: RestaurantTemplate,
  "coffee-shop": CoffeeShopTemplate,
};
