import fs from "fs"
import path from "path"
import { CodeBlock } from "@/components/code-block.server"

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
      <header className="flex flex-col items-center px-4 py-32 text-center">
        <h1
          className="mt-8 max-w-4xl text-xl text-balance uppercase md:text-3xl"
          style={{
            fontStretch: "200%",
            fontWeight: "900",
          }}
        >
          Skill
          <span
            className="text-muted-foreground"
            style={{
              fontWeight: "100",
            }}
          >
            .md
          </span>
        </h1>
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
