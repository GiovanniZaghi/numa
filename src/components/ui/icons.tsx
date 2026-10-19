import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

export const CalendarIcon = (p: IconProps) => (
  <svg {...stroke} {...p}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
);
export const ClockIcon = (p: IconProps) => (
  <svg {...stroke} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const PinIcon = (p: IconProps) => (
  <svg {...stroke} {...p}><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" /><circle cx="12" cy="9" r="2.5" /></svg>
);
export const CheckIcon = (p: IconProps) => (
  <svg {...stroke} strokeWidth={3} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const ArrowRightIcon = (p: IconProps) => (
  <svg {...stroke} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const PlusIcon = (p: IconProps) => (
  <svg {...stroke} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const CopyIcon = (p: IconProps) => (
  <svg {...stroke} {...p}><rect x="9" y="9" width="12" height="12" rx="2.5" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
);
export const MenuIcon = (p: IconProps) => (
  <svg {...stroke} {...p}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
);
export const CloseIcon = (p: IconProps) => (
  <svg {...stroke} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const SparkleIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2c.4 4.6 2.9 7.4 8 8-5.1.6-7.6 3.4-8 8-.4-4.6-2.9-7.4-8-8 5.1-.6 7.6-3.4 8-8Z" />
  </svg>
);
export const WhatsAppIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.47 15.03L2.5 21.5l4.6-1.05A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-2.73.62.64-2.65-.2-.32a8.2 8.2 0 1 1 6.77 3.68Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.48a.92.92 0 0 0-.66.31 2.78 2.78 0 0 0-.87 2.07 4.83 4.83 0 0 0 1.01 2.56 11.06 11.06 0 0 0 4.23 3.74c1.58.68 2.2.74 2.99.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);
export const InstagramIcon = (p: IconProps) => (
  <svg {...stroke} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></svg>
);
