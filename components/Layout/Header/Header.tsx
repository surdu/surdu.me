import { useEffect, useState } from "react";
import Link from "next/link";

import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";
import Menu from "./Menu/Menu";
import Logo from "./logo.svg";
import Social from "./Social/Social";
import Burger from "./Burger/Burger";
import MobileMenu from "./MobileMenu/MobileMenu";
import ReadingProgressBar from "~/components/ReadingProgressBar/ReadingProgressBar";

interface HeaderProps {
	progress?: number;
}

export default function Header(props: HeaderProps) {
	const { progress } = props;
	const [showMenu, setShowMenu] = useState(false);

	useEffect(
		function updateBodyClasses() {
			if (showMenu) {
				document.body.classList.add("menuShown");
			} else {
				document.body.classList.remove("menuShown");
			}
		},
		[showMenu]
	);

	return (
		<>
			<header className={styles.header} aria-label="Page header">
				<Link href="/" tabIndex={0}>
					<Logo className={styles.logo} aria-label="Surdu's Logo" />
				</Link>

				<Menu className={styles.menu} />

				<div className={styles.rightWrap}>
					<div className={styles.socialIcons}>
						<Social className={styles.socialIcon} />
					</div>

					<ThemeToggle />

					<Burger
						onClick={() => setShowMenu(!showMenu)}
						open={false}
						aria-hidden={showMenu}
					/>
				</div>
				{progress !== undefined && <ReadingProgressBar progress={progress} />}
			</header>

			<MobileMenu open={showMenu} onClose={() => setShowMenu(false)} />
		</>
	);
}
