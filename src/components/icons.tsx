// Tek bir çizgi-ikon seti: emoji yerine tutarlı, markaya bağlı kalmayan
// (currentColor) SVG ikonlar. Hepsi 24x24 viewBox, 1.75 stroke kalınlığı,
// yuvarlak uç/köşe — Apple/San Francisco ikonografisiyle uyumlu sade çizgi.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconX(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12 5 5 9-10" />
    </svg>
  );
}

export function IconCheckCircle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx={12} cy={12} r={9} />
      <path d="m8 12.5 2.5 2.5L16 9.5" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx={11} cy={11} r={7} />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function IconClipboard(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x={6} y={4} width={12} height={17} rx={2} />
      <rect x={9} y={2.5} width={6} height={3.5} rx={1} />
      <path d="M9 12h6M9 15.5h6" />
    </svg>
  );
}

export function IconPill(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect
        x={3.5}
        y={9}
        width={17}
        height={6}
        rx={3}
        transform="rotate(-45 12 12)"
      />
      <path d="M9.5 14.5 14.5 9.5" />
    </svg>
  );
}

export function IconTrendingUp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

export function IconCompass(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx={12} cy={12} r={9} />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  );
}

export function IconBarChart(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 20v-7M12 20V6M18 20v-11" />
    </svg>
  );
}

export function IconEye(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
      <circle cx={12} cy={12} r={2.75} />
    </svg>
  );
}

export function IconMessageCircle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function IconStethoscope(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3v6a4 4 0 0 0 8 0V3" />
      <path d="M10 13v2a5 5 0 0 0 10 0v-2.5" />
      <circle cx={20} cy={11} r={1.5} />
      <circle cx={6} cy={3} r={1.25} />
      <circle cx={14} cy={3} r={1.25} />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
