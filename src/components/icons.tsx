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

export function IconHeartPulse(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12h3l2-5 3 10 2-7 1.5 2H21" />
      <path d="M19.5 13.5c1-1 1.5-2 1.5-3.2A3.3 3.3 0 0 0 17.5 7c-1 0-1.9.4-2.5 1.2A3.3 3.3 0 0 0 12.5 7 3.3 3.3 0 0 0 9.2 10.3c0 3.5 5.3 7 5.3 7s.9-.6 2-1.6" />
    </svg>
  );
}

export function IconAlertTriangle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4 3 20h18L12 4Z" />
      <path d="M12 10.5v4.25M12 17.5h.01" />
    </svg>
  );
}

// ---------------------------------------------------------------------
// 7 fonksiyon ikonları (2026-09-11)
// ---------------------------------------------------------------------
// Aşağıdaki yedi ikon, check-up'taki 7 iş fonksiyonuna birebir karşılık
// gelir. Amaç jenerik "büyüteç / pano" ikonlarından çıkıp her fonksiyonu
// kendi görselinden tanınır yapmak — "işletmenin organları" fikri ancak
// organlar birbirinden ayırt edilebilirse çalışır.
//
// Hepsi 20px'te okunacak şekilde sade tutuldu: ayrıntı eklemek küçük
// boyutta ikonu tanınmaz bir lekeye çeviriyor.

/** Müşteri Bulma — temasların süzüldüğü huni. */
export function IconFunnel(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z" />
    </svg>
  );
}

/** Satış — fiyat etiketi (teklif). */
export function IconTag(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M11.6 3H20a1 1 0 0 1 1 1v8.4a1 1 0 0 1-.3.7l-7.6 7.6a1 1 0 0 1-1.4 0l-8.4-8.4a1 1 0 0 1 0-1.4l7.6-7.6a1 1 0 0 1 .7-.3Z" />
      <circle cx="16.4" cy="7.6" r="1.3" />
    </svg>
  );
}

/** Operasyon — dönen dişli. */
export function IconGear(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.3 5.3l1.9 1.9M16.8 16.8l1.9 1.9M18.7 5.3l-1.9 1.9M7.2 16.8l-1.9 1.9" />
    </svg>
  );
}

/** Ürün Geliştirme — katmanlar. */
export function IconLayers(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  );
}

/** Para Yönetimi — banknot. */
export function IconBanknote(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 9.6v4.8M18 9.6v4.8" />
    </svg>
  );
}

/** Karar Alma — ikiye ayrılan yol. */
export function IconFork(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21v-6.5" />
      <path d="M12 14.5 6 8.5v-4" />
      <path d="m12 14.5 6-6v-4" />
      <path d="m4 6.5 2-2 2 2" />
      <path d="m16 6.5 2-2 2 2" />
    </svg>
  );
}

/** Ekip Kurma — iki kişi. */
export function IconTeam(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0" />
      <circle cx="17.6" cy="9.6" r="2.2" />
      <path d="M17.2 14.3a4.9 4.9 0 0 1 4 4.5" />
    </svg>
  );
}
