import { useRender } from "@base-ui-components/react/use-render"
import { mergeProps } from "@base-ui-components/react/merge-props"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export const buttonVariants = cva(
  "group/button relative isolate inline-flex items-center gap-x-2 text-sm [font-weight:425] [&_svg]:size-4 transition-colors bg-[var(--bg-color)] text-[var(--fg-color)]",
  {
    variants: {
      variant: {
        default:
          "[--fg-color:var(--color-neutral-50)] [--bg-color:var(--color-neutral-800)]",
        secondary:
          "[--fg-color:var(--color-neutral-950)] [--bg-color:var(--color-neutral-200)]",
        orange:
          "[--fg-color:var(--color-neutral-950)] [--bg-color:var(--color-vesper-orange)]",
        peppermint:
          "[--fg-color:var(--color-neutral-950)] [--bg-color:var(--color-vesper-peppermint)]",
      },
      disabled: {
        true: "bg-[color-mix(in_oklab,var(--bg-color)_50%,var(--color-background))] text-[color-mix(in_oklab,var(--fg-color)_50%,var(--color-background))]",
        false: "hover:bg-[color-mix(in_oklab,var(--bg-color)_95%,black)]",
      },
      size: {
        default: "h-11 px-4",
        icon: "size-11",
      },
      justify: {
        default: "justify-center",
        between: "justify-between",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      justify: "default",
      rounded: "default",
      disabled: false,
    },
  }
)

interface ButtonProps
  extends Omit<VariantProps<typeof buttonVariants>, "disabled">,
    useRender.ComponentProps<"button"> {}

export function Button({
  render,
  variant,
  size,
  className,
  justify,
  rounded,
  disabled,
  ...props
}: ButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: cn(
      buttonVariants({ variant, size, rounded, justify, disabled, className })
    ),
    disabled,
  }

  const element = useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(defaultProps, props),
  })

  return element
}
