import { CornerDownRight } from "lucide-react"

export function QuestionAnswer({
  title = "Q&A",
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className="border-muted my-16 flex items-start gap-x-8 border-y py-16">
      <h2
        className="text-muted mt-1 rotate-180 text-xl leading-none uppercase [writing-mode:vertical-lr] md:text-3xl"
        style={{
          fontStretch: "200%",
          fontWeight: 900,
        }}
      >
        {title}
      </h2>
      <div>{children}</div>
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
    <>
      <h3 className="font-medium not-first-of-type:mt-8">{title}</h3>
      <div className="text-muted-foreground mt-2 flex gap-x-2">
        <CornerDownRight className="flex h-lh w-4 flex-none items-center" />
        <div className="prose">{children}</div>
      </div>
    </>
  )
}
