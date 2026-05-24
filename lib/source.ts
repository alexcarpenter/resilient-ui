import { loader } from "fumadocs-core/source"
import { toFumadocsSource } from "fumadocs-mdx/runtime/server"
import { interviews as interviewPosts } from "@/.source/server"

export const interviewsSource = loader({
  baseUrl: "/interviews",
  source: toFumadocsSource(interviewPosts, []),
})
