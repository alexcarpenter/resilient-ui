import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/config"
import { interviewsSource } from "@/lib/source"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string): string => new URL(path, siteConfig.url).toString()

  return [
    {
      url: siteConfig.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...interviewsSource.getPages().flatMap((page) => {
      const { lastModified } = page.data

      return {
        url: url(page.url),
        lastModified: lastModified ? new Date(lastModified) : undefined,
        changeFrequency: "monthly",
        priority: 0.5,
      } as MetadataRoute.Sitemap[number]
    }),
  ]
}
