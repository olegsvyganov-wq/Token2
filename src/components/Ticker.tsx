import { TICKER_ITEMS } from "../data";
import { BoltIcon } from "./Icons";

export function Ticker() {
  return (
    <div className="ticker-wrap relative z-20 overflow-hidden border-b border-line bg-panel">
      <div className="ticker-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex items-center"
            aria-hidden={copy === 1}
          >
            {TICKER_ITEMS.map((item) => (
              <span
                key={item}
                className="flex items-center gap-3 whitespace-nowrap px-5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dim"
              >
                <BoltIcon className="h-3 w-3 shrink-0 text-gold" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
