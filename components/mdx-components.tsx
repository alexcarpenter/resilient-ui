import { type HTMLAttributes } from "react"
import {
  Pre,
  CodeBlock,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  CodeBlockTab,
} from "./code-block.client"
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
  QuestionAnswer,
  QuestionAnswerItem,
}
