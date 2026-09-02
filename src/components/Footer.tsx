import { ArrowUpRightIcon, LogoMark } from "./Icons";

const SOURCES: Array<[string, string]> = [
  ["Anthropic Economic Index", "https://www.anthropic.com/economic-index"],
  ["Тарифы API Claude", "https://www.anthropic.com/pricing"],
  ["Claude", "https://claude.com"],
];

const UNITS: string[] = [
  "1 токен ≈ 0,75 слова (рус.) · ≈ 4 символа (англ.)",
  "1М токенов ≈ 750 тыс. слов",
  "«Война и мир» ≈ 0,77М токенов",
  "10М токенов ≈ $48 при курсе $4.80/1М",
];

export function Footer() {
  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-7 w-7 text-gold" />
              <span className="font-display text-[13px] font-bold tracking-[0.14em]">
                ТОКЕНОМИКА
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-dim">
              Живая панель по мотивам Anthropic Economic Index: поток
              зачислений, курс моделей, структура мирового потребления токенов
              и калькулятор вашего часа.
            </p>
            <p className="mt-4 max-w-sm font-mono text-[11px] leading-relaxed text-dim/70">
              Цены, доли и темпы — иллюстративные и могут отличаться от
              актуальных данных Anthropic. Не является офертой.
            </p>
          </div>

          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-dim">
              Источники
            </div>
            <div className="mt-4">
              {SOURCES.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-line/60 py-3 text-[13.5px] text-dim transition-colors hover:text-ink"
                >
                  {label}
                  <ArrowUpRightIcon className="h-3.5 w-3.5 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-dim">
              Единицы измерения
            </div>
            <ul className="mt-4 space-y-2.5">
              {UNITS.map((u) => (
                <li
                  key={u}
                  className="font-mono text-[12px] leading-relaxed text-dim"
                >
                  <span className="mr-2 text-gold">—</span>
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[11px] text-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 «Токеномика» · сделано на токенах</span>
          <span className="tabular-nums">
            собрано из ≈ <span className="text-gold">8 400 000</span> токенов
          </span>
        </div>
      </div>
    </footer>
  );
}
