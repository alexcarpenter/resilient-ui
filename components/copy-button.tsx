"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckIcon, CopyIcon } from "lucide-react";

interface Props extends Omit<React.ComponentProps<"button">, "children"> {
  value: string;
}

export function CopyButton({ value, onClick, ...props }: Props) {
  const [state, setState] = React.useOptimistic<"idle" | "copied" | "failed">(
    "idle"
  );
  const [, startTransition] = React.useTransition();
  return (
    <button
      {...props}
      onClick={(e) => {
        startTransition(async () => {
          try {
            await navigator.clipboard.writeText(value);
            setState("copied");
            onClick?.(e);
          } catch (_) {
            setState("failed");
          }
          await new Promise((resolve) => setTimeout(resolve, 2000));
        });
      }}
      className="flex size-4 items-center justify-center transition-colors duration-200 ease-out will-change-transform"
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
          {state === "copied" ? (
            <CheckIcon className="size-4 flex-none" aria-hidden />
          ) : (
            <CopyIcon className="size-4 flex-none" aria-hidden />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
