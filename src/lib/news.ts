/**
 * Single source of truth for the News & Media categories — imported by
 * keystatic.config.ts (the CMS select field), src/content.config.ts (the
 * zod schema), and every component/page that renders a category badge or
 * filter. Add a category here once; it propagates everywhere.
 */
export const NEWS_CATEGORIES = ["LAVS Trading", "Cortijo", "Sustainability & Community"] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export const CATEGORY_BADGE_CLASS: Record<NewsCategory, string> = {
  "LAVS Trading": "bg-forest text-bone",
  Cortijo: "bg-olive text-white",
  "Sustainability & Community": "bg-gold text-ink",
};

export function formatNewsDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}
