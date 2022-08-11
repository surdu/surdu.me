import Layout from "~/components/Layout";
import { getAllPosts, getAllTags, Post } from "~/lib/post";

interface BlogPostsByTagProps {
  posts: Post[];
}

export default function BlogPostsByTag({ posts }: BlogPostsByTagProps) {
  return (
    <Layout>
      {posts.map((post) => (
        <div key={post.url}>{post.title}</div>
      ))}
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
  return { props: { posts } };
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
