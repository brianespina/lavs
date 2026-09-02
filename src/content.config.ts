import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { NEWS_CATEGORIES } from "./lib/news";

/**
 * Mirrors the `news` collection schema in keystatic.config.ts. Keystatic
 * writes/reads these as .mdoc files under src/content/news/ — this just
 * lets Astro validate and query them via getCollection/getEntry. Field
 * names and types must match keystatic.config.ts by hand (no shared
 * runtime between the two configs), but the category list itself comes
 * from lib/news.ts so it can't drift.
 */
const news = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(NEWS_CATEGORIES),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    excerpt: z.string(),
    coverImage: z.string(),
  }),
});

export const collections = { news };
