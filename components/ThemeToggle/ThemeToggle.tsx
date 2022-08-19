import useDarkTheme from "~/components/ThemeToggle/useDarkTheme";

import styles from "./ThemeToggle.module.scss";

export default function ThemeToggle() {
  const { darkTheme, toggleDarkMode } = useDarkTheme();

  return (
    <>
      <input
        type="checkbox"
        id="themeToggle"
        onChange={toggleDarkMode}
        checked={darkTheme}
        className={styles.input}
      />
      <label htmlFor="themeToggle" className={styles.label}>
        {darkTheme ? "Switch to light theme" : "Switch to dark theme"}
      </label>
    </>
  );
}
