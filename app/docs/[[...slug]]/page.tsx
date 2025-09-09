import { docsSource } from "@/lib/source"
import { notFound } from "next/navigation"
import { mdxComponents } from "@/components/mdx-components"

interface PageProps {
  params: { slug?: string[] }
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = params

  const page = docsSource.getPage(slug || [])

  if (!page) {
    notFound()
  }

  const MDXContent = page.data.body

  return (
    <div>
      <h1>{page.data.title}</h1>
      {page.data.description && <p>{page.data.description}</p>}
      <MDXContent components={mdxComponents} />
    </div>
  )
}

export async function generateStaticParams() {
  return docsSource.generateParams()
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = params
  const page = docsSource.getPage(slug || [])

  if (!page) return {}

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
