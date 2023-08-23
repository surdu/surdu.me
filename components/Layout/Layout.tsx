import styles from "./Layout.module.scss";
import theme from "~/styles/theme.module.scss";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useEffect } from "react";
import SkipToContent from "~/components/SkipToContent/SkipToContent";
import useTheme from "~/components/ThemeToggle/useTheme";

interface LayoutProps {
	children: React.ReactNode;
	progress?: number;
}

export default function Layout({ children, progress }: LayoutProps) {
	const { useDarkTheme } = useTheme();

	useEffect(function bindOnScroll() {
		function handleScroll() {
			if (window.scrollY > 110) {
				document.body.setAttribute("header-scrolled", "");
			} else {
				document.body.removeAttribute("header-scrolled");
			}

			if (window.scrollY > vh(90)) {
				document.body.setAttribute("data-page-scrolled", "");
			} else {
				document.body.removeAttribute("data-page-scrolled");
			}
		}

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		let themeColorMeta = document.querySelector("#themeColorMeta");

		if (!themeColorMeta) {
			themeColorMeta = document.createElement("meta");
			themeColorMeta.setAttribute("id", "themeColorMeta");
			themeColorMeta.setAttribute("name", "theme-color");

			document.head.appendChild(themeColorMeta);
		}

		if (useDarkTheme) {
			themeColorMeta?.setAttribute("content", theme.darkBackgroundColor);
		} else {
			themeColorMeta?.setAttribute("content", theme.lightBackgroundColor);
		}
	}, [useDarkTheme]);

	return (
		<>
			<SkipToContent />
			<Header progress={progress} />
			<main className={styles.main} id="mainContent" aria-label="Main content">
				{children}
			</main>
			<Footer />
		</>
	);
}

function vh(value: number) {
  const height = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (value * height) / 100;
}
