import { useRender } from "@base-ui-components/react/use-render"
import { mergeProps } from "@base-ui-components/react/merge-props"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-x-2 text-sm [font-weight:425] [&_svg]:size-4 transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-800 text-neutral-50 hover:bg-[color-mix(in_oklab,var(--color-neutral-800)_95%,black)]",
        secondary:
          "bg-neutral-50 text-neutral-950 hover:bg-[color-mix(in_oklab,var(--color-neutral-50)_95%,black)]",
        orange:
          "bg-vesper-orange text-neutral-950 hover:bg-[color-mix(in_oklab,var(--color-vesper-orange)_95%,black)]",
        peppermint:
          "bg-vesper-peppermint text-neutral-950 hover:bg-[color-mix(in_oklab,var(--color-vesper-peppermint)_95%,black)]",
      },
      size: {
        default: "h-11 px-4",
        icon: "size-11",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
)

interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    useRender.ComponentProps<"button"> {}

export function Button({
  render,
  variant,
  size,
  className,
  rounded,
  ...props
}: ButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: cn(buttonVariants({ variant, size, rounded, className })),
  }

  const element = useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(defaultProps, props),
  })

  return element
}
