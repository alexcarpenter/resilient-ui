"use client"
import * as React from "react"
import { siteConfig } from "@/lib/config"
import { useScroll, useTransform, motion, MotionValue } from "motion/react"

export function PullQuote({ content, url }: { content: string; url?: string }) {
  const scrollRef = React.useRef(null)
  const words = content.split(" ")

  const shareUrl = url || siteConfig.url

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}&url=${encodeURIComponent(shareUrl)}`
  const blueskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(`${content} ${shareUrl}`)}`
  const linkedinUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(content)}`

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 0.85", "start 0.25"],
  })

  return (
    <aside
      ref={scrollRef}
      className="border-muted my-16 flex items-start gap-x-8 border-y py-16"
    >
      <h2
        className="text-muted mt-1 rotate-180 text-xl leading-none uppercase [writing-mode:vertical-lr] md:text-3xl"
        style={{
          fontStretch: "200%",
          fontWeight: 900,
        }}
      >
        Quote
      </h2>
      <div>
        <div
          className="text-xl md:text-3xl"
          style={{
            fontStretch: "200%",
            fontWeight: 100,
          }}
        >
          <p className="sr-only">{content}</p>
          <p className="text-vesper-orange" aria-hidden>
            {words.map((word, i) => {
              const start = i / words.length
              const end = start + 1 / words.length
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              )
            })}
          </p>
        </div>
        <p className="text-muted-foreground mt-8 flex items-center gap-x-4 font-mono text-xs uppercase">
          Share on{" "}
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-muted text-muted-foreground hover:text-foreground grid size-6 place-content-center rounded-sm transition-colors"
          >
            <span className="sr-only">Twitter</span>
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
              <path
                fill="currentColor"
                d="M11.45 2.563h1.84L9.27 7.168 14 13.438h-3.703l-2.9-3.803-3.319 3.803H2.237l4.3-4.928L2 2.563h3.797L8.42 6.037l3.031-3.474Zm-.645 9.77h1.02L5.242 3.61H4.15l6.656 8.725Z"
              ></path>
            </svg>
          </a>
          <a
            href={blueskyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-muted text-muted-foreground hover:text-foreground grid size-6 place-content-center rounded-sm transition-colors"
          >
            <span className="sr-only">Bluesky</span>
            <svg viewBox="0 0 256 226" className="size-3.5" aria-hidden="true">
              <path
                d="M55.4911549,15.1724797 C84.8410141,37.2065079 116.408338,81.8843671 128,105.858226 C139.591662,81.8843671 171.158986,37.2065079 200.508845,15.1724797 C221.686085,-0.726562511 256,-13.0280836 256,26.1164797 C256,33.9343952 251.517746,91.7899445 248.888789,101.183522 C239.750761,133.838395 206.452732,142.167409 176.832451,137.126283 C228.607099,145.938001 241.777577,175.125607 213.333183,204.313212 C159.311775,259.746226 135.689465,190.40493 129.636507,172.637268 C128.526873,169.380029 128.007662,167.856198 128,169.151973 C127.992338,167.856198 127.473127,169.380029 126.363493,172.637268 C120.310535,190.40493 96.6882254,259.746226 42.6668169,204.313212 C14.2224225,175.125607 27.3929014,145.938001 79.1675493,137.126283 C49.5472676,142.167409 16.2492394,133.838395 7.11121127,101.183522 C4.48225352,91.7899445 0,33.9343952 0,26.1164797 C0,-13.0280836 34.3139155,-0.726562511 55.4911549,15.1724797 Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-muted text-muted-foreground hover:text-foreground grid size-6 place-content-center rounded-sm transition-colors"
          >
            <span className="sr-only">LinkedIn</span>
            <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5">
              <path
                fill="currentColor"
                d="M14.82 0H1.18A1.169 1.169 0 0 0 0 1.154v13.694A1.168 1.168 0 0 0 1.18 16h13.64A1.17 1.17 0 0 0 16 14.845V1.15A1.171 1.171 0 0 0 14.82 0ZM4.744 13.64H2.369V5.996h2.375v7.642Zm-1.18-8.684a1.377 1.377 0 1 1 .52-.106 1.377 1.377 0 0 1-.527.103l.006.003Zm10.075 8.683h-2.375V9.921c0-.885-.015-2.025-1.234-2.025-1.218 0-1.425.966-1.425 1.968v3.775H6.233V5.997H8.51v1.05h.032c.317-.601 1.09-1.235 2.246-1.235 2.405-.005 2.851 1.578 2.851 3.63v4.197Z"
              ></path>
            </svg>
          </a>
        </p>
      </div>
    </aside>
  )
}

const Word = ({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) => {
  const amount = range[1] - range[0]
  const step = amount / children.length
  const characters = children.split("")

  return (
    <span className="relative inline">
      {characters.map((character, i) => {
        const start = range[0] + i * step
        const end = range[0] + (i + 1) * step
        return (
          <Character key={i} progress={progress} range={[start, end]}>
            {character}
          </Character>
        )
      })}{" "}
    </span>
  )
}

const Character = ({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="relative inline">
      <span className="text-muted">{children}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  )
}
