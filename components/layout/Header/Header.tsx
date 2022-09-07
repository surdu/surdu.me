import { useEffect, useState } from "react";
import Link from "next/link";

import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";
import Menu from "~/components/Layout/Header/Menu/Menu";
import Logo from "./logo.svg";
import Social from "~/components/Layout/Header/Social/Social";
import Burger from "~/components/Layout/Header/Burger/Burger";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(
    function updateBodyClasses() {
      if (showMenu) {
        document.body.classList.add("menuShown");
      } else {
        document.body.classList.remove("menuShown");
      }
    },
    [showMenu]
  );

  return (
    <header className={styles.header} aria-label="Page header">
      <Link href="/">
        <a tabIndex={0}>
          <Logo className={styles.logo} aria-label="Surdu's Logo" />
        </a>
      </Link>
      <Menu open={showMenu} />
      <div className={styles.rightWrap}>
        <Social className={styles.socialIcons} />
        <ThemeToggle />
        <Burger onClick={() => setShowMenu(!showMenu)} open={showMenu} />
      </div>
    </header>
  );
}
