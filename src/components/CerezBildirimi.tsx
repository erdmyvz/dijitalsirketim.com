"use client";

import { useState } from "react";
import Link from "next/link";

const DEPOLAMA_ANAHTARI = "dijitalsirketim-cerez-bildirimi-kapatildi";

// Bu bileşen yalnızca next/dynamic(..., { ssr: false }) ile yüklenir
// (bkz. CerezBildirimiClient.tsx) — yani sunucuda hiç render edilmez,
// doğrudan localStorage okuyan bu "lazy" başlangıç değeri güvenlidir
// (useCheckupState.ts'teki aynı desen — hidrasyon uyuşmazlığı riski
// yok, react-hooks/set-state-in-effect kuralına da takılmaz).
function baslangicGorunurlugu(): boolean {
  try {
    return !window.localStorage.getItem(DEPOLAMA_ANAHTARI);
  } catch {
    return false; // localStorage kapalıysa şeridi hiç gösterme
  }
}

// Site'de yalnızca zorunlu/işlevsel çerez (Supabase Auth oturum çerezi)
// kullanıldığı için — reklam/analiz/takip çerezi yok — ağır bir
// kabul/red onay ekranı yerine tek "Anladım" ile kapanan, bilgilendirici
// bir şerit yeterli (bkz. /gizlilik, "Çerezler" bölümü).
export default function CerezBildirimi() {
  const [gorunur, setGorunur] = useState(baslangicGorunurlugu);

  function kapat() {
    setGorunur(false);
    try {
      window.localStorage.setItem(DEPOLAMA_ANAHTARI, "1");
    } catch {
      // yok say
    }
  }

  if (!gorunur) return null;

  return (
    <div className="animate-apple-in fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-md sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-slate-600">
          Bu site yalnızca oturum açma gibi temel işlevler için gerekli
          çerezleri kullanır — reklam veya takip çerezi yoktur. Detaylar
          için{" "}
          <Link href="/gizlilik" className="text-teal-700 underline hover:text-teal-800">
            Gizlilik Politikası
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={kapat}
          className="flex-none rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:bg-teal-700"
        >
          Anladım
        </button>
      </div>
    </div>
  );
}
