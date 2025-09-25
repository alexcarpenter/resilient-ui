import { useRender } from "@base-ui-components/react/use-render"
import { mergeProps } from "@base-ui-components/react/merge-props"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva("inline-flex items-center gap-x-2", {
  variants: {
    variant: {
      default: "bg-red-500",
    },
    size: {
      default: "h-10 px-4 py-2",
      icon: "size-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    useRender.ComponentProps<"button"> {}

export function Button({
  render,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: cn(buttonVariants({ variant, size, className })),
  }

  const element = useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(defaultProps, props),
  })

  return element
}
