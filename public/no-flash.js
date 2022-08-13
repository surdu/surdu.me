(function NoFlash() {
  var STORAGE_KEY = "darkTheme";
  var DARK_CSS_CLASS = "dark-theme";
  var LIGHT_CSS_CLASS = "light-theme";

  updateHTML(getDefaultDarkMode());

  function updateHTML(darkMode) {
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
