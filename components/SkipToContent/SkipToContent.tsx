import styles from "./SkipToContent.module.scss";

export default function SkipToContent() {
  return (
    <a href="#mainContent" className={styles.skipLink}>
      Skip to content
    </a>
  );
}
