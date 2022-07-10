import styles from "./header.module.scss";
export function Header() {
  return (
    <header>
      <img src="/logo.gif" alt="Logo" className={styles.logo} />
    </header>
  );
}
