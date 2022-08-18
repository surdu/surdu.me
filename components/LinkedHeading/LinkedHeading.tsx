import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useRef, MouseEvent } from "react";

import styles from "./LinkedHeading.module.scss";

interface LinkedHeadingProps {
  children: string;
  as: string;
}

export default function LinkedHeading(props: LinkedHeadingProps) {
  const { children } = props;
  const linkRef = useRef<HTMLAnchorElement>(null);

  const id = computeId(children[0]);

  const handleLinkClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      try {
        const hash = (event.target as HTMLAnchorElement).hash;
        linkRef.current?.scrollIntoView({ behavior: "smooth" });
        history.pushState({}, "", hash);
        event.preventDefault();
      } catch {
        // If smooth scroll fails for any reason, the default behaviour will continue
      }
    },
    []
  );

  return (
    <h2 className={styles.linkedHeading}>
      <a href={`#${id}`} id={id} ref={linkRef} onClick={handleLinkClick}>
        {children} <FontAwesomeIcon icon={faLink} />
      </a>
    </h2>
  );
}

function computeId(text: string) {
  return text
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
}
