'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PageTree } from 'fumadocs-core/server';

interface DocsNavProps {
  tree: PageTree.Root;
}

export function DocsNav({ tree }: DocsNavProps) {
  const pathname = usePathname();

  const renderTree = (nodes: PageTree.Root) => {
    return nodes.children?.map((node) => {
      if (node.type === 'folder') {
        return (
          <div key={String(node.name)}>
            <h3>
              {node.name}
            </h3>
            <div>
              {renderTree(node)}
            </div>
          </div>
        );
      }

      if (node.type === 'page') {
        const isActive = pathname === node.url;
        return (
          <Link
            key={node.url}
            href={node.url}
            aria-current={isActive ? 'page' : undefined}
          >
            {node.name}
          </Link>
        );
      }

      return null;
    });
  };

  return (
    <nav>
      {renderTree(tree)}
    </nav>
  );
}
