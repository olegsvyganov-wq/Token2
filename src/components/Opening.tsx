import { useEffect, useState } from "react";
import { fmtInt, RATE_PER_SEC } from "../data";
import { useScramble, useTween } from "../hooks";
import { ArrowDownIcon, Coin } from "./Icons";
import { Phone } from "./Phone";

function useWorldTokens(): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const midnight = Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
      );
      setValue(Math.floor(((Date.now() - midnight) / 1000) * RATE_PER_SEC));
    };
    calc();
    const id = window.setInterval(calc, 250);
    return () => window.clearInterval(id);
  }, []);
  return value;
}

const STATS: Array<[string, string, string]> = [
  ["≈ $48/час", "текущее зачисление", "text-gold"],
  ["$4.80/1М", "эффективный курс", "text-ink"],
  ["2,2 трлн", "токенов в сутки в мире *", "text-sage"],
];

export function Opening() {
  const heroNumber = useTween(10_000_000, 2400);
  const line = useScramble("ТОКЕНОВ ЗАЧИСЛЕНО");
  const world = useWorldTokens();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-14 md:pt-20 lg:grid-cols-[1.05fr_0.95fr]">
        {/* левая колонка */}
        <div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-coral" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
            </span>
            Anthropic Economic Index
            <span className="normal-case tracking-[0.18em] text-dim">
              · прямой эфир
            </span>
          </div>

          <h1 className="mt-7 font-display font-black leading-[0.98]">
            <span className="block text-[clamp(2.4rem,6.4vw,4.5rem)] tabular-nums tracking-tight">
              {fmtInt(heroNumber)}
            </span>
            <span className="mt-2 block text-[clamp(1.25rem,3.2vw,2.3rem)] text-gold">
              {line}
              <span className="caret ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.12em] bg-gold" />
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-dim">
            Экономический индекс Anthropic измеряет, как мир тратит токены:
            сколько, на что и по какой цене. Перед вами живая панель этой
            экономики — поток зачислений, курс моделей, структура потребления и
            калькулятор вашего рабочего часа. Телефон справа{" "}
            <span className="font-semibold text-ink">кликабелен</span> — кнопка
            выдаёт новые токены.
          </p>

          <div className="mt-9 grid grid-cols-3 divide-x divide-line border-y border-line">
            {STATS.map(([value, label, color], i) => (
              <div key={label} className={`py-4 ${i === 0 ? "pr-4" : "px-4"}`}>
                <div
                  className={`font-display text-[17px] font-bold tabular-nums md:text-xl ${color}`}
                >
                  {value}
                </div>
                <div className="mt-1.5 font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-dim">
                  {label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 font-mono text-[10.5px] text-dim/70">
            * оценка по открытым данным; цифры иллюстративные
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-md border border-line bg-panel/70 px-5 py-4">
            <div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-dim">
                в мире сегодня, токенов
              </div>
              <div className="mt-1 font-mono text-[10.5px] text-dim/70">
                темп ≈ 22 млн/сек · с полуночи UTC
              </div>
            </div>
            <div className="font-mono text-lg font-semibold tabular-nums text-gold md:text-xl">
              {fmtInt(world)}
            </div>
          </div>

          <a
            href="#flow"
            className="group mt-8 inline-flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[0.2em] text-dim transition-colors hover:text-gold"
          >
            <ArrowDownIcon className="bounce-soft h-4 w-4 text-gold" />
            листайте — дальше живой поток
          </a>
        </div>

        {/* правая колонка: телефон */}
        <div className="relative flex justify-center lg:justify-end lg:pr-6">
          <div
            className="spin-slow pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/50"
            aria-hidden="true"
          />
          <Coin className="floaty absolute -left-2 top-[10%] h-9 w-9 opacity-60 lg:left-2" />
          <Coin className="floaty absolute right-[2%] top-[30%] h-7 w-7 opacity-45 [animation-delay:1.4s]" />
          <Coin className="floaty absolute bottom-[8%] left-[12%] h-6 w-6 opacity-5 [animation-delay:2.3s]" />

          <Phone />
        </div>
      </div>
    </section>
  );
}
