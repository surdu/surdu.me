import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";
import Menu from "~/components/Layout/Header/Menu";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <img src="/logo.gif" alt="Logo" />
          </a>
        </Link>
      </div>
      <Menu />
      <div className={styles.rightWrap}>
        <Link href="https://github.com/surdu">
          <a>
            <FontAwesomeIcon icon={faGithub} className={styles.socialIcon} />
          </a>
        </Link>
        <Link href="https://twitter.com/surdume">
          <a>
            <FontAwesomeIcon icon={faTwitter} className={styles.socialIcon} />
          </a>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
