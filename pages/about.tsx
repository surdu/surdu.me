import Layout from "~/components/Layout/Layout";
import Markdown from "~/components/Markdown";
import Meta from "~/components/Meta";

const content = `
# Hello friend 👋

My name is Nicu Surdu. I'm a software engineer by day, and a
tinkerer by night. I enjoy writing good software for good people and
using my free time to build and play with gadgets.

From time to time I like to contribute to my or other's open source
projects. You can find them all on my [GitHub page](https://github.com/surdu)
or take a look on the [Projects](/projects) page, where I've picked my best ones.

You can contact me using the [contact form](/contact).
`;

export default function Home() {
	return (
		<Layout>
			<Meta title="About Nicu Surdu" />
			<Markdown>{content}</Markdown>
		</Layout>
	);
}
