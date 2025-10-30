import { notFound } from "next/navigation"
import { interviewsSource } from "@/lib/source"
import { mdxComponents } from "@/components/mdx-components"

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const page = interviewsSource.getPage([params.slug])

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
  const page = interviewsSource.getPage([params.slug])

  if (!page) notFound()
  const Mdx = page.data.body

  return (
    <>
      <h1>{page.data.title}</h1>
      <Mdx components={mdxComponents} />
    </>
  )
}
