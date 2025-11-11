import { notFound } from "next/navigation"
import { interviewsSource } from "@/lib/source"
import { getMdxComponents } from "@/components/mdx-components"
import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/lib/config"

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const page = interviewsSource.getPage([params.slug])

  if (!page) notFound()

  const ogImage = `/og/${params.slug}.jpg`

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      images: [ogImage],
    },
  }
}

export default async function page(props: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  const params = await props.params
  const page = interviewsSource.getPage([params.slug])

  if (!page) notFound()

  const Mdx = page.data.body

  const pageUrl = `${siteConfig.url}/interviews/${params.slug}`

  return (
    <>
      <header className="flex flex-col items-center px-4 py-32 text-center">
        <h1
          className="uppercase"
          style={{
            fontStretch: "ultra-expanded",
            fontWeight: "900",
          }}
        >
          <Link href="/" className="hover:text-vesper-orange transition-colors">
            Resilient&mdash;UI
          </Link>
        </h1>
        <div className="bg-vesper-orange outline-muted relative mt-8 size-24 overflow-hidden rounded-sm outline-4">
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
            {Object.entries(page.data.social).map(([label, value]) => {
              return (
                <li key={label}>
                  <a
                    href={value}
                    target="_blank"
                    className="text-vesper-orange hover:underline"
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        ) : null}
      </header>
      <div className="px-4 pb-32">
        <div className="prose mx-auto max-w-prose">
          <Mdx components={getMdxComponents({ pageUrl })} />
        </div>
        {page.data.social ? (
          <footer className="mx-auto mt-16 flex max-w-prose flex-col items-center gap-8 sm:flex-row">
            <h2 className="text-foreground font-mono text-xs uppercase">
              Follow {page.data.title.split(" ").at(0)}
            </h2>
            <span className="bg-muted hidden h-px flex-1 sm:flex"></span>
            <ul className="flex items-start gap-x-4 text-xs">
              {Object.entries(page.data.social).map(([label, value]) => {
                return (
                  <li key={label}>
                    <a
                      href={value}
                      target="_blank"
                      className="text-vesper-orange font-mono text-xs uppercase hover:underline"
                    >
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </footer>
        ) : null}
      </div>
    </>
  )
}
