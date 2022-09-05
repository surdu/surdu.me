import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCircleInfo,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Note.module.scss";

enum NoteType {
  danger = "danger",
  quote = "quote",
}

const classes = {
  [NoteType.danger]: styles.danger,
  [NoteType.quote]: styles.quote,
} as const;

interface NoteProps {
  children: string;
  type: NoteType;
}

export default function Note(props: NoteProps) {
  const { children, type } = props;

  const title = renderTitle(type);

  return (
    <div className={clsx(styles.note, classes[type])}>
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </div>
  );
}

function renderTitle(type: NoteType) {
  switch (type) {
    case NoteType.danger:
      return (
        <>
          <FontAwesomeIcon icon={faTriangleExclamation} /> Warning
        </>
      );

    case NoteType.quote:
      return null;

    default:
      return (
        <>
          <FontAwesomeIcon icon={faBook} /> Note
        </>
      );
  }
}
