import { useRender } from "@base-ui-components/react/use-render"
import { mergeProps } from "@base-ui-components/react/merge-props"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-x-2 text-sm [font-weight:425] [&_svg]:size-4",
  {
    variants: {
      variant: {
        default: "bg-neutral-800 text-neutral-50",
        secondary: "bg-neutral-50 text-neutral-950",
        orange: "bg-vesper-orange text-neutral-950",
        peppermint: "bg-vesper-peppermint text-neutral-950",
      },
      size: {
        default: "h-10 px-4 py-2",
        icon: "size-10",
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
