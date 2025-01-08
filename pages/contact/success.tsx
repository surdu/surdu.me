import Layout from "~/components/Layout/Layout";
import Meta from "~/components/Meta";

export default function Success() {
	return (
		<Layout>
			<Meta title="Contact succesfull" />
			<div>
				<h1>Success</h1>
				<p>Your message has been sent!</p>
			</div>
		</Layout>
	);
}
