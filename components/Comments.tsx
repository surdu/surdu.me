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

  return (
    <div style={{ position: "relative" }}>
      <DiscussionEmbed
        shortname="surdu-me"
        config={disqusConfig}
      ></DiscussionEmbed>
      <div
        style={{
          width: "200px",
          height: "22px",
          backgroundColor: "var(--background-color)",
          position: "absolute",
          top: "222px",
          left: "122px",
          zIndex: 2222,
        }}
      ></div>
    </div>
  );
}
