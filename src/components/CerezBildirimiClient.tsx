"use client";

import dynamic from "next/dynamic";

// layout.tsx bir Server Component — ssr:false'lu dynamic import
// doğrudan orada kullanılamaz (CheckupWizardClient.tsx'teki aynı
// desen). Bu ince istemci kabuğu, çerez şeridinin sunucuda hiç
// render edilmemesini sağlar.
const CerezBildirimi = dynamic(() => import("./CerezBildirimi"), {
  ssr: false,
});

export default function CerezBildirimiClient() {
  return <CerezBildirimi />;
}
