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
            <a
              className={clsx("outlined", {
                [styles.active]: activeItem === Page.BLOG,
              })}
            >
              <MenuText>Blog</MenuText>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/projects">
            <a
              className={clsx("outlined", {
                [styles.active]: activeItem === Page.PROJECTS,
              })}
            >
              <MenuText>Projects</MenuText>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a
              className={clsx("outlined", {
                [styles.active]: activeItem === Page.ABOUT,
              })}
            >
              <MenuText>About</MenuText>
            </a>
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
        <span key={index}>{letter}</span>
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
