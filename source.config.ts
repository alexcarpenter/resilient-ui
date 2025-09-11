import {
  defineConfig,
  defineDocs,
  defineCollections,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config"
import { z } from "zod"

export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
})

export const blog = defineCollections({
  type: "doc",
  dir: "./content/blog",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.string().date().or(z.date()).optional(),
  }),
})

export const changelog = defineCollections({
  type: "doc",
  dir: "./content/changelog",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.string().date().or(z.date()),
  }),
})

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "vesper",
        dark: "vesper",
      },
    },
  },
})
