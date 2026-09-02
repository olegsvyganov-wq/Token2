import type { CSSProperties } from "react";
import { CATEGORIES } from "../data";
import { CategoryIcon } from "./Icons";
import { Reveal, SectionHead } from "./Reveal";

export function Usage() {
  return (
    <section id="usage" className="border-t border-line/70 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead
          num="03"
          title="Куда уходят токены"
          sub="Структура мирового потребления по типу задач — доли от общего потока токенов, по мотивам публикаций Economic Index."
        />

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="self-start lg:sticky lg:top-28">
            <Reveal>
              <p className="font-display text-[24px] font-bold leading-snug md:text-[31px]">
                Каждые{" "}
                <span className="text-gold">3 из 10</span> токенов в мире
                превращаются в&nbsp;код.
              </p>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-dim">
                Доля программирования растёт третий год подряд: ревью, тесты и
                миграции легаси стали главной статьёй расходов на интеллект.
                Бизнес-операции и анализ держат вторую и третью позиции.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-9 grid grid-cols-2 gap-6 border-t border-line pt-7">
                <div>
                  <div className="font-display text-3xl font-black text-gold">
                    ×3.5
                  </div>
                  <div className="mt-2 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.16em] text-dim">
                    рост доли кода
                    <br />в потоке за 3 года
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl font-black text-sage">
                    62%
                  </div>
                  <div className="mt-2 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.16em] text-dim">
                    запросов — рабочие,
                    <br />а не личные
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="space-y-7">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.name} delay={i * 70}>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-gold">
                      <CategoryIcon name={c.icon} className="h-4 w-4" />
                    </span>
                    <span className="text-[15px] font-semibold">{c.name}</span>
                  </div>
                  <span
                    className={`font-display text-lg font-bold tabular-nums ${
                      i === 0 ? "text-gold" : "text-ink"
                    }`}
                  >
                    {c.pct.toLocaleString("ru-RU")}%
                  </span>
                </div>
                <div className="mt-2.5 h-2 overflow-hidden rounded-sm bg-line/50">
                  <div
                    className="bar-fill h-full rounded-sm bg-gradient-to-r from-gold to-golddeep"
                    style={{ "--w": `${c.pct}%` } as CSSProperties}
                  />
                </div>
                <p className="mt-1.5 text-[12px] text-dim">{c.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
