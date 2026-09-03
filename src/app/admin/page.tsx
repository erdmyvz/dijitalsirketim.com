import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Yönetim Paneli | Dijital Şirketim",
  robots: { index: false, follow: false },
};

type Basvuru = {
  id: string;
  created_at: string;
  ad_soyad: string;
  isletme_adi: string | null;
  sektor: string | null;
  telefon: string;
  referans_kodu: string | null;
};

// Admin panosu: gelen Check-Up başvurularını listeler.
// Oturum kontrolünün ilk hattı src/proxy.ts'te; burada ikinci kez
// doğrulanır (derinlemesine savunma).
export default async function AdminPanel() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/giris");

  const { data: basvurular, error } = await supabase
    .from("basvurular")
    .select("id, created_at, ad_soyad, isletme_adi, sektor, telefon, referans_kodu")
    .order("created_at", { ascending: false })
    .returns<Basvuru[]>();

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
                Yönetim Paneli
              </h1>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>
          <form action="/admin/cikis" method="post">
            <button
              type="submit"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 ease-[var(--ease-apple)] hover:border-red-300 hover:text-red-600"
            >
              Çıkış Yap
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-slate-900">
              Check-Up Başvuruları
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Formdan gelen tüm başvurular, en yenisi üstte.
            </p>
          </div>
          <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700 ring-1 ring-teal-200">
            {basvurular?.length ?? 0} başvuru
          </span>
        </div>

        {error ? (
          <div className="rounded-[24px] border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            Başvurular yüklenemedi: {error.message}
            <br />
            <span className="text-red-500">
              supabase/schema.sql dosyasını Supabase SQL Editor&apos;de
              çalıştırdığınızdan emin olun.
            </span>
          </div>
        ) : !basvurular || basvurular.length === 0 ? (
          <div className="rounded-[24px] border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-medium text-slate-700">
              Henüz başvuru yok
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Formdan gelen ilk başvuru burada görünecek.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[24px] border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-3.5 font-semibold">Tarih</th>
                  <th className="px-5 py-3.5 font-semibold">Ad Soyad</th>
                  <th className="px-5 py-3.5 font-semibold">İşletme</th>
                  <th className="px-5 py-3.5 font-semibold">Sektör</th>
                  <th className="px-5 py-3.5 font-semibold">Telefon</th>
                  <th className="px-5 py-3.5 font-semibold">Referans</th>
                </tr>
              </thead>
              <tbody>
                {basvurular.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap px-5 py-3.5 text-slate-500">
                      {new Date(b.created_at).toLocaleString("tr-TR", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-900">
                      {b.ad_soyad}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {b.isletme_adi || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {b.sektor || "—"}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5">
                      <a
                        href={`tel:${b.telefon.replace(/\s/g, "")}`}
                        className="font-medium text-teal-700 hover:underline"
                      >
                        {b.telefon}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5">
                      {b.referans_kodu ? (
                        <code className="rounded bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700">
                          {b.referans_kodu}
                        </code>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
