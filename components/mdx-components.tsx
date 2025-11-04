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

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="border-muted my-16 flex items-start gap-x-8 border-y py-16">
      <h2
        className="text-muted rotate-180 text-xl leading-none uppercase [writing-mode:vertical-lr] md:text-3xl"
        style={{
          fontStretch: "200%",
          fontWeight: 900,
        }}
      >
        Quote
      </h2>
      <div>
        <div
          className="*:text-vesper-orange text-xl md:text-3xl"
          style={{
            fontStretch: "200%",
            fontWeight: 100,
          }}
        >
          {children}
        </div>
        <p className="text-muted-foreground mt-8 flex items-center gap-x-4 font-mono text-xs uppercase">
          Share on{" "}
          <a
            href=""
            className="bg-muted text-muted-foreground hover:text-foreground grid size-6 place-content-center rounded-sm transition-colors"
          >
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
              <path
                fill="currentColor"
                d="M11.45 2.563h1.84L9.27 7.168 14 13.438h-3.703l-2.9-3.803-3.319 3.803H2.237l4.3-4.928L2 2.563h3.797L8.42 6.037l3.031-3.474Zm-.645 9.77h1.02L5.242 3.61H4.15l6.656 8.725Z"
              ></path>
            </svg>
          </a>
          <a
            href=""
            className="bg-muted text-muted-foreground hover:text-foreground grid size-6 place-content-center rounded-sm transition-colors"
          >
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
              <path
                fill="currentColor"
                d="M11.45 2.563h1.84L9.27 7.168 14 13.438h-3.703l-2.9-3.803-3.319 3.803H2.237l4.3-4.928L2 2.563h3.797L8.42 6.037l3.031-3.474Zm-.645 9.77h1.02L5.242 3.61H4.15l6.656 8.725Z"
              ></path>
            </svg>
          </a>
          <a
            href=""
            className="bg-muted text-muted-foreground hover:text-foreground grid size-6 place-content-center rounded-sm transition-colors"
          >
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
              <path
                fill="currentColor"
                d="M11.45 2.563h1.84L9.27 7.168 14 13.438h-3.703l-2.9-3.803-3.319 3.803H2.237l4.3-4.928L2 2.563h3.797L8.42 6.037l3.031-3.474Zm-.645 9.77h1.02L5.242 3.61H4.15l6.656 8.725Z"
              ></path>
            </svg>
          </a>
        </p>
      </div>
    </aside>
  )
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
  PullQuote,
  QuestionAnswer,
  QuestionAnswerItem,
}
