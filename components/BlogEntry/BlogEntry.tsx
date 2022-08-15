import Link from "next/link";
import clsx from "clsx";

import styles from "./BlogEntry.module.scss";

import Markdown from "~/components/Markdown";
import { Post } from "~/lib/post";

interface PostProps {
  post: Post;
  className?: string;
}

export default function BlogEntry(props: PostProps) {
  const { post, className } = props;

  const date = new Intl.DateTimeFormat("en-uk", {
    dateStyle: "medium",
  }).format(new Date(post.date));

  return (
    <div className={clsx(styles.post, className)}>
      <Link href={post.url}>
        <a className={styles.title}>
          <h2>{post.title}</h2>
        </a>
      </Link>
      <div className={styles.date}>{date}</div>
      <div className={styles.synopsis}>
        <Markdown>{post.synopsis}</Markdown>
      </div>
      <div className={styles.tags}>
        {post.tags.map((tag) => (
          <Link href={`/blog/tag/${tag}`} key={tag}>
            <a>#{tag}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}
