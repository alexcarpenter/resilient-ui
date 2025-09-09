// source.config.ts
import {
  defineDocs,
  defineCollections,
  frontmatterSchema
} from "fumadocs-mdx/config";
import { z } from "zod";
var { docs, meta } = defineDocs({
  dir: "content/docs"
});
var blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    published: z.string().date().or(z.date()).optional()
  })
});
var changelog = defineCollections({
  type: "doc",
  dir: "content/changelog",
  schema: frontmatterSchema.extend({
    published: z.string().date().or(z.date())
  })
});
export {
  blog,
  changelog,
  docs,
  meta
};
