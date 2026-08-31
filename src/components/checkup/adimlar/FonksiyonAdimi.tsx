import { FONKSIYONLAR, type CevapDegeri, type FonksiyonId } from "@/data/questions";
import AdimBaslik from "./AdimBaslik";
import SoruKarti from "../SoruKarti";

export default function FonksiyonAdimi({
  fonksiyonId,
  cevaplar,
  onCevapVer,
}: {
  fonksiyonId: FonksiyonId;
  cevaplar: Record<string, CevapDegeri>;
  onCevapVer: (soruId: string, deger: CevapDegeri) => void;
}) {
  const fonksiyon = FONKSIYONLAR.find((f) => f.id === fonksiyonId);
  if (!fonksiyon) return null;

  return (
    <div>
      <AdimBaslik
        kicker={`FONKSİYON ${fonksiyon.no} / 7`}
        baslik={fonksiyon.baslik}
        aciklama="Her soru için sizi en iyi tanımlayan seçeneği işaretleyin."
      />

      <div className="space-y-3">
        {fonksiyon.sorular.map((soru, i) => (
          <SoruKarti
            key={soru.id}
            soru={soru}
            index={i}
            secili={cevaplar[soru.id]}
            onSec={(deger) => onCevapVer(soru.id, deger)}
          />
        ))}
      </div>
    </div>
  );
}
