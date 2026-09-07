import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { skorHesapla } from "@/lib/checkup/scoring";
import { karneyiCheckupStateYap } from "@/lib/checkup/karne";
import type { Karne } from "@/lib/checkup/types";

export const metadata = {
  title: "Hesabım | Dijital Şirketim",
  robots: { index: false, follow: false },
};

// Müşteri paneli: geçmiş Check-Up karnelerinin listesi. Oturum
// kontrolünün ilk hattı src/proxy.ts'te; burada ikinci kez doğrulanır
// (admin panelindeki "derinlemesine savunma" ile aynı desen).
export default async function HesapPaneli() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/hesap/giris");

  const { data: karneler, error } = await supabase
    .from("karneler")
    .select(
      "id, created_at, isletme_adi, sektor, is_modeli, calisan_sayisi, ciro_araligi, problem_metni, cevaplar, ai_teshis, durum",
    )
    .order("created_at", { ascending: false })
    .returns<Karne[]>();

  const adSoyad = (user.user_metadata as { ad_soyad?: string } | null)?.ad_soyad;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-base text-white">
              🩺
            </span>
            <div>
              <h1 className="text-base font-semibold text-slate-900">
                {adSoyad ? `Merhaba, ${adSoyad}` : "Hesabım"}
              </h1>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>
          <form action="/hesap/cikis" method="post">
            <button
              type="submit"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 ease-[var(--ease-apple)] hover:border-red-300 hover:text-red-600"
            >
              Çıkış Yap
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-slate-900">
              Check-Up Karnelerim
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Geçmişte oluşturduğun tüm dijital sağlık karneleri.
            </p>
          </div>
          <Link
            href="/check-up"
            className="flex-none whitespace-nowrap rounded-full bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:bg-teal-700"
          >
            + Yeni Check-Up
          </Link>
        </div>

        {error ? (
          <div className="rounded-[24px] border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            Karneler yüklenemedi: {error.message}
          </div>
        ) : !karneler || karneler.length === 0 ? (
          <div className="rounded-[24px] border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-medium text-slate-700">
              Henüz bir karne yok
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Check-Up&apos;ı tamamladığında sonuçların burada görünecek.
            </p>
            <Link
              href="/check-up"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:bg-teal-700"
            >
              Check-Up&apos;a Başla
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {karneler.map((k) => {
              const sonuc = skorHesapla(karneyiCheckupStateYap(k));
              const kirmiziOzet =
                sonuc.kirmiziBolge.map((f) => f.baslik).join(", ") || "yok";
              return (
                <Link
                  key={k.id}
                  href={`/hesap/karne/${k.id}`}
                  className="flex items-center justify-between gap-4 rounded-[24px] border border-slate-200 bg-white p-5 transition-colors duration-200 ease-[var(--ease-apple)] hover:border-teal-300 hover:bg-teal-50/30"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900">
                      {new Date(k.created_at).toLocaleDateString("tr-TR", {
                        dateStyle: "long",
                      })}
                    </p>
                    <p className="mt-1 truncate text-sm text-slate-500">
                      {k.isletme_adi || "İsimsiz işletme"} &middot; Kırmızı
                      bölge: {kirmiziOzet}
                    </p>
                  </div>
                  <div className="flex flex-none items-center gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                      {k.durum}
                    </span>
                    <span className="text-lg font-semibold text-teal-700">
                      %{sonuc.skorYuzde}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
