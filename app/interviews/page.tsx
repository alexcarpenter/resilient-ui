import type { Metadata } from "next"
import Link from "next/link"
import { interviewsSource } from "@/lib/source"

export const metadata: Metadata = {
  title: "Interviews",
  description: "Interviews",
}

export default async function Page() {
  const posts = interviewsSource
    .getPages()
    .sort(
      (a, b) =>
        (b.data.published ? new Date(b.data.published).getTime() : 0) -
        (a.data.published ? new Date(a.data.published).getTime() : 0)
    )

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.url}>
          <h2>
            <Link href={post.url}>{post.data.title}</Link>
          </h2>
        </li>
      ))}
    </ul>
  )
}
