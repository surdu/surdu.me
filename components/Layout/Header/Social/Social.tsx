import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import clsx from "clsx";

import styles from "./Social.module.scss";

interface SocialProps {
  className?: string;
}

export default function Social(props: SocialProps) {
  const { className } = props;

  return (
    <>
      <Link href="https://github.com/surdu">
        <a aria-label="My GitHub page">
          <FontAwesomeIcon
            icon={faGithub}
            className={clsx(styles.socialIcon, className)}
          />
        </a>
      </Link>
      <Link href="https://stackoverflow.com/users/460750/nicu-surdu">
        <a aria-label="My StackOverflow page">
          <FontAwesomeIcon
            icon={faStackOverflow}
            className={clsx(styles.socialIcon, className)}
          />
        </a>
      </Link>
      <Link href="https://twitter.com/surdume">
        <a aria-label="My Twitter page">
          <FontAwesomeIcon
            icon={faTwitter}
            className={clsx(styles.socialIcon, className)}
          />
        </a>
      </Link>
    </>
  );
}
