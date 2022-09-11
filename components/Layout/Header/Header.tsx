import { useEffect, useState } from "react";
import Link from "next/link";

import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";
import Menu from "./Menu/Menu";
import Logo from "./logo.svg";
import Social from "./Social/Social";
import Burger from "./Burger/Burger";
import MobileMenu from "./MobileMenu/MobileMenu";

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
    <>
      <header className={styles.header} aria-label="Page header">
        <Link href="/">
          <a tabIndex={0}>
            <Logo className={styles.logo} aria-label="Surdu's Logo" />
          </a>
        </Link>

        <Menu className={styles.menu} />

        <div className={styles.rightWrap}>
          <div className={styles.socialIcons}>
            <Social className={styles.socialIcon} />
          </div>

          <ThemeToggle />

          <Burger
            onClick={() => setShowMenu(!showMenu)}
            open={false}
            aria-hidden={showMenu}
          />
        </div>
      </header>

      <MobileMenu open={showMenu} onClose={() => setShowMenu(false)} />
    </>
  );
}
