import { docsSource } from "@/lib/source"
import { notFound } from "next/navigation"
import { getMdxComponents } from "@/components/mdx-components"
import { siteConfig } from "@/lib/config"

export default async function DocsPage(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params
  const { slug } = await params

  const page = docsSource.getPage(slug || [])

  if (!page) {
    notFound()
  }

  const MDXContent = page.data.body

  const pageUrl = `${siteConfig.url}/docs/${slug?.join("/") || ""}`

  return (
    <div>
      <h1>{page.data.title}</h1>
      {page.data.description && <p>{page.data.description}</p>}
      <MDXContent components={getMdxComponents({ pageUrl })} />
    </div>
  )
}

export async function generateStaticParams() {
  return docsSource.generateParams()
}

export async function generateMetadata(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params
  const { slug } = params
  const page = docsSource.getPage(slug || [])

  if (!page) return {}

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
