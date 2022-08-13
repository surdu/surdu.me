import Link from "next/link";
import clsx from "clsx";

import styles from "./blog.module.scss";

import Layout from "~/components/Layout";
import { getAllPosts, Post } from "~/lib/post";
import Markdown from "~/components/Markdown";

interface BlogProps {
  posts: Post[];
  featuredPost: Post;
}

export default function Blog({ posts, featuredPost }: BlogProps) {
  return (
    <Layout>
      {featuredPost && (
        <>
          <h1 className={styles.pageTitle}>Blog</h1>
          <div>
            <h2 className={styles.pageSubtitle}>Featured post</h2>
            <Post post={featuredPost} className={styles.featured} />
          </div>

          <hr className={styles.hr} />
        </>
      )}

      <div className={styles.posts}>
        {posts.map((post) => (
          <Post key={post.url} post={post} />
        ))}
      </div>
    </Layout>
  );
}

interface PostProps {
  post: Post;
  className?: string;
}

function Post(props: PostProps) {
  const { post, className } = props;

  const date = new Intl.DateTimeFormat("en-uk", {
    dateStyle: "medium",
  }).format(new Date(post.date));

  return (
    <div className={clsx(styles.post, className)}>
      <Link href={post.url}>
        <a className={styles.title}>
          <h2>{post.title}</h2>
        </a>
      </Link>
      <div className={styles.date}>{date}</div>
      <div className={styles.synopsis}>
        <Markdown>{post.synopsis}</Markdown>
      </div>
      <div className={styles.tags}>
        {post.tags.map((tag) => (
          <Link href={`/blog/tag/${tag}`} key={tag}>
            <a>#{tag}</a>
          </Link>
        ))}
      </div>
    </div>
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
