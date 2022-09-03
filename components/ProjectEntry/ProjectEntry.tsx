import Link from "next/link";
import { Project } from "~/lib/project";

import styles from "./ProjectEntry.module.scss";

interface ProjectEntryProps {
  project: Project;
}

export default function ProjectEntry({ project }: ProjectEntryProps) {
  return (
    <div className={styles.project}>
      <Link href={project.sourceUrl}>
        <a className={styles.title}>
          <h2>{project.title}</h2>
        </a>
      </Link>
      <div className={styles.year}>{project.year}</div>
      <div className={styles.description}>{project.description}</div>
      <div className={styles.tags}>
        {project.tags.map((tag) => (
          <Link href={`/projects/tag/${tag}`} key={tag}>
            <a aria-label={`${tag} tag`}>#{tag}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}
