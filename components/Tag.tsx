interface TagProps {
  children: string;
  className?: string;
}

export default function Tag({ children, className }: TagProps) {
  return (
    <span aria-label={`hashtag ${children}`} className={className}>
      <span aria-hidden="true">#{children}</span>
    </span>
  );
}
