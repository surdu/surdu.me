import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_content/posts");

export interface Post {
  title: string;
  url: string;
  date: number;
  markdown: string;
  synopsis: string;
  featured: boolean;
  tags: string[];
}

export function getPost(filename: string): Post {
  const fullPath = join(postsDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const fileParts = filename.split(".").slice(0, -1).join(".").split("-");
  const dateParts = fileParts.slice(0, 3);
  const date = Date.parse(dateParts.join("-"));
  const url = `${dateParts.join("/")}/${fileParts.slice(3).join("-")}.html`;

  const synopsis = content.trim().split("\n")[0];

  return {
    title: data.title,
    url,
    date,
    markdown: content,
    synopsis,
    featured: data.featured || false,
    tags: data.tags || [],
  };
}

interface PostsFilter {
  excludeFeatured?: boolean;
  tag?: string;
}

const defaultFilters: PostsFilter = {
  excludeFeatured: false,
};

export function getAllPosts(userFilters?: PostsFilter) {
  const filters = {
    ...defaultFilters,
    ...userFilters,
  };

  const files = fs.readdirSync(postsDirectory);
  const posts: Post[] = [];

  for (let f = 0; f < files.length; f++) {
    const filename = files[f];
    const post = getPost(filename);

    if (filters.excludeFeatured && post.featured) {
      continue;
    }

    if (filters.tag && !post.tags.includes(filters.tag)) {
      continue;
    }

    posts.push(post);
  }

  posts.sort((a, b) => b.date - a.date);

  return posts;
}

export interface PostParams {
  year: string;
  month: string;
  day: string;
  page: string;
}

export function getPostByParams(params: PostParams) {
  const { year, month, day } = params;
  const page = params.page.split(".")[0];

  const filename = `${year}-${month}-${day}-${page}.md`;

  return getPost(filename);
}

export function getPostsTags() {
  const posts = getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags);
}
