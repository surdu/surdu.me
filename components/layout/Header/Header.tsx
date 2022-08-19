import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";

import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";
import Menu from "~/components/Layout/Header/Menu/Menu";
import Logo from "./logo.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <Logo className={styles.logo} />
        </a>
      </Link>
      <Menu />
      <div className={styles.rightWrap}>
        <Link href="https://github.com/surdu">
          <a>
            <FontAwesomeIcon icon={faGithub} className={styles.socialIcon} />
          </a>
        </Link>
        <Link href="https://stackoverflow.com/users/460750/nicu-surdu">
          <a>
            <FontAwesomeIcon
              icon={faStackOverflow}
              className={styles.socialIcon}
            />
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
