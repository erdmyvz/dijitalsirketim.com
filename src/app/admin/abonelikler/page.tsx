import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { adminMi } from "@/lib/admin/yetki";
import { skorHesapla } from "@/lib/checkup/scoring";
import { karneyiCheckupStateYap } from "@/lib/checkup/karne";
import { tedaviPlaniHesapla, tutarBicimle } from "@/lib/tedavi/fiyat";
import { fiyatAyarlariniOku } from "@/lib/tedavi/ayarlar";
import { tarihBicimle } from "@/lib/tedavi/erisim";
import type { Karne } from "@/lib/checkup/types";
import { aboneligeAyEkle, aboneligiSonlandir } from "./actions";

export const metadata = {
  title: "Abonelikler | Yönetim",
  robots: { index: false, follow: false },
};

type AbonelikSatiri = {
  id: string;
  user_id: string;
  baslangic: string;
  bitis: string;
  fonksiyonlar: string[];
  aylik_tutar: number | null;
};

/**
 * Süresi dolmamış abonelikler. "Şimdi"yi bileşen gövdesinde değil burada
 * hesaplıyoruz — render sırasında saf olmayan çağrı yapılmamalı; ayrıca
 * filtrenin veritabanında yapılması daha doğru.
 */
async function aktifAbonelikleriGetir(
  admin: NonNullable<ReturnType<typeof createAdminClient>>,
): Promise<AbonelikSatiri[]> {
  const { data } = await admin
    .from("abonelikler")
    .select("id, user_id, baslangic, bitis, fonksiyonlar, aylik_tutar")
    .gt("bitis", new Date().toISOString())
    .order("bitis", { ascending: false })
    .returns<AbonelikSatiri[]>();
  return data ?? [];
}

export default async function AbonelikYonetimi() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/giris");
  if (!(await adminMi())) redirect("/");

  const admin = createAdminClient();
  if (!admin) {
    return (
      <div className="p-10 text-center text-sm text-red-700">
        Supabase yapılandırılmamış.
      </div>
    );
  }

  // Yetki doğrulandıktan SONRA servis anahtarı kullanılıyor.
  const { data: kullanicilar } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });

  const { data: karneler } = await admin
    .from("karneler")
    .select(
      "id, user_id, created_at, isletme_adi, sektor, is_modeli, calisan_sayisi, ciro_araligi, problem_metni, cevaplar, ai_teshis, durum",
    )
    .order("created_at", { ascending: false })
    .returns<(Karne & { user_id: string })[]>();

  const abonelikler = await aktifAbonelikleriGetir(admin);

  const ayarlar = await fiyatAyarlariniOku();

  const satirlar = (kullanicilar?.users ?? [])
    .map((k) => {
      const sonKarne = karneler?.find((karne) => karne.user_id === k.id);
      const plan = sonKarne
        ? tedaviPlaniHesapla(
            skorHesapla(karneyiCheckupStateYap(sonKarne)),
            ayarlar,
          )
        : null;
      const aktifAbonelik = abonelikler.find((a) => a.user_id === k.id);
      return { kullanici: k, sonKarne, plan, aktifAbonelik };
    })
    // Karnesi olanlar üstte — ödeme bekleyen gerçek adaylar onlar.
    .sort((a, b) => Number(Boolean(b.sonKarne)) - Number(Boolean(a.sonKarne)));

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-base text-white">
              🩺
            </span>
            <div>
              <h1 className="text-base font-semibold text-slate-900">
                Abonelikler
              </h1>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/admin"
              className="font-medium text-slate-500 hover:text-teal-700"
            >
              Başvurular
            </Link>
            <Link
              href="/admin/ayarlar"
              className="font-medium text-slate-500 hover:text-teal-700"
            >
              Ayarlar
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-slate-900">
            Ödeme Onayı ve Erişim
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500">
            Havale geldiğinde ilgili kullanıcıya süre tanı. Kapsanan
            fonksiyonlar ve tutar, kullanıcının son karnesinden otomatik
            hesaplanır ve onay anında sabitlenir.
          </p>
        </div>

        {satirlar.length === 0 ? (
          <div className="rounded-[24px] border border-slate-200 bg-white p-10 text-center text-sm text-slate-400">
            Henüz kayıtlı kullanıcı yok.
          </div>
        ) : (
          <div className="space-y-3">
            {satirlar.map(({ kullanici, sonKarne, plan, aktifAbonelik }) => (
              <div
                key={kullanici.id}
                className="rounded-[24px] border border-slate-200 bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900">
                      {kullanici.email}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {sonKarne
                        ? `Son karne: ${new Date(
                            sonKarne.created_at,
                          ).toLocaleDateString("tr-TR")}${
                            sonKarne.isletme_adi
                              ? ` · ${sonKarne.isletme_adi}`
                              : ""
                          }`
                        : "Henüz check-up yapmamış"}
                    </p>
                  </div>

                  {aktifAbonelik ? (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                      Aktif · {tarihBicimle(new Date(aktifAbonelik.bitis))}
                      &apos;e kadar
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
                      Erişim yok
                    </span>
                  )}
                </div>

                {plan && (
                  <p className="mt-3 text-sm text-slate-600">
                    Hesaplanan plan:{" "}
                    <span className="font-semibold text-slate-900">
                      {tutarBicimle(plan.aylikTutar)}/ay
                    </span>{" "}
                    · {plan.kalemler.length} fonksiyon
                    {plan.kalemler.length > 0 && (
                      <span className="text-slate-400">
                        {" "}
                        ({plan.kalemler.map((k) => k.fonksiyon.baslik).join(", ")})
                      </span>
                    )}
                  </p>
                )}

                {sonKarne && (
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                    {[1, 3, 6].map((ay) => (
                      <form key={ay} action={aboneligeAyEkle}>
                        <input
                          type="hidden"
                          name="kullanici_id"
                          value={kullanici.id}
                        />
                        <input type="hidden" name="ay" value={ay} />
                        <button
                          type="submit"
                          className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 ease-[var(--ease-apple)] hover:bg-teal-700"
                        >
                          {ay} ay ekle
                        </button>
                      </form>
                    ))}

                    {aktifAbonelik && (
                      <form action={aboneligiSonlandir} className="ml-auto">
                        <input
                          type="hidden"
                          name="abonelik_id"
                          value={aktifAbonelik.id}
                        />
                        <button
                          type="submit"
                          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 ease-[var(--ease-apple)] hover:border-red-300 hover:text-red-600"
                        >
                          Erişimi kapat
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
