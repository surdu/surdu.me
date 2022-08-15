import styles from "./BackToTop.module.scss";

export default function BackToTop() {
  return (
    <a
      href="#"
      className={styles.button}
      title="Back To Top"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      &uarr;
    </a>
  );
}
