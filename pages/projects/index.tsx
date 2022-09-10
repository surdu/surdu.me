import Head from "next/head";
import Layout from "~/components/Layout/Layout";
import Meta from "~/components/Meta";
import ProjectEntry from "~/components/ProjectEntry/ProjectEntry";
import { getAllProjects, Project } from "~/lib/project";

import styles from "./Projects.module.scss";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects(props: ProjectsProps) {
  const { projects } = props;

  return (
    <Layout>
      <Meta title="Projects by Nicu Surdu" />

      <h1 className={styles.pageTitle}>My Projects</h1>

      <div className={styles.projects}>
        {projects.map((project, index) => (
          <ProjectEntry project={project} key={index} />
        ))}
      </div>
    </Layout>
  );
}

export function getStaticProps() {
  return { props: { projects: getAllProjects() } };
}
