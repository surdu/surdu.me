import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

	useEffect(() => {
		const options = getStoredOptions();

		if (options[serviceName]) {
			setEnabled(true);
		}
	}, []);

	function setOption(enabled: boolean) {
		const options = getStoredOptions();

		if (enabled) {
			options[serviceName] = true;
		} else {
			delete options[serviceName];
		}

		localStorage.setItem("enabledFeatures", JSON.stringify(options));
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
								<Link href={privacyPolicy}>
									<a target="_blank">{serviceName}'s Privacy Policy</a>
								</Link>
								, use the button below to allow this feature on this site.
							</p>
						) : (
							<div>
								If you are ok with <b>{serviceName}'s</b> cookies, you can allow
								this feauture on this site using the button below.
							</div>
						)}
					</div>

					<button className={styles.button} onClick={() => setOption(true)}>
						Allow {serviceName}
					</button>
				</div>
			) : (
				<>{children}</>
			)}
		</>
	);
}
