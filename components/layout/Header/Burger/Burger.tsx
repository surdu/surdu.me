import clsx from "clsx";
import { forwardRef, HTMLAttributes } from "react";
import styles from "./Burger.module.scss";

interface BurgerProps extends HTMLAttributes<HTMLButtonElement> {
  open: boolean;
  onClick: () => void;
}

export default forwardRef<HTMLButtonElement, BurgerProps>(function Burger(
  props,
  ref
) {
  const { open, onClick, className, ...rest } = props;

  return (
    <button
      ref={ref}
      className={clsx(styles.button, { [styles.open]: open }, className)}
      aria-label={open ? "Close Menu" : "Open Menu"}
      onClick={onClick}
      {...rest}
    >
      <div className={styles.burger}>
        <div className={styles.middle}></div>
      </div>
    </button>
  );
});
