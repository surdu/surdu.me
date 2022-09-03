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

  const rawDate = new Date(post.date);
  const date = new Intl.DateTimeFormat("en-uk", {
    dateStyle: "medium",
  }).format(rawDate);
  const datetime = rawDate.toISOString().split("T")[0];

  return (
    <div className={clsx(styles.post, className)}>
      <Link href={post.url}>
        <a className={styles.title}>
          <h2>{post.title}</h2>
        </a>
      </Link>
      <time className={styles.date} dateTime={datetime}>
        {date}
      </time>
      <div className={styles.synopsis}>
        <Markdown>{post.synopsis}</Markdown>
      </div>
      <div className={styles.tags}>
        {post.tags.map((tag) => (
          <Link href={`/blog/tag/${tag}`} key={tag}>
            <a aria-label={`${tag} tag`}>#{tag}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}
