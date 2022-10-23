import { useEffect, useRef, useState } from "react";

import Layout from "~/components/Layout/Layout";
import {
	generatePostCover,
	getAllPosts,
	getPostByParams,
	Post,
	PostParams,
} from "~/lib/post";
import Markdown from "~/components/Markdown";
import Comments from "~/components/Comments";
import BackToTop from "~/components/BackToTop/BackToTop";
import Meta from "~/components/Meta";

import styles from "./BlogPage.module.scss";
import TweetButton from "~/components/TweetButton/TweetButton";
import config from "~/lib/config";
import Link from "next/link";
import Tag from "~/components/Tag";

interface BlogPostsProps {
	post: Post;
}

export default function BlogPosts({ post }: BlogPostsProps) {
	const articleRef = useRef<HTMLDivElement>(null);
	const [progress, setProgress] = useState(0);

	const rawDate = new Date(post.date);
	const date = new Intl.DateTimeFormat("en-uk", { dateStyle: "medium" }).format(
		rawDate
	);
	const datetime = rawDate.toISOString().split("T")[0];

	useEffect(function () {
		function handleScroll() {
			const articleRect = articleRef.current?.getBoundingClientRect();
			const articleBottom =
				articleRect?.bottom! + window.scrollY - window.innerHeight;
			const progress = Math.min((window.scrollY * 100) / articleBottom, 100);
			setProgress(progress);
		}

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<Layout progress={progress}>
			<Meta title={post.title} post={post} />

			<h1 className={styles.title}>{post.title}</h1>
			<time
				className={styles.date}
				dateTime={datetime}
				aria-label="Publish date"
			>
				{date}
			</time>
			<div className={styles.article} ref={articleRef}>
				<Markdown>{post.markdown}</Markdown>
			</div>
			<div className={styles.shareBar}>
				<TweetButton
					text={`I just read "${post.title}" by @surdume`}
					url={`https://${config.domain}/${post.url}`}
				>
					Tweet this article
				</TweetButton>
			</div>
			<div className={styles.tags}>
				Post tagged with:
				{post.tags.map((tag) => (
					<Link href={`/blog/tag/${tag}`} key={tag}>
						<a>
							<Tag>{tag}</Tag>
						</a>
					</Link>
				))}
			</div>
			<div className={styles.comments}>
				<Comments post={post} />
			</div>
			<BackToTop />
		</Layout>
	);
}

interface Params {
	params: PostParams;
}

export async function getStaticProps({ params }: Params) {
	const post = getPostByParams(params);
	await generatePostCover(post);
	return { props: { post } };
}

export function getStaticPaths() {
	const posts = getAllPosts({ includeDrafts: true });

	return {
		paths: posts.map((post) => {
			const [year, month, day, page] = post.url.split("/");

			return {
				params: {
					year,
					month,
					day,
					page,
				},
			};
		}),
		fallback: false,
	};
}
