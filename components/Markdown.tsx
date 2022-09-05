import MarkdownJSX from "markdown-to-jsx";
import Code from "~/components/Code/Code";
import CodePen from "~/components/CodePen";
import LinkedHeading from "~/components/LinkedHeading/LinkedHeading";
import Note from "~/components/Note/Note";

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <MarkdownJSX
      options={{
        overrides: {
          code: Code,
          codepen: CodePen,
          note: Note,
          danger: {
            component: Note,
            props: { type: "danger" },
          },
          quote: {
            component: Note,
            props: { type: "quote" },
          },
          h2: LinkedHeading,
        },
      }}
    >
      {children}
    </MarkdownJSX>
  );
}
