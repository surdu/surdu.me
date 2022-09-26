import Layout from "~/components/Layout/Layout";
import { generateRssFeed, getAllPosts, Post } from "~/lib/post";
import BlogEntry from "~/components/BlogEntry/BlogEntry";
import Meta from "~/components/Meta";

import styles from "./Blog.module.scss";

interface BlogProps {
	posts: Post[];
	featuredPost: Post;
}

export default function Blog({ posts, featuredPost }: BlogProps) {
	return (
		<Layout>
			<Meta title="Nicu Surdu's blog posts" />

			<h1 className={styles.pageTitle}>Blog</h1>

			{featuredPost && (
				<>
					<div>
						<h2 className={styles.pageSubtitle}>Featured post</h2>
						<BlogEntry post={featuredPost} className={styles.featured} />
					</div>

					<hr className={styles.hr} />
				</>
			)}

			<div className={styles.posts}>
				{posts.map((post) => (
					<BlogEntry key={post.url} post={post} />
				))}
			</div>
		</Layout>
	);
}

export function getStaticProps() {
	const allPosts = getAllPosts();
	const posts: Post[] = [];
	let featuredPost!: Post;

	allPosts.forEach((post) => {
		if (post.featured) {
			if (featuredPost) {
				throw new Error(
					`Multiple featured posts found: '${featuredPost.url}' and '${post.url}' `
				);
			}

			featuredPost = post;
		} else {
			posts.push(post);
		}
	});

	generateRssFeed();

	return {
		props: { posts, featuredPost },
	};
}
