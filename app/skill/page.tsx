import fs from "fs"
import path from "path"
import { CodeBlock } from "@/components/code-block.server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Skill.md",
  description: "",
}

export default async function SkillPage() {
  const mdPath = path.join(process.cwd(), "public", "skill.md")
  let md = ""
  try {
    md = fs.readFileSync(mdPath, "utf8")
  } catch (e) {
    md = "Markdown file not found: " + mdPath
  }

  return (
    <>
      <header className="flex flex-col items-center px-4 py-32">
        <div className="max-content">
          <p className="text-muted-foreground flex items-center justify-between font-mono text-xs">
            v0.0.1
          </p>
          <h1
            className="max-w-4xl text-xl text-balance uppercase md:text-3xl"
            style={{
              fontStretch: "200%",
              fontWeight: "900",
            }}
          >
            Skill&mdash;MD
          </h1>
        </div>

        <CodeBlock lang="bash" title="Install" className="mt-8">
          curl -fsSL https://www.resilient-ui.com/install | bash
        </CodeBlock>
      </header>

      <section className="px-4 pb-32">
        <div className="mx-auto mb-16 max-w-4xl">
          <CodeBlock lang="mdx" title="resilient-ui-skill.md">
            {md}
          </CodeBlock>
        </div>
      </section>
    </>
  )
}
