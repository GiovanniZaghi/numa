"use client";

import { useSyncExternalStore } from "react";

function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}

const nowInSeconds = () => Math.floor(Date.now() / 1000);

function useNowInSeconds(): number | null {
  return useSyncExternalStore(subscribe, nowInSeconds, () => null);
}

const units = [
  { label: "dias", seconds: 86_400 },
  { label: "horas", seconds: 3_600 },
  { label: "min", seconds: 60 },
  { label: "seg", seconds: 1 },
] as const;

export function Countdown({ target, eventName }: { target: Date; eventName: string }) {
  const now = useNowInSeconds();
  const targetSeconds = Math.floor(target.getTime() / 1000);
  const remaining = now === null ? null : Math.max(0, targetSeconds - now);

  if (remaining === 0) {
    return <p className="font-script text-4xl">É hoje! Nos vemos na {eventName}.</p>;
  }

  return (
    <dl className="flex gap-2.5 sm:gap-3" aria-label="Contagem regressiva para o evento">
      {units.map(({ label, seconds }, index) => {
        const value =
          remaining === null
            ? null
            : Math.floor((index === 0 ? remaining : remaining % units[index - 1].seconds) / seconds);
        return (
          <div
            key={label}
            className="flex min-w-16 flex-col items-center rounded-2xl border border-white/20 bg-white/10 px-3 py-2.5 backdrop-blur-sm sm:min-w-[4.5rem]"
          >
            <dd className="text-2xl font-semibold tabular-nums sm:text-3xl">
              {value === null ? "--" : String(value).padStart(2, "0")}
            </dd>
            <dt className="text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase">{label}</dt>
          </div>
        );
      })}
    </dl>
  );
}
