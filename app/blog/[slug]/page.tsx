import { notFound } from "next/navigation"
import { blogSource } from "@/lib/source"
import { getMdxComponents } from "@/components/mdx-components"
import { siteConfig } from "@/lib/config"

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const page = blogSource.getPage([params.slug])

  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}

export default async function page(props: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  const params = await props.params
  const page = blogSource.getPage([params.slug])

  if (!page) notFound()
  const Mdx = page.data.body

  const pageUrl = `${siteConfig.url}/blog/${params.slug}`

  return (
    <>
      <h1>{page.data.title}</h1>
      <Mdx components={getMdxComponents({ pageUrl })} />
    </>
  )
}
