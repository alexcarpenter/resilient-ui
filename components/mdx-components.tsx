import { type HTMLAttributes } from "react"
import {
  Pre,
  CodeBlock,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  CodeBlockTab,
} from "./code-block.client"
import { PullQuote } from "./pull-quote"
import { QuestionAnswer, QuestionAnswerItem } from "./question-answer"

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
  PullQuote,
  QuestionAnswer,
  QuestionAnswerItem,
}

export function getMdxComponents(options: { pageUrl: string }) {
  return {
    ...mdxComponents,
    PullQuote: (props: { content: string }) => (
      <PullQuote {...props} url={options.pageUrl} />
    ),
  }
}
