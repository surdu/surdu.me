import { ReactNode, useEffect, useState } from "react";

interface EnabledFeatureProps {
	serviceName: string;
	children: ReactNode;
}

function getStoredOptions() {
	const storedOptions = localStorage.getItem("enabledFeatures");
	return storedOptions ? JSON.parse(storedOptions) : {};
}

export default function EnabledFeature(props: EnabledFeatureProps) {
	const { serviceName, children } = props;
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
				<div>
					This has cookies! <a onClick={() => setOption(true)}>Enable</a>
				</div>
			) : (
				<>{children}</>
			)}
		</>
	);
}
