import clsx from "clsx";
import styles from "./Burger.module.scss";

interface BurgerProps {
  open: boolean;
  onClick: () => void;
}

export default function Burger(props: BurgerProps) {
  const { open, onClick } = props;

  return (
    <button
      className={clsx(styles.button, { [styles.open]: open })}
      onClick={onClick}
    >
      <div className={styles.burger}>
        <div className={styles.middle}></div>
      </div>
    </button>
  );
}
