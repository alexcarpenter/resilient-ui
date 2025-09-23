import React, { type HTMLAttributes } from "react"
import { highlight } from "fumadocs-core/highlight"
import * as Base from "@/components/code-block.client"

export async function CodeBlock({
  children,
  lang,
  ...rest
}: HTMLAttributes<HTMLElement> & {
  children: string
  lang: string
}) {
  const rendered = await highlight(children, {
    lang,
    theme: "vesper",
    components: {
      pre: (props) => <Base.Pre {...props} />,
    },
  })

  return <Base.CodeBlock {...rest}>{rendered}</Base.CodeBlock>
}
