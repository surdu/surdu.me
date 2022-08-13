import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      &copy;
      <span className={styles.blue}>&nbsp;{new Date().getFullYear()} </span>
      <span className={styles.yellow}>&nbsp;Nicu </span>
      <span className={styles.red}>&nbsp;Surdu </span>
    </footer>
  );
}
