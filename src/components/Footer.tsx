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
              <span className="text-lg font-bold text-white">
                dijital<span className="text-teal-400">şirketim</span>
                <span className="text-slate-500">.com.tr</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              İşletmenizin dijital sağlığını teşhis eden, reçete yazan ve
              tedavi eden dijital pazarlama kliniği.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="font-semibold text-white">Sayfa</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a href="#sorun" className="hover:text-white">
                    Belirtiler
                  </a>
                </li>
                <li>
                  <a href="#cozum" className="hover:text-white">
                    Tedavi Yöntemimiz
                  </a>
                </li>
                <li>
                  <a href="#ispat" className="hover:text-white">
                    Referanslar
                  </a>
                </li>
                <li>
                  <a href="#teklif" className="hover:text-white">
                    Paketler
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-white">İletişim</p>
              <ul className="mt-3 space-y-2">
                {/* NOT: Aşağıdaki iletişim bilgilerini kendi bilgilerinizle değiştirin. */}
                <li>info@dijitalsirketim.com.tr</li>
                <li>+90 (5xx) xxx xx xx</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-white">Yasal</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    KVKK Aydınlatma Metni
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
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
