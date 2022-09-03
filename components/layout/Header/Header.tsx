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
    <header className={styles.header} aria-label="Page header">
      <Link href="/">
        <a tabIndex={0}>
          <Logo className={styles.logo} aria-label="Surdu's Logo" />
        </a>
      </Link>
      <Menu />
      <div className={styles.rightWrap} aria-label="">
        <Link href="https://github.com/surdu">
          <a aria-label="My GitHub page">
            <FontAwesomeIcon icon={faGithub} className={styles.socialIcon} />
          </a>
        </Link>
        <Link href="https://stackoverflow.com/users/460750/nicu-surdu">
          <a aria-label="My StackOverflow page">
            <FontAwesomeIcon
              icon={faStackOverflow}
              className={styles.socialIcon}
            />
          </a>
        </Link>
        <Link href="https://twitter.com/surdume">
          <a aria-label="My Twitter page">
            <FontAwesomeIcon icon={faTwitter} className={styles.socialIcon} />
          </a>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
