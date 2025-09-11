import type { Metadata } from "next";
import Link from "next/link";
import { blogSource } from "@/lib/source";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog",
};

export default async function Page() {
  const posts = blogSource.getPages();

  return (
    <ul>
      {posts.map((post) => (
        <Link
          key={post.url}
          href={post.url}
        >
          {post.data.title}
        </Link>
      ))}
    </ul>
  );
}