(function NoFlash() {
	const STORAGE_KEY = "darkTheme";
	const DARK_CSS_CLASS = "dark-theme";
	const LIGHT_CSS_CLASS = "light-theme";

	updateHTML(getDefaultTheme());

	function updateHTML(useDarkTheme) {
		if (useDarkTheme) {
			document.body.classList.add(DARK_CSS_CLASS);
			document.body.classList.remove(LIGHT_CSS_CLASS);
		} else {
			document.body.classList.add(LIGHT_CSS_CLASS);
			document.body.classList.remove(DARK_CSS_CLASS);
		}
	}

	function getDefaultTheme() {
		const isOSDark = osUsesDarkTheme();
		const isStoredThemeDark = getStoredTheme();

		if (isStoredThemeDark === undefined) {
			return isOSDark;
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

	function osUsesDarkTheme() {
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	}
})();
