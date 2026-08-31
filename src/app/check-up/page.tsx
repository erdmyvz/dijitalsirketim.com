import type { Metadata } from "next";
import Link from "next/link";
import CheckupWizardClient from "@/components/checkup/CheckupWizardClient";

export const metadata: Metadata = {
  title: "Dijital Check-Up | Dijital Şirketim",
  description:
    "21 kontrol noktalı ücretsiz dijital check-up: işletmenizin dijital sağlık karnesini 2 dakikada öğrenin.",
  robots: { index: false, follow: false }, // form sayfası, arama sonucunda gösterilmesin
};

// Sihirbaz sayfası bilinçli olarak dikkat dağıtmayan, sade bir kabuk
// içinde: tam navbar yok, yalnızca markaya dönüş bağlantısı var.
export default function CheckUpPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-base text-white">
              🩺
            </span>
            <span className="text-base font-semibold tracking-tight text-slate-900">
              dijital<span className="text-teal-600">şirketim</span>
            </span>
          </Link>
        </div>
      </header>

      <CheckupWizardClient />
    </div>
  );
}
