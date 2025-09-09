import { blogSource } from '@/lib/source';
import { notFound } from 'next/navigation';
import { mdxComponents } from '@/components/mdx-components';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;

  // If no slug is provided, show the blog index
  if (!slug || slug.length === 0) {
    return <BlogIndex />;
  }

  const post = blogSource.getPage(slug);

  if (!post) {
    notFound();
  }

  const MDXContent = post.data.body;

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      {/* Custom header */}
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{post.data.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {post.data.author && (
            <span>By {post.data.author}</span>
          )}
          {post.data.date && (
            <span>
              {new Date(post.data.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          )}
        </div>

        {post.data.tags && post.data.tags.length > 0 && (
          <div className="flex gap-2 mt-4">
            {post.data.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {post.data.description && (
          <p className="text-lg text-muted-foreground mt-4 border-l-4 border-border pl-4">
            {post.data.description}
          </p>
        )}
      </div>

      {/* MDX Content */}
      <MDXContent components={mdxComponents} />
    </article>
  );
}

function BlogIndex() {
  const posts = blogSource.getPages().map(page => ({
    ...page.data,
    url: page.url,
  }));

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-12">
      <div className="grid gap-8">
        {sortedPosts.map((post) => (
          <article key={post.url} className="group">
            <Link href={post.url} className="block">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                {post.description && (
                  <p className="text-muted-foreground text-lg">
                    {post.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {post.author && <span>By {post.author}</span>}
                  {post.date && (
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  )}
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>

      {sortedPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts found.</p>
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  return blogSource.generateParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  // If no slug is provided, return blog index metadata
  if (!slug || slug.length === 0) {
    return {
      title: 'Blog',
      description: 'Thoughts, ideas, and insights',
    };
  }

  const post = blogSource.getPage(slug);

  if (!post) return {};

  return {
    title: post.data.title,
    description: post.data.description,
    authors: post.data.author ? [{ name: post.data.author }] : undefined,
  };
}
