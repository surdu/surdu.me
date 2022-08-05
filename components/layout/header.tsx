import Link from "next/link";

import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <img src="/logo.gif" alt="Logo" className={styles.logo} />
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/projects">
              <a>Projects</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.toggleWrap}>
        Twitter | RSS
        <ThemeToggle />
      </div>
    </header>
  );
}
