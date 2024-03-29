import Link from "next/link";
import clsx from "clsx";

import styles from "./BlogEntry.module.scss";

import { Post } from "~/lib/post";
import Tag from "~/components/Tag";

interface PostProps {
	post: Post;
	className?: string;
	showTags?: boolean;
}

export default function BlogEntry(props: PostProps) {
	const { post, className, showTags = true } = props;

	const rawDate = new Date(post.date);
	const date = new Intl.DateTimeFormat("en-uk", {
		dateStyle: "medium",
	}).format(rawDate);
	const datetime = rawDate.toISOString().split("T")[0];

	return (
		<div className={clsx(styles.post, className)}>
			<Link href={`/${post.url}`} className={styles.title}>
				<h2>{post.title}</h2>
			</Link>
			<time
				className={styles.date}
				dateTime={datetime}
				aria-label="Publish date"
			>
				{date}
			</time>
			<div className={styles.synopsis}>{post.synopsis}</div>
			{showTags && (
				<div className={styles.tags}>
					{post.tags.map((tag) => (
						<Link href={`/blog/tag/${tag}`} key={tag}>
							<Tag>{tag}</Tag>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
