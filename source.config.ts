import {
  defineDocs,
  defineCollections,
  frontmatterSchema,
} from "fumadocs-mdx/config"
import { z } from "zod"

export const { docs, meta } = defineDocs({
  dir: "./content/docs",
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
