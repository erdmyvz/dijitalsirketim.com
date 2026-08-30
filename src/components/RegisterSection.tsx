import SignupForm from "./SignupForm";

const adimlar = [
  "Formu doldurun, 2 dakikanızı alır",
  "Ekibimiz dijital sağlık taramanızı yapar",
  "Size özel teşhis raporunuzu ve reçetenizi sunarız",
];

export default function RegisterSection() {
  return (
    <section id="kayit" className="bg-teal-600">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
        <div className="text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/30">
            SON ADIM
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Muayeneye alalım: ücretsiz dijital teşhisinizi bugün başlatın
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-teal-50">
            Randevu beklemeden, hiçbir ücret ödemeden işletmenizin dijital
            sağlık durumunu öğrenin. Aşağıdaki formu doldurmanız yeterli.
          </p>

          <ol className="mt-8 space-y-4">
            {adimlar.map((a, i) => (
              <li key={a} className="flex items-start gap-3">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white text-sm font-bold text-teal-700">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-teal-50">{a}</span>
              </li>
            ))}
          </ol>
        </div>

        <SignupForm />
      </div>
    </section>
  );
}
