import styles from "./BlogPage.module.scss";

import Layout from "~/components/Layout";
import { getAllPosts, getPostByParams, Post, PostParams } from "~/lib/post";
import Markdown from "~/components/Markdown";

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  const date = new Intl.DateTimeFormat("en-uk", { dateStyle: "medium" }).format(
    new Date(post.date)
  );
  return (
    <Layout>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.date}>{date}</div>
      <article className={styles.article}>
        <Markdown>{post.markdown}</Markdown>
      </article>
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
