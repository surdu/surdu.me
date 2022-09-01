import projects from "~/_content/projects";

export interface Project {
  title: string;
  description: string;
  year: number;
  sourceUrl: string;
  demoUrl?: string;
  relatedPosts: string[];
  tags: string[];
}

interface ProjectsFilter {
  tag?: string;
}

export function getAllProjects(filter?: ProjectsFilter) {
  const allProjects = projects
    .sort((a, b) => b.year - a.year)
    .filter((project) => {
      if (filter?.tag) {
        return project.tags.includes(filter.tag);
      }

      return true;
    });

  return allProjects;
}

export function getProjectsTags() {
  const tags = new Set<string>();

  projects.forEach((project) => project.tags.forEach((tag) => tags.add(tag)));

  return Array.from(tags);
}
