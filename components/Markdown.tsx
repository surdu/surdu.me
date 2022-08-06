import MarkdownJSX from "markdown-to-jsx";
import Code from "~/components/Code";
import Warning from "~/components/Warning";

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <MarkdownJSX
      options={{
        overrides: {
          warn: Warning,
          code: Code,
        },
      }}
    >
      {children}
    </MarkdownJSX>
  );
}
