import { createMDXSource } from "fumadocs-mdx"
import { loader } from "fumadocs-core/source"
import { interviews as interviewPosts } from "@/.source"

export const interviewsSource = loader({
  baseUrl: "/interviews",
  source: createMDXSource(interviewPosts, []),
})
