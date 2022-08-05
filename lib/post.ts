import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_content/posts");

export interface Post {
  title: string;
  url: string;
  markdown: string;
  date: number;
}

export async function getPost(filename: string): Promise<Post> {
  const fullPath = join(postsDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const fileParts = filename.split(".").slice(0, -1).join(".").split("-");
  const dateParts = fileParts.slice(0, 3);
  const postDate = Date.parse(dateParts.join("-"));
  const postUrl = `${dateParts.join("/")}/${fileParts.slice(3).join("-")}.html`;

  return {
    title: data.title,
    markdown: content,
    url: postUrl,
    date: postDate,
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
