import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { createCanvas, loadImage, registerFont } from "canvas";
import drawMultilineText from "canvas-multiline-text";
import { stripMarkdown } from "~/lib/utils";
import config from "~/lib/config";
import { Feed } from "feed";

const postsDirectory = join(process.cwd(), "_content/posts");

export interface Post {
	title: string;
	url: string;
	slug: string;
	date: number;
	draft: boolean;
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
		draft: data.draft || false,
		markdown: content,
		synopsis: data.synopsis || synopsis,
		featured: data.featured || false,
		tags: data.tags || [],
	};
}

interface PostsFilter {
	excludeFeatured?: boolean;
	tag?: string;
	includeDrafts?: boolean;
}

const defaultFilters: PostsFilter = {
	excludeFeatured: false,
	includeDrafts: false,
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

		if (!filters.includeDrafts && post.draft) {
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

		ctx.font = '150px "Rubik"';
		ctx.fillStyle = "#ADBAC6";
		//@ts-expect-error The type for ctx is out of sync with ctx from canvas lib after canvas upgrade
		drawMultilineText(ctx, post.title, {
			rect: {
				x: 100,
				y: 200,
				width: 1800,
				height: 600,
			},
			font: "Rubik",
			minFontSize: 150,
			maxFontSize: 150,
		});

		ctx.font = '70px "Rubik"';
		ctx.fillText("Nicu Surdu", 400, 1015);

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

export function generateRssFeed() {
	const posts = getAllPosts();

	const date = new Date();
	const author = {
		name: "Nicu Surdu",
		email: config.email,
		link: "https://twitter.com/surdume",
	};
	const siteURL = `https://${config.domain}`;

	const feed = new Feed({
		title: "Nicu Surdu's blog",
		description: "Personal blog of Nicu Surdu",
		id: siteURL,
		link: siteURL,
		image: `${siteURL}/favicon/android-chrome-256x256.png`,
		favicon: `${siteURL}/favicon/favicon.ico`,
		copyright: `© ${date.getFullYear()} Nicu Surdu`,
		updated: date,
		generator: "Feed for Node.js",
		feedLinks: {
			rss2: `${siteURL}/rss/feed.xml`,
		},
		author,
	});

	posts.forEach((post) => {
		const url = `${siteURL}/${post.url}`;

		feed.addItem({
			title: post.title,
			id: url,
			link: url,
			image: `${siteURL}/post-covers/${post.slug}.png`,
			description: post.synopsis,
			date: new Date(post.date),
		});
	});

	fs.mkdirSync("./public/rss", { recursive: true });
	fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
}
