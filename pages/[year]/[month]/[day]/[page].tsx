import Head from "next/head";

import styles from "./BlogPage.module.scss";

import Layout from "~/components/Layout";
import { getAllPosts, getPostByParams, Post, PostParams } from "~/lib/post";
import Markdown from "~/components/Markdown";
import Comments from "~/components/Comments";
import BackToTop from "~/components/BackToTop/BackToTop";

interface BlogPostsProps {
  post: Post;
}

export default function BlogPosts({ post }: BlogPostsProps) {
  const rawDate = new Date(post.date);
  const date = new Intl.DateTimeFormat("en-uk", { dateStyle: "medium" }).format(
    rawDate
  );
  const datetime = rawDate.toISOString().split("T")[0];
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1 className={styles.title}>{post.title}</h1>
      <time className={styles.date} dateTime={datetime}>
        {date}
      </time>
      <article className={styles.article}>
        <Markdown>{post.markdown}</Markdown>
      </article>
      <div className={styles.comments}>
        <Comments post={post} />
      </div>
      <BackToTop />
    </Layout>
  );
}

interface Params {
  params: PostParams;
}

export async function getStaticProps({ params }: Params) {
  const post = await getPostByParams(params);
  return { props: { post } };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();

  return {
    paths: posts.map((post) => {
      const [year, month, day, page] = post.url.split("/");

      return {
        params: {
          year,
          month,
          day,
          page,
        },
      };
    }),
    fallback: false,
  };
}
