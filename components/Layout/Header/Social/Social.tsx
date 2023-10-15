import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faRssSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import styles from "./Social.module.scss";

export default function Social() {
	return (
		<>
			<Link
				href="https://github.com/surdu"
				aria-label="My GitHub page"
				title="GitHub"
			>
				<FontAwesomeIcon icon={faGithub} className={styles.socialIcon} />
			</Link>
			<Link
				href="https://twitter.com/surdume"
				aria-label="My Twitter page"
				title="Twitter"
			>
				<FontAwesomeIcon icon={faTwitter} className={styles.socialIcon} />
			</Link>
			<Link href="/rss/feed.xml" aria-label="Blog RSS feed" title="RSS Feed">
				<FontAwesomeIcon icon={faRssSquare} className={styles.socialIcon} />
			</Link>
		</>
	);
}
