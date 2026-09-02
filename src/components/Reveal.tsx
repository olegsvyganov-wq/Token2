import type { CSSProperties, ReactNode } from "react";
import { useInView } from "../hooks";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Обёртка появления при скролле (fade + slide). */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

interface SectionHeadProps {
  num: string;
  title: string;
  sub?: string;
}

export function SectionHead({ num, title, sub }: SectionHeadProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in" : ""} mb-10 md:mb-14`}
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[12px] font-medium tracking-[0.3em] text-gold">
          {num}
        </span>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
        <span className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-dim">
          Anthropic Economic Index
        </span>
      </div>
      <h2 className="mask-line mt-5 font-display text-[26px] font-bold leading-tight md:text-4xl">
        <span>{title}</span>
      </h2>
      {sub ? (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-dim">
          {sub}
        </p>
      ) : null}
    </div>
  );
}
