import useTheme from "~/components/ThemeToggle/useTheme";

import Hills from "./hills.svg";
import Sun from "./sun.svg";
import Moon from "./moon.svg";
import Stars from "./stars.svg";
import Clouds from "./clouds.svg";

import styles from "./ThemeToggle.module.scss";

export default function ThemeToggle() {
	const { useDarkTheme, toggleTheme } = useTheme();

	return (
		<>
			<input
				type="checkbox"
				id="themeToggle"
				onChange={toggleTheme}
				checked={useDarkTheme}
				className={styles.input}
			/>
			<label htmlFor="themeToggle" className={styles.label}>
				Use dark theme
				<div aria-hidden="true" className={styles.landscape}>
					<Sun className={styles.sun} />
					<Clouds className={styles.clouds} />
					<Moon className={styles.moon} />
					<Stars className={styles.stars} />
					<Hills className={styles.hills} />
				</div>
			</label>
		</>
	);
}
