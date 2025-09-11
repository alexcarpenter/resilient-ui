import React from "react"
import { Tabs } from "@base-ui-components/react/tabs"

export function CodeBlockTabs(props: React.ComponentProps<typeof Tabs.Root>) {
  return <Tabs.Root {...props} />
}

export function CodeBlockTabsList(
  props: React.ComponentProps<typeof Tabs.List>
) {
  return <Tabs.List {...props} />
}

export function CodeBlockTabsTrigger(
  props: React.ComponentProps<typeof Tabs.Tab>
) {
  return <Tabs.Tab {...props} />
}

export function CodeBlockTab(props: React.ComponentProps<typeof Tabs.Panel>) {
  return <Tabs.Panel {...props} />
}

export const mdxComponents = {
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  CodeBlockTab,
}
