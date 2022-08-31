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

export function getAllProjects() {
  return projects;
}
