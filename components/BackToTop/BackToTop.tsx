import styles from "./BackToTop.module.scss";

export default function BackToTop() {
  return (
    <a href="#top" className={styles.button} title="Back To Top">
      &uarr;
    </a>
  );
}
