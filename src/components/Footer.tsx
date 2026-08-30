export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-lg text-white">
                🩺
              </span>
              <span className="text-lg font-semibold text-white">
                dijital<span className="text-teal-400">şirketim</span>
                <span className="text-slate-500">.com.tr</span>
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-300">
              Türkiye&apos;nin Şirket Doktoru
            </p>
            <p className="mt-1 max-w-sm text-sm leading-relaxed">
              İşletmenizin dijital sağlığını teşhis eder, reçete yazar,
              tedavi eder ve sonucu takip ederiz.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-4">
            <div>
              <p className="font-semibold text-white">Sayfa</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a href="#sorun" className="transition-colors duration-200 ease-[var(--ease-apple)] hover:text-white">
                    Belirtiler
                  </a>
                </li>
                <li>
                  <a href="#cozum" className="transition-colors duration-200 ease-[var(--ease-apple)] hover:text-white">
                    Tedavi Modeli
                  </a>
                </li>
                <li>
                  <a href="#ispat" className="transition-colors duration-200 ease-[var(--ease-apple)] hover:text-white">
                    Neden Biz
                  </a>
                </li>
                <li>
                  <a href="#teklif" className="transition-colors duration-200 ease-[var(--ease-apple)] hover:text-white">
                    Check-Up Teklifi
                  </a>
                </li>
                <li>
                  <a href="#sss" className="transition-colors duration-200 ease-[var(--ease-apple)] hover:text-white">
                    SSS
                  </a>
                </li>
                <li>
                  <a href="#misyon" className="transition-colors duration-200 ease-[var(--ease-apple)] hover:text-white">
                    Biz Kimiz
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-white">İletişim</p>
              <ul className="mt-3 space-y-2">
                <li>Kurucu: Erdem Yavuz</li>
                <li>
                  <a href="tel:+905319956930" className="transition-colors duration-200 ease-[var(--ease-apple)] hover:text-white">
                    +90 531 995 69 30
                  </a>
                </li>
                {/* NOT: E-posta adresini kendi adresinizle teyit edin. */}
                <li>info@dijitalsirketim.com.tr</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-white">Yasal</p>
              <ul className="mt-3 space-y-2">
                {/* NOT: Aşağıdaki bağlantıları gerçek KVKK/Gizlilik sayfalarınızla değiştirin. */}
                <li>
                  <a href="#" className="transition-colors duration-200 ease-[var(--ease-apple)] hover:text-white">
                    KVKK Aydınlatma Metni
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors duration-200 ease-[var(--ease-apple)] hover:text-white">
                    Gizlilik Politikası
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} dijitalşirketim.com.tr — Tüm hakları
          saklıdır.
        </div>
      </div>
    </footer>
  );
}
