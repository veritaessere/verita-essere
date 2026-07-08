import type { ReactNode } from "react";
import "./animated-glow-card.css";

type Props = { children: ReactNode; className?: string };

export function CardCanvas({ children, className = "" }: Props) {
  return <div className={`card-canvas ${className}`}>{children}</div>;
}

export function Card({ children, className = "" }: Props) {
  return (
    <div className={`glow-card ${className}`}>
      <div className="card-content">{children}</div>
    </div>
  );
}
