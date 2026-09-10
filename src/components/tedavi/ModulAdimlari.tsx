"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/browser";
import type { ModulAdimi } from "@/data/moduller";
import { IconCheck } from "@/components/icons";

type Ilerleme = { tamamlandi: boolean; sablonMetni: string };

type Durum =
  | { tip: "yukleniyor" }
  | { tip: "hazir" }
  | { tip: "hata"; mesaj: string };

const bosIlerleme: Ilerleme = { tamamlandi: false, sablonMetni: "" };

/**
 * Modülün adım adım uygulama ekranı.
 *
 * İlerleme tarayıcıdan doğrudan Supabase'e yazılıyor; RLS "yalnızca
 * kendi satırın" kuralını uyguladığı için sunucu aksiyonuna gerek yok
 * (KaydetKarti.tsx ile aynı desen). Yazma, kullanıcı alandan çıkınca
 * (blur) yapılıyor — her tuş vuruşunda istek atmamak için.
 */
export default function ModulAdimlari({
  modulId,
  fonksiyonSlug,
  adimlar,
}: {
  modulId: string;
  fonksiyonSlug: string;
  adimlar: ModulAdimi[];
}) {
  const [durum, setDurum] = useState<Durum>({ tip: "yukleniyor" });
  const [ilerleme, setIlerleme] = useState<Record<string, Ilerleme>>({});

  useEffect(() => {
    let iptal = false;
    const supabase = createClient();

    async function yukle() {
      const { data, error } = await supabase
        .from("modul_ilerleme")
        .select("adim_id, tamamlandi, sablon_metni")
        .eq("modul_id", modulId)
        .returns<
          { adim_id: string; tamamlandi: boolean; sablon_metni: string | null }[]
        >();

      if (iptal) return;

      if (error) {
        setDurum({
          tip: "hata",
          mesaj: "İlerlemen yüklenemedi. Sayfayı yenilemeyi dener misin?",
        });
        return;
      }

      const harita: Record<string, Ilerleme> = {};
      for (const satir of data ?? []) {
        harita[satir.adim_id] = {
          tamamlandi: satir.tamamlandi,
          sablonMetni: satir.sablon_metni ?? "",
        };
      }
      setIlerleme(harita);
      setDurum({ tip: "hazir" });
    }

    yukle();
    return () => {
      iptal = true;
    };
  }, [modulId]);

  async function kaydet(adimId: string, yeni: Ilerleme) {
    setIlerleme((onceki) => ({ ...onceki, [adimId]: yeni }));

    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase.from("modul_ilerleme").upsert(
      {
        user_id: session.user.id,
        modul_id: modulId,
        adim_id: adimId,
        tamamlandi: yeni.tamamlandi,
        sablon_metni: yeni.sablonMetni || null,
        guncellendi: new Date().toISOString(),
      },
      { onConflict: "user_id,modul_id,adim_id" },
    );

    if (error) {
      setDurum({
        tip: "hata",
        mesaj: "Değişikliğin kaydedilemedi. İnternet bağlantını kontrol et.",
      });
    }
  }

  const oku = (adimId: string) => ilerleme[adimId] ?? bosIlerleme;
  const bitenSayisi = adimlar.filter((a) => oku(a.id).tamamlandi).length;
  const hepsiBitti = bitenSayisi === adimlar.length;

  if (durum.tip === "yukleniyor") {
    return (
      <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        İlerlemen yükleniyor...
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* İlerleme çubuğu */}
      <div className="rounded-[24px] border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-900">
            {bitenSayisi} / {adimlar.length} adım tamamlandı
          </p>
          {hepsiBitti && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              Modül bitti
            </span>
          )}
        </div>
        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuenow={bitenSayisi}
          aria-valuemin={0}
          aria-valuemax={adimlar.length}
        >
          <div
            className="h-full rounded-full bg-teal-600 transition-[width] duration-500 ease-[var(--ease-apple)] motion-reduce:transition-none"
            style={{ width: `${(bitenSayisi / adimlar.length) * 100}%` }}
          />
        </div>
      </div>

      {durum.tip === "hata" && (
        <p className="animate-apple-in mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {durum.mesaj}
        </p>
      )}

      {/* Adımlar */}
      <ol className="mt-5 space-y-4">
        {adimlar.map((adim, i) => {
          const bu = oku(adim.id);
          return (
            <li
              key={adim.id}
              className={`rounded-[24px] border bg-white p-6 transition-colors duration-300 ease-[var(--ease-apple)] ${
                bu.tamamlandi ? "border-emerald-200" : "border-slate-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full text-sm font-semibold ${
                    bu.tamamlandi
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {bu.tamamlandi ? (
                    <IconCheck className="h-4 w-4" strokeWidth={2.5} />
                  ) : (
                    i + 1
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold tracking-[-0.01em] text-slate-900">
                    {adim.baslik}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {adim.aciklama}
                  </p>

                  {adim.sablon && (
                    <div className="mt-4">
                      <label
                        htmlFor={`sablon-${adim.id}`}
                        className="mb-1 block text-sm font-medium text-slate-700"
                      >
                        {adim.sablon.etiket}
                      </label>
                      <textarea
                        id={`sablon-${adim.id}`}
                        rows={adim.sablon.satir ?? 4}
                        defaultValue={bu.sablonMetni}
                        placeholder={adim.sablon.ipucu}
                        onBlur={(e) => {
                          if (e.target.value === bu.sablonMetni) return;
                          kaydet(adim.id, {
                            ...bu,
                            sablonMetni: e.target.value,
                          });
                        }}
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm leading-relaxed text-slate-900 outline-none transition-all duration-200 ease-[var(--ease-apple)] focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                      />
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-slate-200 pt-4">
                    <p className="text-xs leading-relaxed text-slate-400">
                      <span className="font-medium text-slate-500">
                        Bitti sayılır:
                      </span>{" "}
                      {adim.bitisKriteri}
                    </p>
                    <label className="flex flex-none cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={bu.tamamlandi}
                        onChange={(e) =>
                          kaydet(adim.id, {
                            ...bu,
                            tamamlandi: e.target.checked,
                          })
                        }
                        className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                      />
                      Yaptım
                    </label>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Bitiş kontrolü — döngüyü kapatan adım */}
      {hepsiBitti && (
        <div className="animate-apple-in mt-6 rounded-[28px] border border-emerald-200 bg-emerald-50/60 p-6 text-center sm:p-8">
          <p className="text-lg font-semibold text-slate-900">
            Modülü bitirdin. Şimdi ölçelim.
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
            Bu modülün onardığı check-up sorularını tekrar cevapla; yeni
            bir karne oluşsun ve skorunun nereye geldiğini gör.
          </p>
          <Link
            href={`/tedavi/${fonksiyonSlug}/${modulId}/bitir`}
            className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:bg-emerald-700"
          >
            Skorumu Yeniden Ölç
          </Link>
        </div>
      )}
    </div>
  );
}
