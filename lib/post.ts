import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { createCanvas, loadImage, registerFont } from "canvas";
import drawMultilineText from "canvas-multiline-text";
import { stripMarkdown } from "~/lib/utils";

const postsDirectory = join(process.cwd(), "_content/posts");

export interface Post {
  title: string;
  url: string;
  slug: string;
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
  const slug = fileParts.slice(3).join("-");
  const url = `${dateParts.join("/")}/${slug}.html`;

  const synopsis = stripMarkdown(content.trim().split("\n")[0]);

  return {
    title: data.title,
    url,
    slug,
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

export function generatePostCover(post: Post) {
  return new Promise(async (resolve) => {
    const size = { width: 2400, height: 1260 };

    registerFont("lib/resources/rubik.ttf", {
      family: "Rubik",
    });

    const avatar = await loadImage("lib/resources/avatar.png");
    const logo = await loadImage("lib/resources/logo.png");

    const canvas = createCanvas(size.width, size.height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#22272E";
    ctx.fillRect(0, 0, size.width, size.height);

    ctx.font = '100px "Rubik"';
    ctx.fillStyle = "#ADBAC6";
    drawMultilineText(ctx, post.title, {
      rect: {
        x: 100,
        y: 200,
        width: 1800,
        height: 600,
      },
      font: "Rubik",
      minFontSize: 100,
      maxFontSize: 100,
    });

    ctx.font = '70px "Rubik"';
    ctx.fillText("Surdu Nicolae", 400, 1015);

    ctx.font = '50px "Rubik"';
    ctx.fillText("www.surdu.me", 400, 1100);

    ctx.drawImage(avatar, 100, 917, 250, 250);
    ctx.drawImage(logo, 1800, 1000, 500, 100);

    const stream = canvas.createPNGStream();
    const imagesFolder = join(process.cwd(), "public/post-covers");
    const out = fs.createWriteStream(join(imagesFolder, `/${post.slug}.png`));
    stream.pipe(out);
    out.on("finish", resolve);
  });
}
