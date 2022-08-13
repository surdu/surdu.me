import { DiscussionEmbed } from "disqus-react";
import { Post } from "~/lib/post";

interface CommentsProps {
  post: Post;
}

export default function Comments({ post }: CommentsProps) {
  const disqusConfig = {
    url: `http://surdu.me/${post.url}`,
    identifier: `/${post.url}`,
  };

  return <DiscussionEmbed shortname="surdu-me" config={disqusConfig} />;
}
