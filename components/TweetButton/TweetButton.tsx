import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import styles from "./TweetButton.module.scss";

interface TweetButtonProps {
	text: string;
	children: string;
	url?: string;
}

export default function TweetButton(props: TweetButtonProps) {
	const { text, children, url } = props;

	let finalText = text;

	if (url) {
		finalText += `%0A%0A${encodeURIComponent(url)}`;
	}

	return (
		<Link
			href={`https://twitter.com/intent/tweet?text=${finalText}`}
			rel="noreferrer noopener"
			target="_blank"
			className={styles.button}
		>
			<FontAwesomeIcon icon={faTwitter} className={styles.icon} />
			<span>{children}</span>
		</Link>
	);
}
