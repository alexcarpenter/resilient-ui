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
  schema: frontmatterSchema.extend({
    published: z.string().date().or(z.date()).optional(),
  }),
})

export const changelog = defineCollections({
  type: "doc",
  dir: "./content/changelog",
  schema: frontmatterSchema.extend({
    published: z.string().date().or(z.date()),
  }),
})

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
})
