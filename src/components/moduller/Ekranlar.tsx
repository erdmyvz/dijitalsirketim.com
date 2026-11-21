/**
 * Modül kartlarının içindeki örnek ekranlar.
 *
 * Hepsi kodla çiziliyor — ekran görüntüsü yapıştırılmıyor — ki dar
 * ekranda da bozulmasın ve metin gerçekten seçilebilir olsun.
 *
 * Buradaki BÜTÜN sayılar örnektir ve gerçek bir müşteriye ait değildir.
 * Her ekranın köşesinde "Örnek ekran" rozeti var: uydurma veriyi gerçek
 * sonuç gibi göstermemek, projenin değişmez kurallarından biri.
 */

function OrnekRozeti() {
  return (
    <span className="rounded-full border border-cizgi bg-zemin/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
      Örnek ekran
    </span>
  );
}

function Cerceve({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-cizgi bg-zemin p-4 sm:p-5 ${className}`}
    >
      <div className="absolute right-3 top-3 z-10">
        <OrnekRozeti />
      </div>
      {children}
    </div>
  );
}

/* ---------------------------------------------- 1 · Reklam performansı */

const SUTUNLAR = [
  { yuzde: 38, kazanan: false },
  { yuzde: 52, kazanan: false },
  { yuzde: 92, kazanan: true },
  { yuzde: 44, kazanan: false },
  { yuzde: 63, kazanan: false },
  { yuzde: 84, kazanan: true },
  { yuzde: 34, kazanan: false },
];

export function ReklamPerformansi() {
  return (
    <Cerceve className="bg-gradient-to-b from-indigo-950/25 to-zemin">
      <div className="grid grid-cols-3 gap-2.5 pt-7 sm:gap-3">
        {[
          { etiket: "Harcama", deger: "₺6.840" },
          { etiket: "Lead başı maliyet", deger: "₺41", delta: "%18" },
          { etiket: "ROAS", deger: "4.2×" },
        ].map((k) => (
          <div
            key={k.etiket}
            className="rounded-xl border border-cizgi bg-yuzey/60 p-3 sm:p-4"
          >
            <p className="text-[11px] leading-tight text-zinc-500">{k.etiket}</p>
            <p className="mt-2 text-lg font-semibold tabular-nums tracking-[-0.02em] sm:text-2xl">
              {k.deger}
              {k.delta && (
                <span className="ml-1 align-middle text-xs text-emerald-400">
                  ▼
                </span>
              )}
            </p>
            {k.delta && (
              <p className="text-[11px] font-medium text-emerald-400">
                {k.delta}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 flex h-28 items-end gap-2 rounded-xl border border-cizgi bg-yuzey/40 p-3 sm:h-36 sm:gap-3 sm:p-4">
        {SUTUNLAR.map((s, i) => (
          <div
            key={i}
            style={{ height: `${s.yuzde}%` }}
            className={`flex-1 rounded-md ${
              s.kazanan
                ? "bg-gradient-to-t from-altin-soguk to-altin shadow-[0_0_22px_-4px] shadow-altin/60"
                : "bg-gradient-to-t from-orange-700/70 to-orange-500/80"
            }`}
          />
        ))}
      </div>

      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-altin/15 px-3 py-1.5 text-xs font-medium text-altin">
        <span aria-hidden>★</span> 2 kazanan kreatif bulundu
      </p>
    </Cerceve>
  );
}

/* ------------------------------------------- 2 · Müşteri çalışma alanları */

const ALANLAR = [
  {
    ad: "Lale Güzellik",
    alt: "Saç · cilt bakımı",
    kisa: "LG",
    renk: "from-rose-500/70 to-orange-500/60",
    aktif: true,
  },
  {
    ad: "Dyt. Elif Aydın",
    alt: "Beslenme danışmanlığı",
    kisa: "EA",
    renk: "from-emerald-500/70 to-teal-600/60",
    aktif: false,
  },
  {
    ad: "Atlas Dil Akademisi",
    alt: "İngilizce · Almanca · 12 aktif sınıf",
    kisa: "A",
    renk: "from-indigo-500/80 to-violet-600/60",
    aktif: false,
  },
];

export function CalismaAlanlari() {
  return (
    <Cerceve>
      <div className="grid grid-cols-3 gap-2.5 pt-7 sm:gap-3">
        {ALANLAR.map((a) => (
          <div
            key={a.ad}
            className={`overflow-hidden rounded-xl border bg-yuzey/60 ${
              a.aktif ? "border-altin/70" : "border-cizgi"
            }`}
          >
            <div
              className={`flex aspect-[4/5] items-center justify-center bg-gradient-to-br ${a.renk}`}
            >
              <span className="text-xl font-bold text-white/90 sm:text-3xl">
                {a.kisa}
              </span>
            </div>
            <div className="p-2 sm:p-3">
              <p className="text-[11px] font-semibold leading-tight sm:text-sm">
                {a.ad}
              </p>
              <p className="mt-1 hidden text-[11px] leading-tight text-zinc-500 sm:block">
                {a.alt}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        Aktif alan: <span className="text-altin">Lale Güzellik</span> · diğerlerine
        tek tıkla geçilir
      </p>
    </Cerceve>
  );
}

/* ----------------------------------------------- 3 · Ortak gelen kutusu */

export function GelenKutusu() {
  return (
    <Cerceve>
      <div className="pt-7">
        <div className="rounded-xl rounded-tl-sm border border-cizgi bg-yuzey/70 p-3.5">
          <p className="text-[11px] text-zinc-500">
            @zeynep.k · DM · Atlas Dil Akademisi
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-200">
            Merhaba, İngilizce konuşma kursu ne zaman başlıyor? Hafta sonu grubu
            var mı?
          </p>
        </div>

        <div className="mt-3 rounded-xl rounded-tr-sm border border-indigo-500/40 bg-indigo-500/10 p-3.5">
          <p className="text-[11px] text-indigo-300/80">
            Taslak · Müşteri Temsilcisi · Kaynak: Kurs takvimi
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-100">
            Merhaba Zeynep Hanım! Yeni hafta sonu grubumuz 16 Kasım Cumartesi
            10:00&apos;da başlıyor, kontenjanda 4 yer kaldı. Ücretsiz seviye
            tespit görüşmesi ayarlayalım mı?
          </p>
        </div>

        <div className="mt-3 flex justify-end gap-2">
          <span className="rounded-full border border-cizgi px-4 py-2 text-xs font-medium text-zinc-400">
            Düzenle
          </span>
          <span className="rounded-full bg-indigo-500 px-4 py-2 text-xs font-semibold text-white">
            Onayla ve gönder
          </span>
        </div>
      </div>
    </Cerceve>
  );
}

/* ------------------------------------------------- 4 · Rakip reklamları */

export function RakipReklamlari() {
  return (
    <Cerceve>
      <div className="pt-7">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-cizgi bg-cizgi">
          {[
            { etiket: "Önce", renk: "from-zinc-700/60 to-zinc-800/60" },
            { etiket: "Sonra", renk: "from-amber-600/40 to-orange-700/40" },
          ].map((k) => (
            <div
              key={k.etiket}
              className={`relative flex aspect-[4/5] items-end bg-gradient-to-br p-3 ${k.renk}`}
            >
              <span className="rounded-md bg-zemin/80 px-2 py-1 text-[11px] font-medium text-zinc-300">
                {k.etiket}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-2">
          {[
            { ad: "Bölgendeki kuaför", sure: "134 gündür yayında" },
            { ad: "İkinci rakip", sure: "61 gündür yayında" },
          ].map((r) => (
            <div
              key={r.ad}
              className="flex items-center justify-between gap-3 rounded-lg border border-cizgi bg-yuzey/60 px-3 py-2.5"
            >
              <span className="truncate text-xs text-zinc-400">{r.ad}</span>
              <span className="flex-none rounded-full bg-altin/15 px-2.5 py-1 text-[11px] font-medium tabular-nums text-altin">
                {r.sure}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Cerceve>
  );
}

/* --------------------------------------------- 5 · Rakip video araştırması */

const REELSLER = [
  { baslik: "Kilo vermenin en büyük hatası", izlenme: "15.3B" },
  { baslik: "Şekeri nasıl bırakırsın?", izlenme: "22.1B" },
  { baslik: "Bu kahvaltıyı dene", izlenme: "18.9B" },
  { baslik: "Su az mı içiyorsun?", izlenme: "30.5B" },
  { baslik: "Diyette yapılan 3 hata", izlenme: "25.6B" },
  { baslik: "Tatlı krizi nasıl geçer?", izlenme: "28.2B" },
];

export function RakipVideo() {
  return (
    <Cerceve>
      <div className="grid gap-3 pt-7 sm:grid-cols-[1.25fr_1fr]">
        <div className="grid grid-cols-3 gap-1.5">
          {REELSLER.map((r) => (
            <div
              key={r.baslik}
              className="flex aspect-[9/14] flex-col justify-between rounded-md bg-gradient-to-b from-zinc-700/50 to-zinc-900 p-1.5"
            >
              <p className="text-[8px] font-semibold leading-tight text-zinc-200 sm:text-[9px]">
                {r.baslik}
              </p>
              <p className="text-[8px] tabular-nums text-zinc-500 sm:text-[9px]">
                {r.izlenme} izlenme
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <div className="rounded-lg border border-cizgi bg-yuzey/60 p-3">
            <p className="text-xs leading-relaxed text-zinc-400">
              Diyetisyen nişinde ortalamanın{" "}
              <span className="font-semibold text-altin">18.6×</span> üstü
              izlenme
            </p>
          </div>
          <div className="rounded-lg border border-cizgi bg-yuzey/60 px-3 py-2.5 text-xs text-zinc-400">
            Senaryo çıkarıldı <span className="text-emerald-400">✓</span>
          </div>
          <div className="rounded-lg border border-cizgi bg-yuzey/60 px-3 py-2.5 text-xs text-zinc-400">
            Versiyon A · Versiyon B · Versiyon C
          </div>
          <div className="rounded-lg bg-altin/15 px-3 py-2.5 text-xs font-medium text-altin">
            Markana uyarlandı
          </div>
        </div>
      </div>
    </Cerceve>
  );
}

export const EKRANLAR = {
  "reklam-performansi": ReklamPerformansi,
  "calisma-alanlari": CalismaAlanlari,
  "gelen-kutusu": GelenKutusu,
  "rakip-reklamlari": RakipReklamlari,
  "rakip-video": RakipVideo,
} as const;
