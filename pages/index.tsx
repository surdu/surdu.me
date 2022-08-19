import BlogEntry from "~/components/BlogEntry/BlogEntry";
import Layout from "~/components/Layout";
import { getAllPosts, Post } from "~/lib/post";

interface HomeProps {
  latestPost: Post;
}

export default function Home(props: HomeProps) {
  const { latestPost } = props;

  return (
    <Layout>
      <div>
        <h2>Latest blog post</h2>
        <BlogEntry post={latestPost} />
      </div>
    </Layout>
  );
}

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: { latestPost: allPosts[0] },
  };
}
