import Layout from "~/components/Layout/Layout";
import Meta from "~/components/Meta";
import ProjectEntry from "~/components/ProjectEntry/ProjectEntry";
import { getAllProjects, getProjectsTags, Project } from "~/lib/project";

import styles from "./Tag.module.scss";

interface ProjectsByTagProps {
  projects: Project[];
  tag: string;
}

export default function ProjectsByTag({ projects, tag }: ProjectsByTagProps) {
  return (
    <Layout>
      <Meta title={`Projects tagged with "${tag}"`} />

      <h1 aria-label={`Projects tagged with hashtag ${tag}`}>
        <span aria-hidden="true">
          Projects tagged with <span className="outlined">#{tag}</span>
        </span>
      </h1>
      <div className={styles.projects}>
        {projects.map((project, index) => (
          <ProjectEntry project={project} key={index} showTags={false} />
        ))}
      </div>
    </Layout>
  );
}

interface Params {
  params: {
    tag: string;
  };
}

export async function getStaticProps({ params: { tag } }: Params) {
  const projects = await getAllProjects({ tag });
  return { props: { projects, tag } };
}

export async function getStaticPaths() {
  const tags = await getProjectsTags();

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
