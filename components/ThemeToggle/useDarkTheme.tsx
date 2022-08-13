import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "darkTheme";
const DARK_CSS_CLASS = "dark-theme";
const LIGHT_CSS_CLASS = "light-theme";

export default function useDarkTheme() {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(function initialize() {
    updateDarkTheme(getDefaultDarkMode());

    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

    function handleOSThemeChange(event: MediaQueryListEvent) {
      updateDarkTheme(event.matches);
    }

    matchMedia.addEventListener("change", handleOSThemeChange);

    return () => {
      matchMedia.removeEventListener("change", handleOSThemeChange);
    };
  }, []);

  const toggleDarkMode = useCallback(() => {
    updateDarkTheme(!darkTheme);
  }, [darkTheme]);

  function updateDarkTheme(newValue: boolean) {
    setDarkTheme(newValue);
    storeDarkTheme(newValue);
    updateHTML(newValue);
  }

  return { darkTheme, toggleDarkMode };
}

function getDefaultDarkMode() {
  const isOSDark = isOSThemeDark();
  const isStoreDark = isDarkModeStored();

  return !!(isStoreDark || isOSDark);
}

function isDarkModeStored() {
  const storedValue = localStorage.getItem(STORAGE_KEY);

  if (storedValue === undefined) {
    return;
  }

  return storedValue === "true";
}

function storeDarkTheme(value: boolean) {
  localStorage.setItem(STORAGE_KEY, value.toString());
}

function isOSThemeDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function updateHTML(darkMode: boolean) {
  if (darkMode) {
    document.body.classList.add(DARK_CSS_CLASS);
    document.body.classList.remove(LIGHT_CSS_CLASS);
    document.body.setAttribute("data-theme", "dark");
  } else {
    document.body.classList.add(LIGHT_CSS_CLASS);
    document.body.classList.remove(DARK_CSS_CLASS);
    document.body.setAttribute("data-theme", "light");
  }
}
