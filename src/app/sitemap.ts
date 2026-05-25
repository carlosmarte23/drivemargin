import type { MetadataRoute } from "next";

const siteUrl = "https://drivemargin.carlosmarte.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
