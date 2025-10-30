import type { Metadata } from "next"
import Link from "next/link"
import { interviewsSource } from "@/lib/source"

export const metadata: Metadata = {
  title: "Interviews",
  description: "Interviews",
}

export default async function Page() {
  const posts = interviewsSource.getPages()

  return (
    <ul>
      {posts.map((post) => (
        <Link key={post.url} href={post.url}>
          {post.data.title}
        </Link>
      ))}
    </ul>
  )
}
