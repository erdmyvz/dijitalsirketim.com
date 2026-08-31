"use client";

import { FONKSIYONLAR, type FonksiyonId } from "@/data/questions";
import { fonksiyonCevaplandiMi } from "@/lib/checkup/scoring";
import { ADIM_SIRASI, ILERLEME_ADIM_SAYISI, adimIndexi } from "@/lib/checkup/steps";
import StepIndicator from "./StepIndicator";
import { useCheckupState } from "./useCheckupState";
import ProfilAdimi from "./adimlar/ProfilAdimi";
import IsModeliAdimi from "./adimlar/IsModeliAdimi";
import CalisanSayisiAdimi from "./adimlar/CalisanSayisiAdimi";
import CiroAdimi from "./adimlar/CiroAdimi";
import ProblemAdimi from "./adimlar/ProblemAdimi";
import FonksiyonAdimi from "./adimlar/FonksiyonAdimi";
import SonucEkrani from "./SonucEkrani";

const FONKSIYON_ID_SETI = new Set<string>(FONKSIYONLAR.map((f) => f.id));

export default function CheckupWizard() {
  const { state, guncelle, cevapVer, adim, setAdim } = useCheckupState();

  const index = adimIndexi(adim);
  const sonucAdimi = adim === "sonuc";

  function adimGecerliMi(): boolean {
    if (adim === "profil") return state.isletmeAdi.trim().length > 0;
    if (adim === "is-modeli") return state.isModeli !== null;
    if (adim === "calisan-sayisi") return state.calisanSayisi !== null;
    if (adim === "ciro") return true; // opsiyonel
    if (adim === "problem") return state.problemMetni.trim().length >= 5;
    if (FONKSIYON_ID_SETI.has(adim)) {
      return fonksiyonCevaplandiMi(state, adim);
    }
    return true;
  }

  function ileriGit() {
    const sonrakiIndex = index + 1;
    if (sonrakiIndex < ADIM_SIRASI.length) {
      setAdim(ADIM_SIRASI[sonrakiIndex]);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }

  function geriGit() {
    const oncekiIndex = index - 1;
    if (oncekiIndex >= 0) {
      setAdim(ADIM_SIRASI[oncekiIndex]);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }

  if (sonucAdimi) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
        <SonucEkrani state={state} />
      </div>
    );
  }

  const sonFonksiyonAdimindaMi =
    FONKSIYON_ID_SETI.has(adim) &&
    index === ILERLEME_ADIM_SAYISI - 1; // son ilerleme adımı = ekip_kurma

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <StepIndicator mevcutIndex={index} toplam={ILERLEME_ADIM_SAYISI} />

      <div key={adim} className="animate-apple-in mt-8">
        {adim === "profil" && (
          <ProfilAdimi state={state} guncelle={guncelle} />
        )}
        {adim === "is-modeli" && (
          <IsModeliAdimi
            secili={state.isModeli}
            onSec={(v) => guncelle({ isModeli: v })}
          />
        )}
        {adim === "calisan-sayisi" && (
          <CalisanSayisiAdimi
            secili={state.calisanSayisi}
            onSec={(v) => guncelle({ calisanSayisi: v })}
          />
        )}
        {adim === "ciro" && (
          <CiroAdimi
            secili={state.ciroAraligi}
            onSec={(v) => guncelle({ ciroAraligi: v })}
          />
        )}
        {adim === "problem" && (
          <ProblemAdimi state={state} guncelle={guncelle} />
        )}
        {FONKSIYON_ID_SETI.has(adim) && (
          <FonksiyonAdimi
            fonksiyonId={adim as FonksiyonId}
            cevaplar={state.cevaplar}
            onCevapVer={cevapVer}
          />
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={geriGit}
          disabled={index === 0}
          className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 ease-[var(--ease-apple)] hover:border-slate-400 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-0"
        >
          Geri
        </button>

        <button
          type="button"
          onClick={ileriGit}
          disabled={!adimGecerliMi()}
          className="rounded-full bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:scale-[1.02] hover:bg-teal-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          {adim === "ciro" && !state.ciroAraligi
            ? "Geç"
            : sonFonksiyonAdimindaMi
              ? "Sonuçları Gör"
              : "İleri"}
        </button>
      </div>
    </div>
  );
}
