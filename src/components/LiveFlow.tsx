import { useEffect, useState } from "react";
import {
  effRate,
  FEED_MODELS,
  fmtInt,
  fmtMoney,
  modelById,
  TASKS,
} from "../data";
import type { ModelId, TaskTemplate } from "../data";
import { CategoryIcon } from "./Icons";
import { Reveal, SectionHead } from "./Reveal";

interface Row {
  id: number;
  time: string;
  task: TaskTemplate;
  model: ModelId;
  tokens: number;
  cost: number;
}

let uid = 1;

function makeRow(offsetSec = 0): Row {
  const task = TASKS[Math.floor(Math.random() * TASKS.length)];
  const model = FEED_MODELS[Math.floor(Math.random() * FEED_MODELS.length)];
  const tokens = Math.round((0.2 + Math.random() * 3.8) * 20) * 50_000;
  const cost = (tokens / 1e6) * effRate(modelById(model), 0.75);
  const t = new Date(Date.now() - offsetSec * 1000);
  return {
    id: uid++,
    time: t.toLocaleTimeString("ru-RU", { hour12: false }),
    task,
    model,
    tokens,
    cost,
  };
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

function Spark({ data }: { data: number[] }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 320;
    const y = 78 - ((v - min) / span) * 64;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg viewBox="0 0 320 84" className="h-20 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8b54d" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#e8b54d" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`M0,84 L${pts.join(" L")} L320,84 Z`}
        fill="url(#sparkfill)"
      />
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="#e8b54d"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LiveFlow() {
  const [rows, setRows] = useState<Row[]>(() =>
    [14, 10.5, 7, 3.5, 0].map((s) => makeRow(s)),
  );
  const [totals, setTotals] = useState(() => ({
    tokens: rows.reduce((a, r) => a + r.tokens, 0),
    cost: rows.reduce((a, r) => a + r.cost, 0),
    count: rows.length,
  }));
  const [spark, setSpark] = useState<number[]>(() => {
    const arr: number[] = [];
    let v = 22_000_000;
    for (let i = 0; i < 36; i++) {
      v = clamp(v + (Math.random() - 0.5) * 2_400_000, 16e6, 28e6);
      arr.push(v);
    }
    return arr;
  });

  useEffect(() => {
    const id = window.setInterval(() => {
      const row = makeRow();
      setRows((r) => [row, ...r].slice(0, 8));
      setTotals((t) => ({
        tokens: t.tokens + row.tokens,
        cost: t.cost + row.cost,
        count: t.count + 1,
      }));
      setSpark((s) => {
        const last = s[s.length - 1];
        return [
          ...s.slice(1),
          clamp(last + (Math.random() - 0.5) * 2_600_000, 16e6, 28e6),
        ];
      });
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  const current = spark[spark.length - 1];

  return (
    <section
      id="flow"
      className="border-t border-line/70 py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead
          num="01"
          title="Живой поток"
          sub="Зачисления токенов идут непрерывно: каждые несколько секунд в ленте появляется новая задача — от рефакторинга до разбора логов. Лента обновляется сама."
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="overflow-hidden rounded-md border border-line bg-panel">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="flex items-center gap-2.5 text-sm font-bold">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-sage" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sage" />
                  </span>
                  Лента зачислений
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-dim">
                  интервал ~3 c
                </span>
              </div>

              <ul className="divide-y divide-line/60">
                {rows.slice(0, 7).map((r, i) => (
                  <li
                    key={r.id}
                    className={`flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-panel2 ${
                      i === 0 ? "row-in" : ""
                    }`}
                  >
                    <span className="w-16 shrink-0 font-mono text-[11px] tabular-nums text-dim">
                      {r.time}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-line text-gold">
                      <CategoryIcon name={r.task.icon} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-medium">
                        {r.task.text}
                      </span>
                      <span className="mt-0.5 inline-block rounded-sm border border-line px-1.5 py-px font-mono text-[9.5px] uppercase tracking-[0.14em] text-dim">
                        {r.model}
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block font-mono text-[13px] font-semibold tabular-nums">
                        {fmtInt(r.tokens)}
                      </span>
                      <span className="block font-mono text-[11.5px] tabular-nums text-gold">
                        ≈ {fmtMoney(r.cost)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between border-t border-line bg-panel2/60 px-5 py-3 font-mono text-[12px] tabular-nums">
                <span className="text-dim">
                  за сессию:{" "}
                  <span className="font-semibold text-ink">
                    {fmtInt(totals.tokens)}
                  </span>{" "}
                  токенов
                </span>
                <span className="font-semibold text-gold">
                  ≈ {fmtMoney(totals.cost)}
                </span>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={120}>
              <div className="rounded-md border border-line bg-panel p-5">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-dim">
                  токенов в секунду · мир
                </div>
                <div className="mt-2 font-mono text-2xl font-semibold tabular-nums text-ink">
                  {(current / 1e6).toLocaleString("ru-RU", {
                    maximumFractionDigits: 1,
                  })}
                  <span className="ml-1.5 text-sm font-normal text-dim">
                    млн/с
                  </span>
                </div>
                <div className="mt-3">
                  <Spark data={spark} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="rounded-md border border-line bg-panel p-5">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-dim">
                  сводка сессии
                </div>
                <dl className="mt-3 divide-y divide-line/60 text-[13.5px]">
                  {[
                    ["Зачислений", String(totals.count)],
                    ["Средний чек", fmtInt(totals.tokens / totals.count)],
                    [
                      "Средний курс",
                      "$" +
                        (totals.cost / (totals.tokens / 1e6)).toLocaleString(
                          "ru-RU",
                          { maximumFractionDigits: 2 },
                        ) +
                        "/1М",
                    ],
                    [
                      "Самая дорогая модель",
                      "Opus · $25/1М вывод",
                    ],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between py-2.5"
                    >
                      <dt className="text-dim">{k}</dt>
                      <dd className="font-mono font-semibold tabular-nums">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
