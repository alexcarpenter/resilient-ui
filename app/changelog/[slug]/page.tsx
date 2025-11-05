import { notFound } from "next/navigation"
import { changelogSource } from "@/lib/source"
import { SocialShare } from "@/components/social-share"
import { siteConfig } from "@/lib/config"

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const page = changelogSource.getPage([params.slug])

  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}

export default async function Page(props: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  const params = await props.params
  const page = changelogSource.getPage([params.slug])

  if (!page) notFound()
  const Mdx = page.data.body

  const pageUrl = `${siteConfig.url}/changelog/${params.slug}`

  return (
    <>
      <h1>{page.data.title}</h1>
      <SocialShare
        title={page.data.title}
        description={page.data.description}
        url={pageUrl}
      />
      <Mdx />
    </>
  )
}
