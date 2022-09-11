import clsx from "clsx";
import Menu from "~/components/Layout/Header/Menu/Menu";
import Social from "~/components/Layout/Header/Social/Social";
import Burger from "~/components/Layout/Header/Burger/Burger";

import styles from "./MobileMenu.module.scss";
import { useEffect, useRef } from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu(props: MobileMenuProps) {
  const { open, onClose } = props;

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => closeBtnRef.current?.focus(), 500);
    }
  }, [open]);

  return (
    <div
      className={clsx(styles.overlay, { [styles.open]: open })}
      onClick={onClose}
      {...(!open ? { "aria-hidden": "true" } : {})}
    >
      <aside
        className={styles.sideMenu}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Burger
          onClick={onClose}
          open={true}
          ref={closeBtnRef}
          className={styles.burger}
        />
        <Menu />
        <div className={styles.social}>
          <Social />
        </div>
      </aside>
    </div>
  );
}
