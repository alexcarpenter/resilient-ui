import { docsSource } from '@/lib/source';
import { notFound } from 'next/navigation';
import type { TOCItemType } from 'fumadocs-core/server';
import { mdxComponents } from '@/components/mdx-components';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;

  const page = docsSource.getPage(slug || []);

  if (!page) {
    notFound();
  }

  const MDXContent = page.data.body;

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {/* Custom header */}
      <div className="not-prose mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{page.data.title}</h1>
        {page.data.description && (
          <p className="text-lg text-muted-foreground mt-2">{page.data.description}</p>
        )}
      </div>

      {/* MDX Content */}
      <MDXContent components={mdxComponents} />

      {/* Optional: Table of Contents */}
      {page.data.toc && page.data.toc.length > 0 && (
        <div className="not-prose mt-12 border-t pt-8">
          <h2 className="text-lg font-semibold mb-4">On this page</h2>
          <ul className="space-y-2">
            {page.data.toc.map((item: TOCItemType) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  style={{ paddingLeft: `${(item.depth - 1) * 12}px` }}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  return docsSource.generateParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = docsSource.getPage(slug || []);

  if (!page) return {};

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
