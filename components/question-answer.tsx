import { CornerDownRight } from "lucide-react"

export function QuestionAnswer({
  title = "Q&A",
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className="border-muted my-16 flex flex-row-reverse items-start gap-x-8 border-y py-16">
      <h2
        className="text-vesper-orange text-3xl uppercase [writing-mode:vertical-lr]"
        style={{
          fontStretch: "200%",
          fontWeight: 100,
        }}
      >
        {title}
      </h2>
      <div className="flex flex-col gap-y-8">{children}</div>
    </div>
  )
}

export function QuestionAnswerItem({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="font-medium">{title}</h3>
      <div className="mt-2 flex gap-x-2">
        <CornerDownRight className="text-muted-foreground flex h-lh w-4 flex-none items-center" />
        {children}
      </div>
    </div>
  )
}
