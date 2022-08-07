import Script from "next/script";

interface CodepenProps {
  slug: string;
  height: number;
  version: number;
}

export default function CodePen(props: CodepenProps) {
  const { slug, height, version } = props;
  return (
    <>
      <p
        data-height={height}
        data-theme-id="dark"
        data-slug-hash={slug}
        data-default-tab="css,result"
        data-user="surdu"
        data-embed-version={version}
        className="codepen"
      ></p>
      <Script src="https://production-assets.codepen.io/assets/embed/ei.js"></Script>
    </>
  );
}
