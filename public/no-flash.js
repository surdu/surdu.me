(function NoFlash() {
  var STORAGE_KEY = "darkTheme";
  var DARK_CSS_CLASS = "dark-theme";
  var LIGHT_CSS_CLASS = "light-theme";

  updateCSSClass(getDefaultDarkMode());

  function updateCSSClass(darkMode) {
    if (darkMode) {
      document.body.classList.add(DARK_CSS_CLASS);
      document.body.classList.remove(LIGHT_CSS_CLASS);
    } else {
      document.body.classList.add(LIGHT_CSS_CLASS);
      document.body.classList.remove(DARK_CSS_CLASS);
    }
  }

  function getDefaultDarkMode() {
    var isOSDark = isOSThemeDark();
    var isStoreDark = isDarkModeStored();

    return !!(isStoreDark || isOSDark);
  }

  function isDarkModeStored() {
    var storedValue = localStorage.getItem(STORAGE_KEY);

    if (storedValue === undefined) {
      return;
    }

    return storedValue === "true";
  }

  function isOSThemeDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
})();
