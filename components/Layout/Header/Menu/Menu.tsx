import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

import styles from "./Menu.module.scss";

enum Page {
	BLOG,
	PROJECTS,
	ABOUT,
}

interface MenuProps {
	className?: string;
}

export default function Menu(props: MenuProps) {
	const { className } = props;
	const router = useRouter();

	const activeItem = getActiveMenuItem(router.pathname);

	return (
		<nav className={clsx(styles.nav, className)} aria-label="Main menu">
			<ul>
				<li>
					<Link
						href="/blog"
						className={clsx("outlined", {
							[styles.active]: activeItem === Page.BLOG,
						})}
						aria-label="Blog"
						tabIndex={0}
					>
						<MenuText>Blog</MenuText>
					</Link>
				</li>
				<li>
					<Link
						href="/projects"
						className={clsx("outlined", {
							[styles.active]: activeItem === Page.PROJECTS,
						})}
						aria-label="Projects"
					>
						<MenuText>Projects</MenuText>
					</Link>
				</li>
				<li>
					<Link
						href="/about"
						className={clsx("outlined", {
							[styles.active]: activeItem === Page.ABOUT,
						})}
						aria-label="About"
					>
						<MenuText>About</MenuText>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

function MenuText({ children }: { children: string }) {
	return (
		<>
			{children.split("").map((letter, index) => (
				<span key={index} aria-hidden="true">
					{letter}
				</span>
			))}
		</>
	);
}

function getActiveMenuItem(path: string) {
	const pathStart = path.split("/")[1];

	switch (pathStart) {
		case "[year]":
		case "blog":
			return Page.BLOG;
		case "projects":
			return Page.PROJECTS;
		case "about":
			return Page.ABOUT;
	}
}
