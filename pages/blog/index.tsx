import Layout from "~/components/Layout";
import { getAllPosts, Post } from "~/lib/post";
import BlogEntry from "~/components/BlogEntry/BlogEntry";

import styles from "./Blog.module.scss";
import Head from "next/head";

interface BlogProps {
  posts: Post[];
  featuredPost: Post;
}

export default function Blog({ posts, featuredPost }: BlogProps) {
  return (
    <Layout>
      <Head>
        <title>The Surdu Blog</title>
      </Head>

      <h1 className={styles.pageTitle}>Blog</h1>

      {featuredPost && (
        <>
          <div>
            <h2 className={styles.pageSubtitle}>Featured post</h2>
            <BlogEntry post={featuredPost} className={styles.featured} />
          </div>

          <hr className={styles.hr} />
        </>
      )}

      <div className={styles.posts}>
        {posts.map((post) => (
          <BlogEntry key={post.url} post={post} />
        ))}
      </div>
    </Layout>
  );
}

export function getStaticProps() {
  const allPosts = getAllPosts();
  const posts: Post[] = [];
  let featuredPost!: Post;

  allPosts.forEach((post) => {
    if (post.featured) {
      if (featuredPost) {
        throw new Error(
          `Multiple featured posts found: '${featuredPost.url}' and '${post.url}' `
        );
      }

      featuredPost = post;
    } else {
      posts.push(post);
    }
  });

  return {
    props: { posts, featuredPost },
  };
}
