import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { clsx } from "clsx";

import styles from "./Code.module.scss";

interface CodeProps {
  children: string;
  className: string;
}

export default function Code({ children, className }: CodeProps) {
  const language = className?.replace("lang-", "");

  if (language) {
    return (
      <SyntaxHighlighter
        language={language}
        className={clsx(`language-${language}`, styles.code)}
        useInlineStyles={false}
        codeTagProps={{ style: {} }}
      >
        {children}
      </SyntaxHighlighter>
    );
  } else {
    return <code className={styles.inlineCode}>{children}</code>;
  }
}
