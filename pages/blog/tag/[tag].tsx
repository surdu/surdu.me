import Layout from "~/components/Layout";
import { getAllPosts, getAllTags, Post } from "~/lib/post";

interface BlogPostsByTagProps {
  posts: Post[];
  tag: string;
}

export default function BlogPostsByTag({ posts, tag }: BlogPostsByTagProps) {
  return (
    <Layout>
      <h1>{tag} posts</h1>
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
