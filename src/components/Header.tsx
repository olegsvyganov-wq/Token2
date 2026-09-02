import { useEffect, useState } from "react";
import { LogoMark } from "./Icons";

const NAV: Array<[string, string, string]> = [
  ["#flow", "01", "Поток"],
  ["#rates", "02", "Курс"],
  ["#usage", "03", "Структура"],
  ["#calc", "04", "Калькулятор"],
];

export function Header() {
  const [utc, setUtc] = useState("--:--:--");

  useEffect(() => {
    const update = () => setUtc(new Date().toISOString().slice(11, 19));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-[2px]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="group flex items-center gap-2.5">
          <LogoMark className="h-7 w-7 text-gold transition-transform duration-500 group-hover:rotate-[20deg]" />
          <span className="font-display text-[13px] font-bold tracking-[0.14em]">
            ТОКЕНОМИКА
          </span>
          <span className="mt-0.5 hidden font-mono text-[10px] text-dim sm:inline">
            / AEI
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map(([href, num, label]) => (
            <a
              key={href}
              href={href}
              className="group flex items-baseline gap-1.5 text-[13px] font-medium text-dim transition-colors hover:text-ink"
            >
              <span className="font-mono text-[10px] text-gold/70 transition-colors group-hover:text-gold">
                {num}
              </span>
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 rounded-full border border-coral/40 px-3 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-coral" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-coral" />
            </span>
            <span className="font-mono text-[10px] font-semibold tracking-[0.22em] text-coral">
              LIVE
            </span>
          </span>
          <span className="hidden font-mono text-[12px] tabular-nums text-dim sm:inline">
            {utc} <span className="text-dim/60">UTC</span>
          </span>
        </div>
      </div>
    </header>
  );
}
