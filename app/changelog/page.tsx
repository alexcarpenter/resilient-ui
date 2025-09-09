import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "All notable changes to this project will be documented in this file.",
}

export default function Changelog() {
  return (
    <>
      <header className="mx-auto mt-32 mb-16 w-full max-w-prose">
        <h1
          className="text-xl uppercase md:text-3xl"
          style={{
            fontStretch: "200%",
            fontWeight: "900",
          }}
        >
          Changelog
        </h1>
        <p
          className="text-muted-foreground mt-2 text-xl"
          style={{
            fontStretch: "200%",
          }}
        >
          All notable changes to this project will be documented in this file.
        </p>
      </header>
    </>
  )
}
