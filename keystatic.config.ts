import { config, fields, collection } from "@keystatic/core";
import { NEWS_CATEGORIES } from "./src/lib/news";

/**
 * Keystatic Cloud project — content is stored as files in the GitHub repo
 * connected to this Cloud project (see the project's settings page in
 * Keystatic Cloud), with Keystatic Cloud handling editor auth on top.
 * See /docs/cms.md for how this wires up to Astro content collections.
 */
export default config({
  storage: {
    kind: "cloud",
  },
  cloud: {
    project: "lavs-trading/lavs",
  },
  ui: {
    brand: {
      name: "LAVS Trading & Development",
    },
  },
  collections: {
    news: collection({
      label: "News & Media",
      slugField: "title",
      path: "src/content/news/*",
      format: { contentField: "body" },
      entryLayout: "content",
      previewUrl: "/news/{slug}",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        category: fields.select({
          label: "Category",
          description: "Which section this update belongs to — drives the color badge and the filter strip on /news.",
          options: NEWS_CATEGORIES.map((value) => ({ label: value, value })),
          defaultValue: NEWS_CATEGORIES[0],
        }),
        date: fields.date({
          label: "Publish date",
          defaultValue: { kind: "today" },
        }),
        featured: fields.checkbox({
          label: "Feature as the lead story",
          description: "The most recent featured LAVS Trading item runs as the large feature card on /news. Leave off for most updates.",
          defaultValue: false,
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "One or two sentences — shown on cards and thumbnails.",
          multiline: true,
          validation: { length: { min: 1, max: 240 } },
        }),
        coverImage: fields.image({
          label: "Cover image",
          directory: "public/images/news",
          publicPath: "/images/news/",
        }),
        body: fields.markdoc({
          label: "Article content",
        }),
      },
    }),
  },
});
