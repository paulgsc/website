import type { CSSProperties, FC, HTMLProps, JSX } from "react"
import rangeParser from "parse-numeric-range"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"

type MarkdownProps = {
  markdown: string & { content?: string }
}

type ExtraProps = {
  node: {
    data: { meta?: string }
  }
}

// Extend the HTMLProps type to include the custom data-highlight attribute
type CustomHTMLProps = {
  "data-highlight"?: string
} & HTMLProps<HTMLElement>

const Markdown: FC<MarkdownProps> = ({ markdown }) => {
  const syntaxTheme: { [key: string]: CSSProperties } = { dracula }

  const MarkdownComponents: object = {
    code({
      node,
      className,
      children,
      ...props
    }: JSX.IntrinsicElements["code"] & ExtraProps) {
      const hasLang = /language-(\w+)/.exec(className || "")
      const hasMeta = node?.data?.meta

      const applyHighlights = (applyHighlights: number): CustomHTMLProps => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/
          const metadata = node.data.meta?.replace(/\s/g, "") ?? ""
          const strlineNumbers = RE.test(metadata)
            ? (RE.exec(metadata)?.at(1) ?? "")
            : "0"
          const highlightLines = rangeParser(strlineNumbers)
          const data = highlightLines.includes(applyHighlights)
            ? "highlight"
            : undefined
          return { "data-highlight": data }
        } else {
          return {}
        }
      }

      return hasLang ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={hasLang[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={!!hasMeta}
          useInlineStyles={true}
          lineProps={applyHighlights}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
  }

  return (
    <ReactMarkdown className="inline-block" components={MarkdownComponents}>
      {markdown.content || markdown}
    </ReactMarkdown>
  )
}

export default Markdown
