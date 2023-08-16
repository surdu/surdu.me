import "~/styles/globals.scss";
import "~/styles/syntax-light.scss";
import "~/styles/syntax-dark.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
