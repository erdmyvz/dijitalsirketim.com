"use client";

import dynamic from "next/dynamic";

// localStorage'a bağlı olduğu için tamamen istemci tarafında çalışır
// (ssr: false) — sunucu render'ı hiç olmadığından hidrasyon
// uyuşmazlığı riski de olmaz.
const CheckupWizard = dynamic(() => import("./CheckupWizard"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center text-sm text-slate-400">
      Yükleniyor...
    </div>
  ),
});

export default function CheckupWizardClient() {
  return <CheckupWizard />;
}
