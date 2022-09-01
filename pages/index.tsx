import BlogEntry from "~/components/BlogEntry/BlogEntry";
import Layout from "~/components/Layout";
import ProjectEntry from "~/components/ProjectEntry/ProjectEntry";
import { getAllPosts, Post } from "~/lib/post";
import { getAllProjects, Project } from "~/lib/project";

import styles from "./Home.module.scss";

interface HomeProps {
  latestPost: Post;
  latestProjects: Project[];
}

export default function Home(props: HomeProps) {
  const { latestPost, latestProjects } = props;

  return (
    <Layout>
      <div>
        <h2>Latest Blog Post</h2>
        <BlogEntry post={latestPost} />
      </div>
      <div>
        <h2>My Latest Projects</h2>
        <div className={styles.projects}>
          {latestProjects.map((project, index) => (
            <ProjectEntry key={index} project={project} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export function getStaticProps() {
  const allPosts = getAllPosts();
  const allProjects = getAllProjects();

  return {
    props: { latestPost: allPosts[0], latestProjects: allProjects.slice(0, 2) },
  };
}
