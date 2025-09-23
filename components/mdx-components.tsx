import React, { type HTMLAttributes } from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/tabs-unstyled"
import { Pre, CodeBlock } from "./code-block.client"

export function CodeBlockTabs(props: React.ComponentProps<typeof Tabs>) {
  return <Tabs {...props} />
}

export function CodeBlockTabsList(
  props: React.ComponentProps<typeof TabsList>
) {
  return <TabsList {...props} />
}

export function CodeBlockTabsTrigger(
  props: React.ComponentProps<typeof TabsTrigger>
) {
  return <TabsTrigger {...props} />
}

export function CodeBlockTab(props: React.ComponentProps<typeof TabsContent>) {
  return <TabsContent {...props} />
}

export const mdxComponents = {
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  CodeBlockTab,
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <CodeBlock {...props}>
      <Pre>{props.children}</Pre>
    </CodeBlock>
  ),
}
