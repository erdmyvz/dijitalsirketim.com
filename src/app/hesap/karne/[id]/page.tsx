import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { karneyiCheckupStateYap } from "@/lib/checkup/karne";
import type { Karne } from "@/lib/checkup/types";
import SonucEkrani from "@/components/checkup/SonucEkrani";

export const metadata = {
  title: "Karne Detayı | Dijital Şirketim",
  robots: { index: false, follow: false },
};

export default async function KarneDetay({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/hesap/giris");

  // RLS: bu satır yalnızca user_id === auth.uid() ise dönebilir (bkz.
  // supabase/schema.sql, "Kullanici kendi karnelerini okur"). Başka bir
  // kullanıcının id'sini denemek de aynı şekilde null döner — bilgi
  // sızdırmadan 404 gösteriyoruz.
  const { data: karne } = await supabase
    .from("karneler")
    .select(
      "id, created_at, isletme_adi, sektor, is_modeli, calisan_sayisi, ciro_araligi, problem_metni, cevaplar, ai_teshis, durum",
    )
    .eq("id", id)
    .maybeSingle<Karne>();

  if (!karne) notFound();

  const state = karneyiCheckupStateYap(karne);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <Link
            href="/hesap"
            className="text-sm font-medium text-slate-500 transition-colors duration-200 ease-[var(--ease-apple)] hover:text-teal-700"
          >
            ← Panelime Dön
          </Link>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
            {new Date(karne.created_at).toLocaleDateString("tr-TR", {
              dateStyle: "long",
            })}{" "}
            &middot; {karne.durum}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
        <SonucEkrani state={state} gecmis kayitliTeshis={karne.ai_teshis} />
      </div>
    </div>
  );
}
