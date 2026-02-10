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
    <>
      <header className="flex flex-col items-center px-4 py-32">
        <div>
          <p className="text-vesper-orange flex items-center justify-between font-mono text-xs uppercase">
            Resilient&mdash;UI
          </p>
          <h1
            className="max-w-4xl text-xl text-balance uppercase md:text-3xl"
            style={{
              fontStretch: "200%",
              fontWeight: "900",
            }}
          >
            Interviews
          </h1>
        </div>
      </header>
      <ul>
        {posts.map((post) => (
          <li key={post.url}>
            <h2>
              <Link href={post.url}>{post.data.title}</Link>
            </h2>
          </li>
        ))}
      </ul>
    </>
  )
}
