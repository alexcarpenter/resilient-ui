import fs from "fs"
import path from "path"
import { CodeBlock } from "@/components/code-block.server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Skills.md",
  description: "Skills that help you build resilient user interfaces.",
}

export default async function SkillPage() {
  const leadingIconPath = path.join(process.cwd(), "public", "leading-icon.md")
  const trailingIconPath = path.join(process.cwd(), "public", "trailing-icon.md")

  let leadingIconMd = ""
  let trailingIconMd = ""

  try {
    leadingIconMd = fs.readFileSync(leadingIconPath, "utf8")
  } catch (e) {
    leadingIconMd = "Markdown file not found: " + leadingIconPath
  }

  try {
    trailingIconMd = fs.readFileSync(trailingIconPath, "utf8")
  } catch (e) {
    trailingIconMd = "Markdown file not found: " + trailingIconPath
  }

  return (
    <>
      <header className="flex flex-col items-center px-4 py-32 text-center">
        <div className="fit-content text-left">
          <p className="text-muted-foreground flex items-center justify-between font-mono text-xs">
            <span>v0.0.1</span>
          </p>
          <h1
            className="max-w-4xl text-xl text-balance uppercase md:text-3xl"
            style={{
              fontStretch: "200%",
              fontWeight: "900",
            }}
          >
            Skills
            <span
              className="text-muted-foreground lowercase"
              style={{
                fontWeight: "100",
              }}
            >
              .md
            </span>
          </h1>
        </div>
      </header>

      <section className="px-4 pb-32">
        <div className="mx-auto mb-16 max-w-4xl">
          <CodeBlock lang="mdx" title="leading-icon.md">
            {leadingIconMd}
          </CodeBlock>
        </div>
        <div className="mx-auto mb-16 max-w-4xl">
          <CodeBlock lang="mdx" title="trailing-icon.md">
            {trailingIconMd}
          </CodeBlock>
        </div>
      </section>
    </>
  )
}
