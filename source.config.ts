import {
  defineConfig,
  defineDocs,
  defineCollections,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config"
import { z } from "zod"
// import type { ElementContent } from "hast"

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

export const interviews = defineCollections({
  type: "doc",
  dir: "./content/interviews",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    avatar: z.string(),
    published: z.string().date().or(z.date()),
    social: z
      .object({
        website: z.string().optional(),
        github: z.string().optional(),
        twitter: z.string().optional(),
        bluesky: z.string().optional(),
      })
      .optional(),
  }),
})

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "vesper",
        dark: "vesper",
      },
      // transformers: [
      //   {
      //     name: "@shikijs/transformers:remove-notation-escape",
      //     code(hast) {
      //       function replace(node: ElementContent): void {
      //         if (node.type === "text") {
      //           node.value = node.value.replace("[\\!code", "[!code")
      //         } else if ("children" in node) {
      //           for (const child of node.children) {
      //             replace(child)
      //           }
      //         }
      //       }

      //       replace(hast)
      //       return hast
      //     },
      //   },
      // ],
    },
    // TODO: CodeBlock add groupId support
    // remarkNpmOptions: {
    //   persist: {
    //     id: "package-manager",
    //   },
    // },
  },
})
