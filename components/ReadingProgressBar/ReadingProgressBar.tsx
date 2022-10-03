import styles from "./ReadingProgressBar.module.scss";

export default function ReadingProgressBar(props: { progress: number }) {
	const { progress } = props;

	return (
		<div className={styles.bar}>
			<div className={styles.fill} style={{ width: `${progress}%` }}></div>
		</div>
	);
}
