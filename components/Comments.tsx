import { faComments } from "@fortawesome/free-solid-svg-icons";
import { DiscussionEmbed } from "disqus-react";
import EnabledFeature from "~/components/EnabledFeature/EnabledFeature";
import { Post } from "~/lib/post";

interface CommentsProps {
	post: Post;
}

export default function Comments({ post }: CommentsProps) {
	const disqusConfig = {
		url: `http://surdu.me/${post.url}`,
		identifier: `/${post.url}`,
	};

	return (
		<EnabledFeature
			serviceName="Disqus"
			icon={faComments}
			privacyPolicy="https://help.disqus.com/en/articles/1717103-disqus-privacy-policy"
		>
			<DiscussionEmbed
				shortname="surdu-me"
				config={disqusConfig}
			></DiscussionEmbed>
		</EnabledFeature>
	);
}
