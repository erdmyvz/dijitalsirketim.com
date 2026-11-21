import Link from "next/link";
import { WHATSAPP_NUMARASI } from "@/data/icerik";
import { IconWhatsapp } from "./icons";

export default function Footer() {
  const yil = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-cizgi">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500 text-[13px] font-bold text-white">
                D
              </span>
              <span className="text-[15px] font-semibold tracking-[-0.01em]">
                Dijital Şirketim
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
              Çalıştığı kanıtlanmış pazarlamayı bul, markana uyarla, uygula.
            </p>
            <p className="mt-3 text-sm text-zinc-600">Erdem Yavuz</p>
          </div>

          <nav className="flex flex-col gap-2.5 text-sm">
            <a href="#ajanlar" className="text-zinc-400 transition-colors hover:text-zinc-100">
              Ajanlar
            </a>
            <a href="#moduller" className="text-zinc-400 transition-colors hover:text-zinc-100">
              Modüller
            </a>
            <a href="#program" className="text-zinc-400 transition-colors hover:text-zinc-100">
              Program
            </a>
            <a href="#durum" className="text-zinc-400 transition-colors hover:text-zinc-100">
              Durum
            </a>
          </nav>

          <nav className="flex flex-col gap-2.5 text-sm">
            <Link href="/kvkk" className="text-zinc-400 transition-colors hover:text-zinc-100">
              KVKK Aydınlatma Metni
            </Link>
            <Link href="/gizlilik" className="text-zinc-400 transition-colors hover:text-zinc-100">
              Gizlilik ve Çerez Politikası
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMARASI}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-100"
            >
              <IconWhatsapp />
              WhatsApp
            </a>
          </nav>
        </div>

        <p className="mt-10 border-t border-cizgi pt-6 text-xs text-zinc-600">
          © {yil} Dijital Şirketim. Sitedeki ekran görselleri örnektir ve
          gerçek bir müşteriye ait değildir.
        </p>
      </div>
    </footer>
  );
}
