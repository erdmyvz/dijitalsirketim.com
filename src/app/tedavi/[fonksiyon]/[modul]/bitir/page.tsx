import { notFound, redirect } from "next/navigation";
import TedaviKabugu from "@/components/tedavi/TedaviKabugu";
import YenidenOlcForm from "@/components/tedavi/YenidenOlcForm";
import { modulBul } from "@/data/moduller";
import { FONKSIYONLAR } from "@/data/questions";
import { createClient } from "@/lib/supabase/server";
import { erisimDurumu, fonksiyonaErisimVarMi } from "@/lib/tedavi/erisim";

export const metadata = {
  title: "Skorunu Yeniden Ölç | Dijital Şirketim",
  robots: { index: false, follow: false },
};

export default async function ModulBitirSayfasi({
  params,
}: {
  params: Promise<{ fonksiyon: string; modul: string }>;
}) {
  const { fonksiyon: fSlug, modul: mId } = await params;
  const bulunan = modulBul(fSlug, mId);
  if (!bulunan) notFound();

  const { fonksiyon, modul } = bulunan;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/hesap/giris?sonraki=/tedavi/${fSlug}/${mId}/bitir`);

  // Modül sayfasıyla aynı erişim kuralı — kilitli modülün ölçümü de
  // kilitli olmalı.
  const erisim = await erisimDurumu();
  if (!fonksiyonaErisimVarMi(erisim, fonksiyon.id)) {
    redirect(`/tedavi/${fSlug}/${mId}`);
  }

  // Modülün onardığı soruların tam metinleri.
  const sorular = modul.onardigiSorular
    .map((soruId) => {
      for (const f of FONKSIYONLAR) {
        const soru = f.sorular.find((s) => s.id === soruId);
        if (soru) return soru;
      }
      return null;
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);

  if (sorular.length === 0) notFound();

  return (
    <TedaviKabugu
      kirintiYolu={[
        { etiket: "Tedavi Modülleri", href: "/tedavi" },
        { etiket: fonksiyon.baslik, href: `/tedavi/${fonksiyon.slug}` },
        { etiket: modul.baslik, href: `/tedavi/${fonksiyon.slug}/${modul.id}` },
        { etiket: "Yeniden ölç" },
      ]}
    >
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
            BİTİŞ KONTROLÜ
          </span>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-3xl">
            {modul.baslik} sonrası durumun
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
            Aynı soruları modülden önce de cevaplamıştın. Şimdi dürüstçe
            tekrar cevapla — cevapların yeni bir karne oluşturacak, eski
            karnen geçmişinde duracak.
          </p>
        </div>

        <YenidenOlcForm
          sorular={sorular}
          donusYolu={`/tedavi/${fonksiyon.slug}/${modul.id}`}
        />
      </div>
    </TedaviKabugu>
  );
}
