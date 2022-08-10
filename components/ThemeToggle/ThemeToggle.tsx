import useDarkTheme from "~/components/ThemeToggle/useDarkTheme";

export default function ThemeToggle() {
  const { darkTheme, toggleDarkMode } = useDarkTheme();

  return <div onClick={toggleDarkMode}>{darkTheme ? "Dark" : "Light"}</div>;
}
