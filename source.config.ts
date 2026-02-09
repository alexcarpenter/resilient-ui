import { defineConfig, defineCollections } from "fumadocs-mdx/config"
import { z } from "zod"
import { rehypeQuestionAnswer } from "./lib/rehype-question-answer"

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
    rehypePlugins: [rehypeQuestionAnswer],
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
