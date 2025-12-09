"use client"
import * as React from "react"
import { useTransform, motion, MotionValue, useScroll } from "motion/react"

export function TextReveal({
  content,
  ...props
}: {
  content: string
} & React.ComponentPropsWithoutRef<"p">) {
  const words = content.split(" ")
  const scrollRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 0.9", "start 0.25"],
  })
  return (
    <>
      <p className="sr-only">{content}</p>
      <p ref={scrollRef} {...props} aria-hidden>
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
    </>
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

  return (
    <span className="relative inline-block">
      {children.split("").map((char, i) => {
        const start = range[0] + i * step
        const end = range[0] + (i + 1) * step
        return (
          <Char key={`c_${i}`} progress={progress} range={[start, end]}>
            {char}
          </Char>
        )
      })}
      <span className="inline-block w-[0.25em]"> </span>
    </span>
  )
}

const Char = ({
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
    <span className="relative inline-block">
      <span className="text-muted">{children}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  )
}
