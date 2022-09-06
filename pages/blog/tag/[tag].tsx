import Head from "next/head";
import BlogEntry from "~/components/BlogEntry/BlogEntry";
import Layout from "~/components/Layout";
import { getAllPosts, getPostsTags, Post } from "~/lib/post";

import styles from "./tag.module.scss";

interface BlogPostsByTagProps {
  posts: Post[];
  tag: string;
}

export default function BlogPostsByTag({ posts, tag }: BlogPostsByTagProps) {
  return (
    <Layout>
      <Head>
        <title>Posts tagged with &quot;{tag}&quot;</title>
      </Head>
      <h1 aria-label={`Posts tagged with hashtag ${tag}`}>
        <span aria-hidden="true">
          Posts tagged with <span className="outlined">#{tag}</span>
        </span>
      </h1>
      <div className={styles.posts}>
        {posts.map((post) => (
          <BlogEntry post={post} key={post.url} showTags={false} />
        ))}
      </div>
    </Layout>
  );
}

interface Params {
  params: {
    tag: string;
  };
}

export async function getStaticProps({ params: { tag } }: Params) {
  const posts = await getAllPosts({ tag });
  return { props: { posts, tag } };
}

export async function getStaticPaths() {
  const tags = await getPostsTags();

  return {
    paths: tags.map((tag) => {
      return {
        params: {
          tag,
        },
      };
    }),
    fallback: false,
  };
}
