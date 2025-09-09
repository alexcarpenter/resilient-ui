import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/config"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
    },
  ]
}
