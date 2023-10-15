import { useCallback, useEffect, useState } from "react";
import theme from "~/styles/theme.module.scss";

const STORAGE_KEY = "darkTheme";
const DARK_CSS_CLASS = "dark-theme";
const LIGHT_CSS_CLASS = "light-theme";

export default function useTheme() {
	const [useDarkTheme, setUseDarkTheme] = useState(false);

	useEffect(function initialize() {
		updateTheme(getCurrentTheme(), true);

		const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

		function handleOSThemeChange(event: MediaQueryListEvent) {
			localStorage.removeItem(STORAGE_KEY);
			updateTheme(event.matches, true);
		}

		matchMedia.addEventListener("change", handleOSThemeChange);

		return () => {
			matchMedia.removeEventListener("change", handleOSThemeChange);
		};
	}, []);

	const toggleTheme = useCallback(() => {
		updateTheme(!useDarkTheme);
	}, [useDarkTheme]);

	function updateTheme(useDark: boolean, skipStoring?: boolean) {
		setUseDarkTheme(useDark);
		updateHTML(useDark);

		if (!skipStoring) {
			storeTheme(useDark);
		}
	}

	return { useDarkTheme, toggleTheme };
}

function getCurrentTheme() {
	const userPreffersDarkTheme = doesUserPrefferDarkTheme();
	const isStoredThemeDark = getStoredTheme();

	if (isStoredThemeDark === undefined) {
		return userPreffersDarkTheme;
	}

	return isStoredThemeDark;
}

function getStoredTheme() {
	const storedValue = localStorage.getItem(STORAGE_KEY);

	if (storedValue === null) {
		return;
	}

	return storedValue === "true";
}

function storeTheme(useDarkTheme: boolean) {
	localStorage.setItem(STORAGE_KEY, useDarkTheme.toString());
}

function doesUserPrefferDarkTheme() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function doesUserPrefferReducedMotion() {
	return window.matchMedia("(prefers-reduced-motion)").matches;
}

function updateHTML(useDarkTheme: boolean) {
	const themeColorMeta = document.querySelector("#themeColorMeta");

	const userPreffersReducedMotion = doesUserPrefferReducedMotion();
	if (!userPreffersReducedMotion) {
		document.body.classList.add("animated");
	}

	if (useDarkTheme) {
		document.body.classList.add(DARK_CSS_CLASS);
		document.body.classList.remove(LIGHT_CSS_CLASS);
		themeColorMeta?.setAttribute("content", theme.darkBackgroundColor);
	} else {
		document.body.classList.add(LIGHT_CSS_CLASS);
		document.body.classList.remove(DARK_CSS_CLASS);
		themeColorMeta?.setAttribute("content", theme.lightBackgroundColor);
	}
}
