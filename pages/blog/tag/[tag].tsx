import BlogEntry from "~/components/BlogEntry/BlogEntry";
import Layout from "~/components/Layout";
import { getAllPosts, getAllTags, Post } from "~/lib/post";

import styles from "./tag.module.scss";

interface BlogPostsByTagProps {
  posts: Post[];
  tag: string;
}

export default function BlogPostsByTag({ posts, tag }: BlogPostsByTagProps) {
  return (
    <Layout>
      <h1>
        Posts tagged with <span className="outlined">#{tag}</span>
      </h1>
      <div className={styles.posts}>
        {posts.map((post) => (
          <BlogEntry post={post} key={post.url} />
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
  const tags = await getAllTags();

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
