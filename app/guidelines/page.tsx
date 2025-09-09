import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Guidelines",
  description: "On building resilient UI's.",
}

export default function Guidelines() {
  return (
    <>
      <header className="mx-auto mt-32 mb-16 w-full max-w-prose px-4">
        <h1
          className="text-xl uppercase md:text-3xl"
          style={{
            fontStretch: "200%",
            fontWeight: "900",
          }}
        >
          Guidelines
        </h1>
        <p
          className="text-muted-foreground mt-2 text-xl"
          style={{
            fontStretch: "200%",
          }}
        >
          On building resilient UI&rsquo;s.
        </p>
      </header>
    </>
  )
}
