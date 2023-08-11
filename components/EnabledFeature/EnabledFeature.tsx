import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import styles from "./EnabledFeature.module.scss";

interface EnabledFeatureProps {
	serviceName: string;
	children: ReactNode;
	icon?: IconDefinition;
	privacyPolicy?: string;
	height?: number;
}

function getStoredOptions() {
	const storedOptions = localStorage.getItem("enabledFeatures");
	return storedOptions ? JSON.parse(storedOptions) : {};
}

export default function EnabledFeature(props: EnabledFeatureProps) {
	const { serviceName, icon, children, privacyPolicy, height } = props;
	const [enabled, setEnabled] = useState(false);

	function handleMessageEvent(event: MessageEvent) {
		if (event.data.enabledFeature) {
			const enabledFeature = event.data.enabledFeature;

			if (enabledFeature.serviceName === serviceName) {
				setEnabled(enabledFeature.value);
			}
		}
	}

	useEffect(function init() {
		const options = getStoredOptions();

		if (options[serviceName]) {
			setEnabled(true);
		}

		window.addEventListener("message", handleMessageEvent);

		return () => {
			window.removeEventListener("message", handleMessageEvent);
		};
	}, []);

	function setOption(enabled: boolean) {
		const options = getStoredOptions();

		if (enabled) {
			options[serviceName] = true;
		} else {
			delete options[serviceName];
		}

		localStorage.setItem("enabledFeatures", JSON.stringify(options));
		window.postMessage(
			{ enabledFeature: { serviceName: serviceName, value: enabled } },
			"*"
		);
		setEnabled(true);
	}

	return (
		<>
			{!enabled ? (
				<div className={styles.feature} style={{ height: `${height}px` }}>
					{icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
					<div>
						I value your privacy, so <b>{serviceName}</b> is disabled becuase it
						uses cookies in order to work.
						{privacyPolicy ? (
							<p>
								If you're ok with{" "}
								<Link href={privacyPolicy} target="_blank">
									{serviceName}'s Privacy Policy
								</Link>
								, use the button below to enable this feature on my site.
							</p>
						) : (
							<div>
								If you are ok with <b>{serviceName}'s</b> cookies, you can
								enable this feauture on this site using the button below.
							</div>
						)}
					</div>

					<button className={styles.button} onClick={() => setOption(true)}>
						Enable {serviceName}
					</button>
				</div>
			) : (
				<>
					<div>{children}</div>
					<div className={styles.enabledBar}>
						<div className={styles.enabledBarMessage}>
							{privacyPolicy ? (
								<Link href={privacyPolicy} target="_blank">
									{serviceName}'s Privacy Policy
								</Link>
							) : (
								<span>{serviceName} is using cookies</span>
							)}
						</div>
						<button
							className={clsx(styles.button, styles.smallButton)}
							onClick={() => setOption(false)}
						>
							Disable {serviceName}
						</button>
					</div>
				</>
			)}
		</>
	);
}
