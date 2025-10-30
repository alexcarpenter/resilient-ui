import { notFound } from "next/navigation"
import { interviewsSource } from "@/lib/source"
import { mdxComponents } from "@/components/mdx-components"
import Image from "next/image"

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
      <header className="flex flex-col items-center px-4 py-32 text-center">
        <div className="bg-vesper-orange relative size-24 overflow-hidden rounded-sm">
          <Image
            src={page.data.avatar}
            width="84"
            height="84"
            alt={`${page.data.title} avatar`}
            className="absolute size-full object-cover mix-blend-multiply"
            priority
          />
        </div>
        <h1
          className="mt-8 max-w-4xl text-xl text-balance uppercase md:text-3xl"
          style={{
            fontStretch: "200%",
            fontWeight: "900",
          }}
        >
          {page.data.title}{" "}
          <span
            className="text-muted-foreground"
            style={{
              fontWeight: "100",
            }}
          >
            {page.data.description}
          </span>
        </h1>
        {page.data.social ? (
          <ul className="mt-8 flex gap-x-4 font-mono text-xs uppercase">
            {Object.entries(page.data.social).map(([key, value]) => {
              return (
                <li>
                  <a href={value} target="_blank" className="text-[#FFC799]">
                    {key}
                  </a>
                </li>
              )
            })}
          </ul>
        ) : null}
      </header>
      <div className="px-4 pb-32">
        <div className="prose mx-auto max-w-prose">
          <Mdx components={mdxComponents} />
        </div>
      </div>
    </>
  )
}
