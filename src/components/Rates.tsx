import { fmtMoney, MODELS, timeNow } from "../data";
import { Reveal, SectionHead } from "./Reveal";

function Receipt() {
  return (
    <div className="group mx-auto w-full max-w-[340px]">
      <div className="-rotate-2 transition-transform duration-500 ease-out group-hover:rotate-0">
        <div className="scallop scallop-flip" aria-hidden="true" />
        <div className="bg-paper px-6 pb-5 pt-6 font-mono text-[12.5px] text-[#241f14] shadow-[0_26px_55px_rgba(0,0,0,0.5)]">
          <p className="text-center text-[9.5px] uppercase tracking-[0.3em]">
            Anthropic Economic Index
          </p>
          <p className="mt-1 text-center text-[13.5px] font-bold uppercase tracking-[0.12em]">
            Квитанция № AEI-10M
          </p>

          <div className="my-4 border-t border-dashed border-[#c6bc9e]" />

          <dl className="space-y-1.5">
            {[
              ["Зачисление", "10 000 000 ток."],
              ["Тариф", "Mix AEI"],
              ["Курс", "$4.80 / 1М"],
              ["Пропорция", "75/25 ввод:вывод"],
              ["Период", "1 час"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt>{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="my-4 border-t border-dashed border-[#c6bc9e]" />

          <div className="flex items-baseline justify-between">
            <span className="text-[11px] uppercase tracking-[0.14em]">
              К зачислению
            </span>
            <span className="text-[19px] font-bold tabular-nums">$48.00</span>
          </div>

          <div className="barcode mt-5 h-10 w-full" aria-hidden="true" />
          <p className="mt-4 text-center text-[9.5px] uppercase tracking-[0.26em]">
            Спасибо за расход токенов
          </p>
          <p className="mt-1 text-center text-[10px] text-[#8a8272]">
            21.02.2026 · {timeNow()} · касса № 4
          </p>
        </div>
        <div className="scallop" aria-hidden="true" />
      </div>
      <p className="mt-6 text-center font-mono text-[10.5px] uppercase tracking-[0.18em] text-dim">
        наведите, чтобы выровнять чек
      </p>
    </div>
  );
}

export function Rates() {
  return (
    <section id="rates" className="border-t border-line/70 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead
          num="02"
          title="Курс токена"
          sub="Прейскурант: сколько стоит миллион токенов у каждой модели. Эффективный курс считается при типичной пропорции ввод:вывод 3:1 — именно он превращает 10 000 000 токенов в $48."
        />

        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="overflow-hidden rounded-md border border-line">
              <div className="grid grid-cols-[1.5fr_0.85fr_0.85fr_0.85fr] gap-2 border-b border-line bg-panel px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                <span>Модель</span>
                <span className="text-right">Ввод $/1М</span>
                <span className="text-right">Вывод $/1М</span>
                <span className="text-right">Эфф. 3:1</span>
              </div>

              {MODELS.map((m) => {
                const isMix = m.id === "mix";
                const eff = m.input * 0.75 + m.output * 0.25;
                return (
                  <div
                    key={m.id}
                    className={`grid grid-cols-[1.5fr_0.85fr_0.85fr_0.85fr] items-center gap-2 border-b border-line/70 px-5 py-4 transition-all duration-300 last:border-b-0 hover:translate-x-1 hover:bg-panel2 ${
                      isMix ? "border-l-2 border-l-gold bg-gold/[0.06]" : ""
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold">{m.name}</span>
                        {isMix && (
                          <span className="rounded-sm bg-gold px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#3d2d07]">
                            как в зачислении
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-[11.5px] leading-snug text-dim">
                        {m.note} · контекст {m.ctx}
                      </div>
                    </div>
                    <span className="text-right font-mono text-[14px] tabular-nums">
                      {fmtMoney(m.input, m.input % 1 ? 2 : 0)}
                    </span>
                    <span className="text-right font-mono text-[14px] tabular-nums">
                      {fmtMoney(m.output, m.output % 1 ? 2 : 0)}
                    </span>
                    <span
                      className={`text-right font-mono text-[14px] font-bold tabular-nums ${
                        isMix ? "text-gold" : "text-sage"
                      }`}
                    >
                      {fmtMoney(eff, 2)}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-dim/80">
              * цены публичного API Claude, I квартал 2026; эффективный курс —
              blended-цена миллиона токенов при пропорции ввод:вывод 3:1.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <Receipt />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
