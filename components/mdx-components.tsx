import React from "react"

export function CodeBlockTabs(props: React.ComponentProps<"div">) {
  return <div {...props} />
}

export function CodeBlockTabsList(props: React.ComponentProps<"div">) {
  return <div {...props} />
}

export function CodeBlockTabsTrigger(props: React.ComponentProps<"button">) {
  return <button {...props} />
}

export function CodeBlockTab(props: React.ComponentProps<"div">) {
  return <div {...props} />
}

export const mdxComponents = {
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  CodeBlockTab,
}
