"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * İçeriği, görünür alana girdiğinde hafifçe belirip yükselterek
 * gösterir.
 *
 * Kritik tasarım kararı: içerik **varsayılan olarak görünür** render
 * edilir, animasyon sonradan JavaScript ile eklenir. Tersi (opacity-0
 * başlayıp gözlemciyi beklemek) sayfayı kırılgan yapıyor — iki kez
 * yaşadık:
 *
 *   1. Gözlemci bağlanmadan önce bölümün üstünden geçildiğinde içerik
 *      bir daha hiç görünmüyordu.
 *   2. Çapa bağlantısıyla sayfanın ortasına atlandığında, atlanan
 *      blokların kesişim oranı 0'dan 0'a gittiği için IntersectionObserver
 *      HİÇ tetiklenmiyor ve o bloklar kalıcı olarak gizli kalıyordu.
 *
 * Bu yüzden üç katmanlı bir güvence var:
 *   - Sunucudan gelen HTML görünür; JavaScript hiç çalışmasa da okunur.
 *   - Yalnızca ekranın ALTINDA kalan bloklar gizlenir (gizleme ekran
 *     dışında olduğu için göze çarpmaz) ve gözlemciyle geri getirilir.
 *   - Gözlemcinin kaçırdığı durumlar için TEK bir ortak kaydırma
 *     süpürücüsü: görünür alanın üstünde kalmış hiçbir blok gizli
 *     bırakılmaz.
 *
 * Gizleme React state'i ile değil doğrudan sınıf ekleyerek yapılıyor:
 * hidrasyon uyuşmazlığı olmuyor ve effect içinde setState gerekmiyor.
 */

const GIZLI = "reveal-gizli";

/** Henüz açılmamış bloklar. Süpürücü yalnızca bu küme doluyken çalışır. */
const bekleyenler = new Set<HTMLElement>();
let supurucuBagli = false;
let kareBekliyor = false;

function ac(el: HTMLElement) {
  el.classList.remove(GIZLI);
  bekleyenler.delete(el);
  if (bekleyenler.size === 0 && supurucuBagli) {
    window.removeEventListener("scroll", kareyeAl);
    window.removeEventListener("resize", kareyeAl);
    supurucuBagli = false;
  }
}

function supur() {
  kareBekliyor = false;
  const alt = window.innerHeight;
  for (const el of [...bekleyenler]) {
    const k = el.getBoundingClientRect();
    // Görünür alana girdiyse ya da tamamen üstünde kaldıysa aç.
    if (k.top < alt * 0.94 || k.bottom < 0) ac(el);
  }
}

function kareyeAl() {
  if (kareBekliyor) return;
  kareBekliyor = true;
  requestAnimationFrame(supur);
}

function supurucuyuBagla() {
  if (supurucuBagli) return;
  supurucuBagli = true;
  window.addEventListener("scroll", kareyeAl, { passive: true });
  window.addEventListener("resize", kareyeAl, { passive: true });

  // Sayfa bir çapa bağlantısıyla (ör. /#gorusme) açıldığında tarayıcının
  // kaydırması effect'lerden SONRA gerçekleşiyor: o anda ölçülen konum
  // yanlış oluyor ve yukarıda kalan bloklar gizli takılıyor. Kaydırma
  // olayı da her zaman tetiklenmiyor, bu yüzden ilk saniyede birkaç kez
  // kendimiz bakıyoruz.
  for (const ms of [120, 450, 1200]) setTimeout(supur, ms);
}

export default function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Ölçüm bilerek geciktiriliyor. Sayfa bir çapa bağlantısıyla
    // (ör. /#gorusme) açıldığında tarayıcının o noktaya kaydırması
    // effect'lerden SONRA gerçekleşiyor; hemen ölçersek sayfanın
    // tepesindeymişiz gibi görünüyor ve çapanın üstünde kalan bütün
    // bloklar yanlışlıkla gizleniyordu. Bu kısa bekleme boyunca içerik
    // zaten görünür durumda — kaybedilen tek şey, ilk 250 ms içinde
    // kaydıran birinin o blokta animasyonu görmemesi.
    let gozlemci: IntersectionObserver | null = null;

    const zamanlayici = window.setTimeout(() => {
      const kutu = el.getBoundingClientRect();
      // Zaten görünür alandaysa ya da üstünde kaldıysa dokunma:
      // gizleyip geri getirmek yanıp sönme etkisi yaratır.
      if (kutu.top < window.innerHeight * 0.92) return;

      el.classList.add(GIZLI);
      bekleyenler.add(el);
      supurucuyuBagla();

      gozlemci = new IntersectionObserver(
        ([giris]) => {
          if (!giris.isIntersecting) return;
          ac(el);
          gozlemci?.disconnect();
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      gozlemci.observe(el);
    }, 250);

    return () => {
      window.clearTimeout(zamanlayici);
      gozlemci?.disconnect();
      bekleyenler.delete(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}
