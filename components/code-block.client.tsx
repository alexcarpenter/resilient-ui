"use client"
import {
  type ComponentProps,
  type ReactNode,
  type RefObject,
  startTransition,
  useContext,
  useOptimistic,
  useRef,
  useTransition,
} from "react"
import { cn } from "@/lib/utils"
import { CheckIcon, Copy, CopyIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { is } from "zod/v4/locales"

export interface CodeBlockProps extends ComponentProps<"figure"> {
  icon?: ReactNode
  "data-line-numbers"?: boolean
}

export function CodeBlock({
  ref,
  title,
  icon,
  children,
  className,
  ...props
}: CodeBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <figure
      ref={ref}
      {...props}
      className={cn(
        "overflow-hidden rounded-lg border border-neutral-800",
        className
      )}
    >
      {title ? (
        <div className="flex h-11 items-center gap-2 border-b border-neutral-800 px-4">
          {typeof icon === "string" ? (
            <div
              className="text-[#99FFE4] [&_svg]:size-4"
              dangerouslySetInnerHTML={{
                __html: icon,
              }}
            />
          ) : (
            icon
          )}
          <figcaption className="flex-1 truncate text-sm">{title}</figcaption>
          <CopyButton containerRef={containerRef} />
        </div>
      ) : null}
      <div ref={containerRef}>{children}</div>
    </figure>
  )
}

export interface PreProps extends ComponentProps<"pre"> {}

export function Pre(props: PreProps) {
  return (
    <pre {...props} className={cn("w-full", props.className)}>
      {props.children}
    </pre>
  )
}

function CopyButton({
  className,
  containerRef,
  onClick,
  ...props
}: ComponentProps<"button"> & {
  containerRef: RefObject<HTMLElement | null>
}) {
  const [state, setState] = useOptimistic<"idle" | "copied" | "failed">("idle")
  const [, startTransition] = useTransition()

  return (
    <button
      type="button"
      className={cn(
        "flex size-4 items-center justify-center transition-colors duration-200 ease-out will-change-transform",
        className
      )}
      onClick={(e) => {
        startTransition(async () => {
          try {
            const pre = containerRef.current
              ?.getElementsByTagName("pre")
              .item(0)
            if (!pre) return

            const clone = pre.cloneNode(true) as HTMLElement
            clone.querySelectorAll(".nd-copy-ignore").forEach((node) => {
              node.replaceWith("\n")
            })

            void navigator.clipboard.writeText(clone.textContent ?? "")
            setState("copied")
            onClick?.(e)
          } catch {
            setState("failed")
          }
          await new Promise((resolve) => setTimeout(resolve, 2000))
        })
      }}
      {...props}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={state === "copied" ? "check" : "copy"}
          initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          transition={{
            type: "spring",
            duration: 0.3,
            bounce: 0,
          }}
        >
          <span className="absolute top-1/2 left-1/2 size-11 -translate-x-1/2 -translate-y-1/2" />
          {state === "copied" ? (
            <CheckIcon className="size-4 flex-none" aria-hidden />
          ) : (
            <CopyIcon className="size-4 flex-none" aria-hidden />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
