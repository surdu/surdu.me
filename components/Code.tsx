import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface CodeProps {
  children: string;
  className: string;
}

export default function Code({ children, className }: CodeProps) {
  const language = className?.replace("lang-", "");

  if (language) {
    return (
      <SyntaxHighlighter language={language}>{children}</SyntaxHighlighter>
    );
  } else {
    return <code>{children}</code>;
  }
}
