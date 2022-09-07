import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

import Social from "~/components/Layout/Header/Social/Social";

import styles from "./Menu.module.scss";

enum Page {
  BLOG,
  PROJECTS,
  ABOUT,
}

interface MenuProps {
  open: boolean;
}

export default function Menu(props: MenuProps) {
  const { open } = props;
  const router = useRouter();

  const activeItem = getActiveMenuItem(router.pathname);

  return (
    <nav
      className={clsx(styles.nav, { [styles.open]: open })}
      aria-label="Main menu"
    >
      <div className={styles.wrap}>
        <ul>
          <li>
            <Link href="/blog">
              <a
                className={clsx("outlined", {
                  [styles.active]: activeItem === Page.BLOG,
                })}
                aria-label="Blog"
                tabIndex={0}
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
                aria-label="Projects"
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
                aria-label="About"
              >
                <MenuText>About</MenuText>
              </a>
            </Link>
          </li>
        </ul>
        <div className={styles.social}>
          <Social />
        </div>
      </div>
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
