import Head from "next/head";
import { useRouter } from "next/router";
import { Post } from "~/lib/post";
import config from "~/lib/config";

const DEFAULT_META = {
  title: "Nicu Surdu",
  description: "Personal website of Surdu Nicolae",
};

interface MetaProps {
  title?: string;
  description?: string;
  post?: Post;
}

export default function Meta(props: MetaProps) {
  const { title, description, post } = { ...DEFAULT_META, ...props };

  const router = useRouter();

  return (
    <Head>
      <meta
        content="width=device-width,initial-scale=1,viewport-fit=cover"
        name="viewport"
      />

      <title>{title}</title>
      <meta name="description" content={description} key="desc" />
      <meta name="author" content="Nicu Surdu" />

      {/* Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} key="fbDesc" />
      <meta
        property="og:url"
        content={`https://${config.domain}${router.asPath}`}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@surdume" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} key="twDesc" />
      <meta name="twitter:alt" content={title} />

      {/* Post */}
      {post && (
        <>
          <meta property="og:type" content="article" />

          <meta name="description" content={post.synopsis} key="desc" />
          <meta
            property="og:description"
            content={post.synopsis}
            key="fbDesc"
          />
          <meta
            name="twitter:description"
            content={post.synopsis}
            key="twDesc"
          />

          <meta
            name="twitter:image"
            content={`https://${config.domain}/post-covers/${post.slug}.png`}
          />
          <meta
            property="og:image"
            content={`https://${config.domain}/post-covers/${post.slug}.png`}
            key="fbDesc"
          />

          {/* TODO: <meta property="og:image" content="article" /> */}
        </>
      )}

      {/* TODO: make this dynamic */}
      <meta name="theme-color" content="#fff" />

      {/* Favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
    </Head>
  );
}
