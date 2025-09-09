import { changelogSource } from '@/lib/source';
import { notFound } from 'next/navigation';
import { mdxComponents } from '@/components/mdx-components';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function ChangelogPage({ params }: PageProps) {
  const { slug } = await params;

  // If no slug is provided, show the changelog index
  if (!slug || slug.length === 0) {
    return <ChangelogIndex />;
  }

  const entry = changelogSource.getPage(slug);

  if (!entry) {
    notFound();
  }

  const MDXContent = entry.data.body;

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      {/* Custom header */}
      <div className="not-prose mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold tracking-tight">{entry.data.title}</h1>
          {entry.data.version && (
            <span className="px-3 py-1 text-sm font-medium bg-primary text-primary-foreground rounded-full">
              v{entry.data.version}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {entry.data.date && (
            <span>
              {new Date(entry.data.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          )}
          {entry.data.type && (
            <span className={`px-2 py-1 text-xs rounded-full ${entry.data.type === 'major' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                entry.data.type === 'minor' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
              {entry.data.type}
            </span>
          )}
        </div>

        {entry.data.description && (
          <p className="text-lg text-muted-foreground mt-4 border-l-4 border-border pl-4">
            {entry.data.description}
          </p>
        )}
      </div>

      {/* MDX Content */}
      <MDXContent components={mdxComponents} />
    </article>
  );
}

function ChangelogIndex() {
  const entries = changelogSource.getPages().map(page => ({
    ...page.data,
    url: page.url,
  }));

  // Sort entries by date (newest first)
  const sortedEntries = entries.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-12">
      <div className="grid gap-8">
        {sortedEntries.map((entry) => (
          <article key={entry.url} className="group border-l-4 border-border pl-6">
            <Link href={entry.url} className="block">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {entry.title}
                  </h2>
                  {entry.version && (
                    <span className="px-3 py-1 text-sm font-medium bg-primary text-primary-foreground rounded-full">
                      v{entry.version}
                    </span>
                  )}
                </div>

                {entry.description && (
                  <p className="text-muted-foreground text-lg">
                    {entry.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {entry.date && (
                    <span>
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  )}
                  {entry.type && (
                    <span className={`px-2 py-1 text-xs rounded-full ${entry.type === 'major' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        entry.type === 'minor' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                      {entry.type}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {sortedEntries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No changelog entries found.</p>
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  return changelogSource.generateParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  // If no slug is provided, return changelog index metadata
  if (!slug || slug.length === 0) {
    return {
      title: 'Changelog',
      description: 'Track all changes and updates to the project',
    };
  }

  const entry = changelogSource.getPage(slug);

  if (!entry) return {};

  return {
    title: entry.data.title,
    description: entry.data.description,
  };
}
