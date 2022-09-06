import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Footer">
      <div>
        &copy;
        <span className={styles.blue}>&nbsp;{new Date().getFullYear()} </span>
        <span className={styles.yellow}>&nbsp;Nicu </span>
        <span className={styles.red}>&nbsp;Surdu </span>
      </div>
      <div className={styles.legal}>
        <Link href="/legal/terms">
          <a>Terms and Conditions</a>
        </Link>
        <span aria-hidden="true">&bull;</span>
        <Link href="/legal/disclaimer">
          <a>Disclaimer</a>
        </Link>
      </div>
    </footer>
  );
}
