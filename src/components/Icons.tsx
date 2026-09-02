import type { IconName } from "../data";

interface IconProps {
  className?: string;
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const BoltIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M13 2 4.5 13.5H11L9.5 22 19.5 9.5H12.5L13 2Z"
      fill="currentColor"
    />
  </svg>
);

export const SignalIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M5 19v-3M10 19v-6.5M15 19V9M20 19V5.5" />
  </svg>
);

export const WifiIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M4 9.6C8.6 5.2 15.4 5.2 20 9.6" />
    <path d="M7.2 13c2.7-2.6 6.9-2.6 9.6 0" />
    <circle cx="12" cy="16.8" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const BatteryIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <rect x="2.5" y="8" width="16" height="9" rx="2" />
    <path d="M21.5 11v3" />
    <rect x="5" y="10.4" width="9" height="4.2" rx="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export const CodeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="m8 6-5 6 5 6M16 6l5 6-5 6" />
  </svg>
);

export const FlowIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <circle cx="6" cy="6.5" r="2.5" />
    <circle cx="18" cy="17.5" r="2.5" />
    <path d="M6 9v3.5a4 4 0 0 0 4 4h5.5" />
  </svg>
);

export const ChartIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M3.5 20h17" />
    <path d="M6 20v-6M11 20V5.5M16 20v-9M21 20v-12.5" transform="translate(-1.5 0)" />
  </svg>
);

export const PenIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="m4 20 1.2-4.2L16.5 4.5a2.12 2.12 0 0 1 3 3L8.2 18.8 4 20Z" />
    <path d="m14.5 6.5 3 3" />
  </svg>
);

export const HeadsetIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M4 14.5v-2.5a8 8 0 0 1 16 0v2.5" />
    <rect x="3.5" y="13.5" width="4" height="6" rx="1.6" />
    <rect x="16.5" y="13.5" width="4" height="6" rx="1.6" />
    <path d="M19 19.5v.5a3 3 0 0 1-3 3h-3" />
  </svg>
);

export const FlaskIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M10 3v6L4.8 18a2.4 2.4 0 0 0 2.1 3.5h10.2a2.4 2.4 0 0 0 2.1-3.5L14 9V3" />
    <path d="M8.5 3h7M7.3 14.5h9.4" />
  </svg>
);

export const DocIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 8h6M9 12h6M9 16h4" />
  </svg>
);

export const RefreshIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M4.5 12a7.5 7.5 0 0 1 12.8-5.3L19.5 8.5" />
    <path d="M19.5 4v4.5H15" />
    <path d="M19.5 12a7.5 7.5 0 0 1-12.8 5.3L4.5 15.5" />
    <path d="M4.5 20v-4.5H9" />
  </svg>
);

export const ArrowUpRightIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" />
  </svg>
);

export const ArrowDownIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M12 4.5v14M6.5 13l5.5 5.5L17.5 13" />
  </svg>
);

export const LogoMark = ({ className }: IconProps) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <circle
      cx="16"
      cy="16"
      r="13.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M18.2 6.5 10 17.4h5.2l-1.4 8.1 8.4-11.4h-5.6l1.6-7.6Z" fill="currentColor" />
  </svg>
);

/** Золотая монета-токен для фоновых элементов. */
export const Coin = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <circle cx="24" cy="24" r="22" fill="#e8b54d" />
    <circle
      cx="24"
      cy="24"
      r="17"
      fill="none"
      stroke="#a5741a"
      strokeWidth="1.6"
      strokeDasharray="3 3"
    />
    <path
      d="M26.6 10.5 15.5 25h7l-1.9 12.5L33.5 22h-7.2l2-11.5Z"
      fill="#7a5714"
    />
  </svg>
);

export const CategoryIcon = ({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) => {
  switch (name) {
    case "code":
      return <CodeIcon className={className} />;
    case "flow":
      return <FlowIcon className={className} />;
    case "chart":
      return <ChartIcon className={className} />;
    case "pen":
      return <PenIcon className={className} />;
    case "headset":
      return <HeadsetIcon className={className} />;
    case "flask":
      return <FlaskIcon className={className} />;
    default:
      return <DocIcon className={className} />;
  }
};
