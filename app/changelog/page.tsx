import type { Metadata } from "next";
import Link from "next/link";
import { changelogSource } from "@/lib/source";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Changelog",
};

export default async function Page() {
  const posts = changelogSource.getPages();

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