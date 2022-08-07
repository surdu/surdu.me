import Link from "next/link";
import Layout from "~/components/Layout";
import Markdown from "~/components/Markdown";
import { getAllPosts, Post } from "~/lib/post";

interface BlogProps {
  posts: Post[];
}

export default function Blog({ posts }: BlogProps) {
  return (
    <Layout>
      {posts.map((post) => (
        <div key={post.url}>
          <h2>
            <Link href={post.url}>
              <a>{post.title}</a>
            </Link>
          </h2>
          <p>
            <Markdown>{post.synopsis}</Markdown>
          </p>
        </div>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: { posts },
  };
}
