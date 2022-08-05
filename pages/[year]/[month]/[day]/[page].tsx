import Layout from "~/components/Layout";
import Markdown from "markdown-to-jsx";
import { getAllPosts, getPostByParams, Post, PostParams } from "~/lib/post";
import Warning from "~/components/Warning";
import Code from "~/components/Code";

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  const date = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(
    new Date(post.date)
  );
  return (
    <Layout>
      <h1>{post.title}</h1>
      <div>Published {date}</div>
      <Markdown
        options={{
          overrides: {
            warn: Warning,
            code: Code,
          },
        }}
      >
        {post.markdown}
      </Markdown>
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
