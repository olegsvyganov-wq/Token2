export type ModelId = "haiku" | "sonnet" | "opus" | "mix";

export interface ModelInfo {
  id: ModelId;
  name: string;
  short: string;
  input: number; // $ за 1М токенов ввода
  output: number; // $ за 1М токенов вывода
  ctx: string;
  note: string;
}

export const MODELS: ModelInfo[] = [
  {
    id: "opus",
    name: "Claude Opus 4.5",
    short: "OPUS",
    input: 5,
    output: 25,
    ctx: "200K",
    note: "флагман — рассуждения, агенты, сложный код",
  },
  {
    id: "sonnet",
    name: "Claude Sonnet 4.5",
    short: "SONNET",
    input: 3,
    output: 15,
    ctx: "200K · 1M β",
    note: "баланс цены и качества, основная рабочая лошадка",
  },
  {
    id: "haiku",
    name: "Claude Haiku 4.5",
    short: "HAIKU",
    input: 1,
    output: 5,
    ctx: "200K",
    note: "мгновенные ответы, классификация, поддержка",
  },
  {
    id: "mix",
    name: "Mix AEI",
    short: "MIX",
    input: 3.9,
    output: 7.5,
    ctx: "—",
    note: "усреднённый портфель запросов — как в зачислении",
  },
];

export const modelById = (id: ModelId): ModelInfo =>
  MODELS.find((m) => m.id === id) ?? MODELS[0];

/** Смешанная цена $/1М при доле ввода inputShare (0..1). */
export const effRate = (m: ModelInfo, inputShare: number): number =>
  m.input * inputShare + m.output * (1 - inputShare);

export const RUB_PER_USD = 92;
/** ≈ 1,9 трлн токенов в сутки в мире → токенов в секунду (иллюстративная оценка). */
export const RATE_PER_SEC = 1_900_000_000_000 / 86_400;

export const WORDS_PER_TOKEN = 0.75;
export const WAR_AND_PEACE_WORDS = 580_000;
export const PAGE_WORDS = 300;

export type IconName =
  | "code"
  | "flow"
  | "chart"
  | "pen"
  | "headset"
  | "flask"
  | "doc";

export interface TaskTemplate {
  text: string;
  icon: IconName;
}

export const TASKS: TaskTemplate[] = [
  { text: "Рефакторинг платёжного модуля", icon: "code" },
  { text: "Генерация unit-тестов", icon: "code" },
  { text: "Миграция легаси-кода", icon: "code" },
  { text: "Генерация OpenAPI-спеки", icon: "code" },
  { text: "Разбор инцидента по логам", icon: "chart" },
  { text: "SQL-запросы к витрине продаж", icon: "chart" },
  { text: "Сводка по A/B-тесту", icon: "chart" },
  { text: "Саммари квартального отчёта", icon: "doc" },
  { text: "Перевод технической документации", icon: "pen" },
  { text: "Черновик рассылки для клиентов", icon: "pen" },
  { text: "Классификация тикетов поддержки", icon: "headset" },
  { text: "Ответы в чате поддержки", icon: "headset" },
  { text: "Парсинг научных статей", icon: "flask" },
  { text: "Оптимизация промпт-шаблонов", icon: "flow" },
];

export const FEED_MODELS: ModelId[] = [
  "sonnet",
  "sonnet",
  "sonnet",
  "haiku",
  "opus",
  "mix",
];

export interface Category {
  name: string;
  pct: number;
  icon: IconName;
  note: string;
}

export const CATEGORIES: Category[] = [
  {
    name: "Программирование",
    pct: 37.2,
    icon: "code",
    note: "генерация, ревью и отладка кода — крупнейшая статья расхода токенов",
  },
  {
    name: "Бизнес-операции",
    pct: 15.8,
    icon: "flow",
    note: "процессы, отчёты, автоматизация рутин",
  },
  {
    name: "Анализ и исследования",
    pct: 13.4,
    icon: "chart",
    note: "данные, SQL, поиск инсайтов",
  },
  {
    name: "Тексты и коммуникация",
    pct: 12.1,
    icon: "pen",
    note: "письма, документация, контент",
  },
  {
    name: "Поддержка клиентов",
    pct: 9.7,
    icon: "headset",
    note: "первая линия и маршрутизация обращений",
  },
  {
    name: "Наука и образование",
    pct: 7.0,
    icon: "flask",
    note: "разбор статей, обучение, гипотезы",
  },
  {
    name: "Прочее",
    pct: 4.8,
    icon: "doc",
    note: "личные задачи и длинные хвосты",
  },
];

export const TICKER_ITEMS: string[] = [
  "OPUS 4.5 · $5 / $25 за 1М токенов",
  "SONNET 4.5 · $3 / $15 за 1М",
  "HAIKU 4.5 · $1 / $5 за 1М",
  "эффективный курс зачисления · $4.80/1М",
  "10 000 000 токенов ≈ $48/час",
  "1 токен ≈ 0,75 слова по-русски",
  "10М токенов ≈ 13 × «Война и мир»",
  "в мире ≈ 2,2 трлн токенов в сутки",
  "код забирает ~37% мирового потока",
];

/* ---------- форматирование ---------- */

export const fmtInt = (n: number): string =>
  Math.round(n).toLocaleString("ru-RU");

export const fmtMoney = (n: number, digits = 2): string =>
  "$" +
  n.toLocaleString("ru-RU", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export const fmtCompact = (n: number): string => {
  if (n >= 1e12)
    return (
      (n / 1e12).toLocaleString("ru-RU", { maximumFractionDigits: 1 }) + " трлн"
    );
  if (n >= 1e9)
    return (
      (n / 1e9).toLocaleString("ru-RU", { maximumFractionDigits: 1 }) + " млрд"
    );
  if (n >= 1e6)
    return (
      (n / 1e6).toLocaleString("ru-RU", { maximumFractionDigits: 1 }) + " млн"
    );
  return fmtInt(n);
};

export const timeNow = (): string =>
  new Date().toLocaleTimeString("ru-RU", { hour12: false });
