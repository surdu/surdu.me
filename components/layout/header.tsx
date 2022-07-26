import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <img src="/logo.gif" alt="Logo" className={styles.logo} />
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li>
            <a href="/Projects">Projects</a>
          </li>
          <li>
            <a href="/Projects">About</a>
          </li>
        </ul>
      </nav>
      <div className={styles.toggleWrap}>
        <ThemeToggle />
      </div>
    </header>
  );
}
