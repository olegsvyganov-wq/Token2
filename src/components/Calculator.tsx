import { useState } from "react";
import type { CSSProperties } from "react";
import {
  effRate,
  fmtInt,
  fmtMoney,
  MODELS,
  modelById,
  PAGE_WORDS,
  RUB_PER_USD,
  WAR_AND_PEACE_WORDS,
  WORDS_PER_TOKEN,
} from "../data";
import type { ModelId } from "../data";
import { RefreshIcon } from "./Icons";
import { Reveal, SectionHead } from "./Reveal";

const fmtAuto = (n: number) =>
  fmtMoney(n, n >= 100 ? 0 : 2);

export function Calculator() {
  const [tokensM, setTokensM] = useState(10);
  const [modelId, setModelId] = useState<ModelId>("mix");
  const [inShare, setInShare] = useState(75);

  const model = modelById(modelId);
  const share = inShare / 100;
  const costH = tokensM * effRate(model, share);
  const opusCostH = tokensM * effRate(modelById("opus"), share);
  const ratio = Math.min(1, costH / opusCostH);
  const cheaper = (opusCostH / costH).toFixed(1).replace(".", ",");

  const words = tokensM * 1e6 * WORDS_PER_TOKEN;
  const pages = words / PAGE_WORDS;
  const books = words / WAR_AND_PEACE_WORDS;

  const tokensFill = ((tokensM - 0.5) / 19.5) * 100;
  const shareFill = ((inShare - 50) / 45) * 100;

  const reset = () => {
    setTokensM(10);
    setModelId("mix");
    setInShare(75);
  };

  return (
    <section id="calc" className="border-t border-line/70 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead
          num="04"
          title="Ваш тариф"
          sub="Соберите свой рабочий час из токенов: объём, модель и пропорция ввода к выводу. Калькулятор посчитает чек — по умолчанию стоит ровно то зачисление, что на телефоне."
        />

        <Reveal>
          <div className="grid gap-10 rounded-md border border-line bg-panel p-6 md:p-10 lg:grid-cols-[1fr_360px]">
            {/* управление */}
            <div className="space-y-9">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <label
                    htmlFor="tokens"
                    className="font-mono text-[11px] uppercase tracking-[0.22em] text-dim"
                  >
                    Объём
                  </label>
                  <span className="font-mono text-lg font-semibold tabular-nums text-gold">
                    {tokensM.toLocaleString("ru-RU", {
                      maximumFractionDigits: 1,
                    })}{" "}
                    млн токенов / час
                  </span>
                </div>
                <input
                  id="tokens"
                  type="range"
                  min={0.5}
                  max={20}
                  step={0.5}
                  value={tokensM}
                  onChange={(e) => setTokensM(Number(e.target.value))}
                  className="mt-2"
                  style={{ "--fill": `${tokensFill}%` } as CSSProperties}
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-dim/70">
                  <span>0,5М</span>
                  <span>5М</span>
                  <span>10М</span>
                  <span>15М</span>
                  <span>20М</span>
                </div>
              </div>

              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
                  Модель
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {MODELS.map((m) => {
                    const active = m.id === modelId;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setModelId(m.id)}
                        className={`rounded-md border px-3 py-2.5 text-left transition-all duration-200 ${
                          active
                            ? "border-gold bg-gold/10"
                            : "border-line hover:border-dim"
                        }`}
                      >
                        <span
                          className={`block text-[13px] font-bold ${
                            active ? "text-gold" : "text-ink"
                          }`}
                        >
                          {m.short}
                        </span>
                        <span className="mt-0.5 block font-mono text-[10px] tabular-nums text-dim">
                          ${m.input} / ${m.output} за 1М
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <label
                    htmlFor="share"
                    className="font-mono text-[11px] uppercase tracking-[0.22em] text-dim"
                  >
                    Ввод : вывод
                  </label>
                  <span className="font-mono text-[13px] font-semibold tabular-nums text-ink">
                    {inShare} / {100 - inShare}
                  </span>
                </div>
                <input
                  id="share"
                  type="range"
                  min={50}
                  max={95}
                  step={5}
                  value={inShare}
                  onChange={(e) => setInShare(Number(e.target.value))}
                  className="mt-2"
                  style={{ "--fill": `${shareFill}%` } as CSSProperties}
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-dim/70">
                  <span>50/50</span>
                  <span>больше ввода → дешевле</span>
                  <span>95/5</span>
                </div>
              </div>

              <button
                onClick={reset}
                className="group inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-dim transition-colors hover:text-gold"
              >
                <RefreshIcon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-180" />
                как в зачислении — 10М · Mix · 75/25
              </button>
            </div>

            {/* результат */}
            <div className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
                ваш чек за час
              </div>
              <div className="mt-2 font-display text-[42px] font-black leading-none tabular-nums text-gold">
                ≈ {fmtAuto(costH)}
              </div>
              <div className="mt-2 font-mono text-[12px] tabular-nums text-dim">
                {fmtMoney(costH / 60)} в минуту · курс{" "}
                {fmtMoney(effRate(model, share))}/1М
              </div>

              <dl className="mt-7 divide-y divide-line border-y border-line">
                {[
                  ["Сутки (24 ч)", fmtAuto(costH * 24)],
                  ["Месяц (30 д)", fmtAuto(costH * 24 * 30)],
                  [
                    `В рублях (≈${RUB_PER_USD} ₽/$)`,
                    fmtInt(costH * RUB_PER_USD) + " ₽/час",
                  ],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between py-3"
                  >
                    <dt className="text-[13.5px] text-dim">{k}</dt>
                    <dd className="font-mono text-[14px] font-semibold tabular-nums">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 text-[13px] leading-relaxed text-dim">
                Это ≈{" "}
                <span className="font-semibold text-ink">{fmtInt(words)}</span>{" "}
                слов — {fmtInt(pages)} страниц A4 или{" "}
                <span className="font-semibold text-gold">
                  {Math.round(books)} × «Война и мир»
                </span>{" "}
                за один час.
              </p>

              <div className="mt-6">
                <div className="flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-[0.16em] text-dim">
                  <span>относительно Opus 4.5</span>
                  <span className="text-coral">дешевле в {cheaper}×</span>
                </div>
                <div className="relative mt-2.5 h-2 overflow-hidden rounded-sm bg-line/50">
                  <div
                    className="h-full rounded-sm bg-coral transition-all duration-500 ease-out"
                    style={{ width: `${Math.max(3, ratio * 100)}%` }}
                  />
                  <span className="absolute inset-y-0 right-0 w-[2px] bg-ink/40" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
