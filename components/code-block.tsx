import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";

interface Props extends React.ComponentProps<"div"> {
  children: string;
  lang: BundledLanguage;
  lineNumbers?: boolean;
}

export async function CodeBlock({
  children,
  lang,
  lineNumbers = true,
  ...props
}: Props) {
  const html = await codeToHtml(children, {
    lang,
    theme: "vesper",
  });

  return (
    <div
      {...props}
      data-lang={lang}
      data-line-numbers={lineNumbers}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
