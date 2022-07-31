import Layout from "~/components/Layout";
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
            <a href={post.url}>{post.title}</a>
          </h2>
        </div>
      ))}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const posts = await getAllPosts();

  return {
    props: { posts },
  };
};
