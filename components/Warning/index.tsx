interface WarningProps {
  children: React.ReactNode;
  pad: string;
}

export default function Warning({ children, pad }: WarningProps) {
  return (
    <div>
      {pad} {children} {pad}
    </div>
  );
}
