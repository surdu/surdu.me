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
}

export async function getPost(filename: string): Promise<Post> {
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
  };
}

export async function getAllPosts() {
  const files = fs.readdirSync(postsDirectory);
  const posts: Post[] = [];

  for (let f = 0; f < files.length; f++) {
    const filename = files[f];
    posts.push(await getPost(filename));
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

export async function getPostByParams(params: PostParams) {
  const { year, month, day } = params;
  const page = params.page.split(".")[0];

  const filename = `${year}-${month}-${day}-${page}.md`;

  return getPost(filename);
}
