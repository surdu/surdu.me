import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import styles from "./EnabledFeature.module.scss";

interface EnabledFeatureProps {
	serviceName: string;
	children: ReactNode;
	privacyPolicy?: string;
	height?: number;
}

function getStoredOptions() {
	const storedOptions = localStorage.getItem("enabledFeatures");
	return storedOptions ? JSON.parse(storedOptions) : {};
}

export default function EnabledFeature(props: EnabledFeatureProps) {
	const { serviceName, children, privacyPolicy, height } = props;
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
					{serviceName} is disabled becuase it uses cookies in order to work.
					{privacyPolicy ? (
						<div>
							If you are ok with{" "}
							<Link href={privacyPolicy}>
								<a target="_blank">{serviceName}'s Privacy Policy</a>
							</Link>
							, use button below to enable this feature.
						</div>
					) : (
						<div>
							If you are ok with {serviceName}'s cookies, you can enable this
							feauture.
						</div>
					)}
					<div>
						<a className={styles.button} onClick={() => setOption(true)}>
							Enable
						</a>
					</div>
				</div>
			) : (
				<>{children}</>
			)}
		</>
	);
}
