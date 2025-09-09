import { siteConfig } from "@/lib/config"

export default function Home() {
  return (
    <main className="grid w-full flex-1 place-content-center px-4 py-16">
      <div className="flex flex-col gap-y-1">
        <p className="text-muted-foreground flex items-center justify-between font-mono text-xs">
          <span>v{siteConfig.version}</span>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener"
            className="hover:text-foreground transition-colors"
          >
            {process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7)}
          </a>
        </p>
        <h1
          className="flex items-center gap-x-2 text-xl uppercase md:text-3xl"
          style={{
            fontStretch: "200%",
            fontWeight: "900",
          }}
        >
          Resilient&mdash;UI
        </h1>
        <p className="text-muted-foreground text-right font-mono text-xs uppercase">
          by{" "}
          <a
            href="https://alexcarpenter.me"
            target="_blank"
            rel="noopener"
            className="hover:text-foreground transition-colors"
          >
            Alex Carpenter
          </a>
        </p>
      </div>
    </main>
  )
}
