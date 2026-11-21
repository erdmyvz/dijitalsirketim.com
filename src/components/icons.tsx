/**
 * Sitede kullanılan ikonlar. Harici ikon paketi yok: her biri tek bir
 * inline SVG, `currentColor` ile renkleniyor ve 16-24 px arasında
 * okunaklı kalacak kadar sade çiziliyor.
 */
type IkonProps = { className?: string; strokeWidth?: number };

function Govde({
  className = "h-5 w-5",
  strokeWidth = 1.6,
  children,
}: IkonProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconOk(p: IkonProps) {
  return (
    <Govde {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Govde>
  );
}

export function IconTik(p: IkonProps) {
  return (
    <Govde {...p}>
      <path d="M4 12.5l5 5L20 6.5" />
    </Govde>
  );
}

export function IconArti(p: IkonProps) {
  return (
    <Govde {...p}>
      <path d="M12 5v14M5 12h14" />
    </Govde>
  );
}

/** Reklam performansı: yükselen sütunlar. */
export function IconGrafik(p: IkonProps) {
  return (
    <Govde {...p}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 20v-5M12.5 20v-9M17 20v-6" />
    </Govde>
  );
}

/** Müşteri çalışma alanları: üst üste kartlar. */
export function IconKatmanlar(p: IkonProps) {
  return (
    <Govde {...p}>
      <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" />
      <path d="M4 12.5l8 4.5 8-4.5" />
      <path d="M4 17l8 4.5 8-4.5" />
    </Govde>
  );
}

/** Ortak gelen kutusu: konuşma balonu. */
export function IconMesaj(p: IkonProps) {
  return (
    <Govde {...p}>
      <path d="M20 14.5a2.5 2.5 0 01-2.5 2.5H8l-4 3.5v-14A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v8z" />
    </Govde>
  );
}

/** Rakip reklamları: büyüteç. */
export function IconBuyutec(p: IkonProps) {
  return (
    <Govde {...p}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </Govde>
  );
}

/** Rakip video araştırması: oynatma çerçevesi. */
export function IconVideo(p: IkonProps) {
  return (
    <Govde {...p}>
      <rect x="3.5" y="5" width="17" height="14" rx="3" />
      <path d="M10.5 9.5l4.5 2.5-4.5 2.5v-5z" />
    </Govde>
  );
}

export function IconWhatsapp({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 012.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.23 8.23 0 01-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24zm-2.6 4.1c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.6c.13.17 1.76 2.68 4.27 3.76.6.26 1.06.41 1.42.52.6.19 1.14.17 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.1-.23-.17-.48-.29-.25-.12-1.47-.73-1.7-.81-.23-.09-.4-.13-.56.12-.17.25-.64.81-.79.98-.14.16-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.38-1.73-.15-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.55-1.35-.76-1.84-.2-.48-.4-.42-.55-.42h-.5z" />
    </svg>
  );
}
