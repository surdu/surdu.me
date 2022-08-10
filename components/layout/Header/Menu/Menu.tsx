import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

import styles from "./Menu.module.scss";

enum Page {
  BLOG,
  PROJECTS,
  ABOUT,
}

export default function Menu() {
  const router = useRouter();

  const activeItem = getActiveMenuItem(router.pathname);

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/blog">
            <a className={clsx({ [styles.active]: activeItem === Page.BLOG })}>
              Blog
            </a>
          </Link>
        </li>
        <li>
          <Link href="/projects">
            <a
              className={clsx({
                [styles.active]: activeItem === Page.PROJECTS,
              })}
            >
              Projects
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className={clsx({ [styles.active]: activeItem === Page.ABOUT })}>
              About
            </a>
          </Link>
        </li>
      </ul>
    </nav>
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
