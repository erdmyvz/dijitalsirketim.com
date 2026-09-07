import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";
import { skorHesapla, tumSorularCevaplandiMi } from "@/lib/checkup/scoring";
import { TESHIS_SISTEM_PROMPTU, teshisKullaniciMesaji } from "@/lib/checkup/prompt";
import type { CheckupState, TeshisSonucu } from "@/lib/checkup/types";

// Modelin serbest metin yerine kesin bu şemada JSON döndürmesini
// zorlamak için Gemini'nin KENDİ (OpenAPI alt kümesi) şema formatını
// kullanıyoruz — responseSchema, Gemini API'nin en uzun süredir
// desteklenen, en yaygın test edilmiş yapılandırılmış çıktı yolu.
const TESHIS_SEMASI = {
  type: Type.OBJECT,
  properties: {
    ozet: {
      type: Type.STRING,
      description:
        "Kırmızı bölgeyi işletmenin kendi cevaplarına atıf yaparak yorumlayan 2-3 cümlelik özet.",
    },
    kok_vida: {
      type: Type.STRING,
      enum: ["Yetkinlik", "Kültür", "Netlik"],
      description: "5 Neden analiziyle ulaşılan muhtemel kök neden kategorisi.",
    },
    gerekce: {
      type: Type.STRING,
      description: "kok_vida seçimini işletmenin cevaplarına dayandıran kısa gerekçe.",
    },
    ilk_yardim: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      minItems: "3",
      maxItems: "3",
      description: "Bu hafta uygulanabilir, somut 3 madde.",
    },
    kapanis: {
      type: Type.STRING,
      description:
        "Tam reçetenin ücretli teşhis görüşmesinde çıkarılacağını nazikçe belirten 1 cümlelik kapanış. Fiyat veya kesin garanti içermez.",
    },
  },
  required: ["ozet", "kok_vida", "gerekce", "ilk_yardim", "kapanis"],
};

function geciciHataMi(err: unknown): boolean {
  const status = (err as { status?: number } | null)?.status;
  // 503 (aşırı yüklü/kullanılamıyor) ve 429 (kota) geçicidir, tekrar
  // denemeye değer. Diğerleri (400 geçersiz istek, 403 izin vb.)
  // tekrar denense de değişmez.
  return status === 503 || status === 429;
}

function bekle(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY tanımlı değil — /api/teshis devre dışı.");
    return NextResponse.json(
      { error: "Yapay zekâ teşhisi şu anda yapılandırılmamış." },
      { status: 503 },
    );
  }

  const state = (await request.json().catch(() => null)) as CheckupState | null;

  if (!state || typeof state.isletmeAdi !== "string" || !state.cevaplar) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }
  if (!tumSorularCevaplandiMi(state)) {
    return NextResponse.json(
      { error: "21 sorunun tamamı cevaplanmadan teşhis oluşturulamaz." },
      { status: 400 },
    );
  }

  const sonuc = skorHesapla(state);
  const ai = new GoogleGenAI({ apiKey });
  // NOT: teshisKullaniciMesaji() işletme adını bilinçli olarak dışarıda
  // bırakır — ücretsiz katmanda gönderilen içerik Google tarafından
  // ürün geliştirmede kullanılabildiği için veri kimliksiz gidiyor.
  const kullaniciMesaji = teshisKullaniciMesaji(state, sonuc);

  const MAKS_DENEME = 3;
  let sonHata: unknown;

  for (let deneme = 1; deneme <= MAKS_DENEME; deneme++) {
    try {
      const yanit = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: kullaniciMesaji,
        config: {
          systemInstruction: TESHIS_SISTEM_PROMPTU,
          responseMimeType: "application/json",
          responseSchema: TESHIS_SEMASI,
          maxOutputTokens: 2048,
        },
      });

      const metin = yanit.text;
      if (!metin) throw new Error("Model boş yanıt döndürdü.");

      const teshis = JSON.parse(metin) as TeshisSonucu;
      return NextResponse.json(teshis);
    } catch (err) {
      sonHata = err;
      const detay =
        err && typeof err === "object" && "error" in err
          ? JSON.stringify((err as { error: unknown }).error)
          : String(err);
      console.error(
        `/api/teshis hatası (deneme ${deneme}/${MAKS_DENEME}):`,
        detay,
      );

      if (deneme < MAKS_DENEME && geciciHataMi(err)) {
        await bekle(deneme * 700); // 700ms, 1400ms — kademeli bekleme
        continue;
      }
      break;
    }
  }

  console.error("/api/teshis nihai hata:", sonHata);
  return NextResponse.json(
    { error: "Teşhis oluşturulamadı." },
    { status: 500 },
  );
}
