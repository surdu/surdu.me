import { compiler } from "markdown-to-jsx";
import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export function stripMarkdown(text: string) {
  return renderToStaticMarkup(
    compiler(text, {
      createElement(type, props, children) {
        return createElement(Fragment, {}, children);
      },
    })
  )
    .replace(/<[^>]*>?/gm, "")
    .replace(/&#x27;/gm, "'");
}
