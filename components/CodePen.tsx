import { faCodepen } from "@fortawesome/free-brands-svg-icons";
import Script from "next/script";
import EnabledFeature from "~/components/EnabledFeature/EnabledFeature";

interface CodepenProps {
	slug: string;
	height: number;
	version: number;
}

export default function CodePen(props: CodepenProps) {
	const { slug, height, version } = props;
	return (
		<>
			<EnabledFeature
				serviceName="CodePen"
				privacyPolicy="https://blog.codepen.io/documentation/privacy-policy/#cookies-4"
				height={height}
				icon={faCodepen}
			>
				<>
					<p
						data-height={height}
						data-theme-id="dark"
						data-slug-hash={slug}
						data-default-tab="css,result"
						data-user="surdu"
						data-embed-version={version}
						className="codepen"
					></p>
					<Script src="https://production-assets.codepen.io/assets/embed/ei.js"></Script>
				</>
			</EnabledFeature>
		</>
	);
}
