import { useState } from "react";
import { fmtInt, fmtMoney, timeNow } from "../data";
import { useTween } from "../hooks";
import { BatteryIcon, BoltIcon, SignalIcon, WifiIcon } from "./Icons";

const EFFECTIVE = 4.8;

interface Credit {
  id: number;
  amount: number;
  time: string;
}

export function Phone() {
  const [credits, setCredits] = useState<Credit[]>([
    { id: 0, amount: 10_000_000, time: timeNow() },
  ]);
  const [total, setTotal] = useState(10_000_000);
  const [pop, setPop] = useState(0);

  const latest = credits[0];
  const shown = useTween(latest.amount, 950);
  const perHour = Math.round((latest.amount / 1e6) * EFFECTIVE);

  const credit = () => {
    const amount = Math.round((6 + Math.random() * 8) / 0.25) * 250_000;
    setCredits((c) =>
      [{ id: (c[0]?.id ?? 0) + 1, amount, time: timeNow() }, ...c].slice(0, 3),
    );
    setTotal((t) => t + amount);
    setPop((p) => p + 1);
  };

  return (
    <div className="relative h-[600px] w-[296px] shrink-0 rounded-[44px] border-8 border-[#33302a] bg-[#161512] shadow-[0_30px_70px_rgba(0,0,0,0.55)]">
      {/* камера */}
      <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />

      <div className="flex h-full w-full flex-col overflow-hidden rounded-[36px] bg-paper text-inkdark">
        {/* статус-бар */}
        <div className="flex items-center justify-between px-5 pt-3 font-mono text-[11px] text-inkdark/80">
          <span className="tabular-nums">{timeNow().slice(0, 5)}</span>
          <span className="flex items-center gap-1.5">
            <SignalIcon className="h-3.5 w-3.5" />
            <WifiIcon className="h-3.5 w-3.5" />
            <BatteryIcon className="h-4 w-4" />
          </span>
        </div>

        {/* шапка приложения */}
        <div className="mt-3 flex items-center justify-between px-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8a8574]">
            AEI · кошелёк
          </span>
          <span className="rounded-full border border-[#d8d0ba] px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#8a8574]">
            основной счёт
          </span>
        </div>

        {/* тело уведомления */}
        <div className="flex flex-1 flex-col items-center justify-center px-5">
          <div className="flex items-center gap-2">
            <span className="h-1 w-4 rounded-full bg-gold" />
            <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#7b7462]">
              Новое зачисление
            </span>
            <span className="h-1 w-4 rounded-full bg-gold" />
          </div>

          <div key={pop} className={`mt-5 ${pop > 0 ? "coin-pop" : ""}`}>
            <div className="[perspective:620px]">
              <div className="coin3d relative h-24 w-24">
                <div className="coin-face flex items-center justify-center border-4 border-[#b9821f]/50 bg-gradient-to-br from-[#f4d382] via-[#e8b54d] to-[#c08a2b] shadow-[0_10px_22px_rgba(154,110,30,0.4)]">
                  <span className="absolute inset-2 rounded-full border border-[#8a6114]/40" />
                  <BoltIcon className="h-10 w-10 text-[#6d4a12]" />
                </div>
                <div className="coin-face coin-back flex items-center justify-center border-4 border-[#b9821f]/50 bg-gradient-to-br from-[#e0aa3e] via-[#d29c33] to-[#a9761f] shadow-[0_10px_22px_rgba(154,110,30,0.4)]">
                  <span className="absolute inset-2 rounded-full border border-[#8a6114]/40" />
                  <span className="font-display text-2xl font-black text-[#6d4a12]">
                    T
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 font-display text-[27px] font-extrabold tabular-nums leading-none">
            {fmtInt(shown)}
          </div>
          <div className="mt-1.5 text-[13px] text-[#8a8574]">токенов</div>

          <div className="mt-3.5 rounded-full bg-gold px-4 py-1 text-[13px] font-bold text-[#4a3608] shadow-[0_4px_12px_rgba(232,181,77,0.45)]">
            ≈ ${perHour}/час
          </div>
          <div className="mt-2 font-mono text-[10.5px] tracking-[0.12em] text-[#a39c88]">
            ANTHROPIC ECONOMIC INDEX
          </div>

          <div className="my-4 w-full border-t border-dashed border-[#d3cab2]" />

          {/* история */}
          <div className="w-full space-y-1.5">
            {credits.map((c, i) => (
              <div
                key={c.id}
                className={`flex items-center justify-between text-[11.5px] ${
                  i === 0 ? "row-in" : ""
                }`}
              >
                <span className="font-mono font-semibold text-[#2f6b46]">
                  + {fmtInt(c.amount)}
                </span>
                <span className="font-mono text-[#8a8574]">
                  {fmtMoney((c.amount / 1e6) * EFFECTIVE)} · {c.time}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex w-full items-center justify-between rounded-lg bg-[#ece4cf] px-3 py-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8a8574]">
              Баланс сессии
            </span>
            <span className="font-mono text-[12px] font-bold tabular-nums">
              {fmtInt(total)} ток.
            </span>
          </div>
        </div>

        <button
          onClick={credit}
          className="mx-5 mb-5 flex items-center justify-center gap-2 rounded-xl bg-inkdark py-3 text-[13px] font-bold uppercase tracking-[0.14em] text-paper transition-all duration-200 hover:bg-[#2c3a31] active:scale-[0.97]"
        >
          <BoltIcon className="h-3.5 w-3.5 text-gold" />
          Зачислить ещё
        </button>
      </div>
    </div>
  );
}
