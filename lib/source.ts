import { createMDXSource } from "fumadocs-mdx"
import { loader } from "fumadocs-core/source"
import {
  docs,
  meta,
  blog as blogPosts,
  changelog as changelogPosts,
} from "@/.source"

export const docsSource = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
})

export const blogSource = loader({
  baseUrl: "/blog",
  source: createMDXSource(blogPosts, []),
})

export const changelogSource = loader({
  baseUrl: "/changelog",
  source: createMDXSource(changelogPosts, []),
})
