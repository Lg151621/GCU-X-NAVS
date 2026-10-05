import type { ReactNode } from "react";

type Props = { label: string; title: ReactNode; children: ReactNode };

export default function SectionHead({ label, title, children }: Props) {
  return (
    <div className="sec-head">
      <span className="label">{label}</span>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}
