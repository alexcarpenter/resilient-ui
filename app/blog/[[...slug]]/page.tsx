import { blogSource } from "@/lib/source"
import { notFound } from "next/navigation"
import { mdxComponents } from "@/components/mdx-components"
import Link from "next/link"

interface PageProps {
  params: { slug?: string[] }
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = params

  if (!slug || slug.length === 0) {
    return <BlogIndex />
  }

  const entry = blogSource.getPage(slug)

  if (!entry) {
    notFound()
  }

  const MDXContent = entry.data.body

  return (
    <article>
      <h1>{entry.data.title}</h1>
      <MDXContent components={mdxComponents} />
    </article>
  )
}

function BlogIndex() {
  const entries = blogSource.getPages().map((page) => ({
    ...page.data,
    url: page.url,
  }))

  const sortedEntries = entries.sort((a, b) => {
    if (!a.published || !b.published) return 0
    return new Date(b.published).getTime() - new Date(a.published).getTime()
  })

  return (
    <ul>
      {sortedEntries.map((entry) => (
        <li key={entry.url}>
          <Link href={entry.url}>{entry.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export async function generateStaticParams() {
  return blogSource.generateParams()
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = params

  if (!slug || slug.length === 0) {
    return {
      title: "Blog",
      description: "Blog",
    }
  }

  const entry = blogSource.getPage(slug)

  if (!entry) return {}

  return {
    title: entry.data.title,
    description: entry.data.description,
  }
}
