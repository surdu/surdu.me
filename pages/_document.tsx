/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link href="/no-flash.js" rel="preload" as="script" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;1,400&family=Rubik:wght@500&display=swap"
					rel="stylesheet"
				/>
				<script src="https://app.tinyanalytics.io/pixel/VwgdUjyKKvluXFEK"></script>
			</Head>
			<body>
				<script src="/no-flash.js" />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
