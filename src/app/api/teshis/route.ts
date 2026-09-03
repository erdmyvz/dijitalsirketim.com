import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { skorHesapla, tumSorularCevaplandiMi } from "@/lib/checkup/scoring";
import { TESHIS_SISTEM_PROMPTU, teshisKullaniciMesaji } from "@/lib/checkup/prompt";
import type { CheckupState, TeshisSonucu } from "@/lib/checkup/types";

// Modelin serbest metin yerine kesin bu şemada JSON döndürmesini
// zorlamak için Gemini'nin yapılandırılmış çıktı (responseJsonSchema)
// özelliğini kullanıyoruz — metinden JSON ayıklamaya kıyasla çok daha
// güvenilir, ayrıştırma hatası riski yok.
const TESHIS_SEMASI = {
  type: "object",
  properties: {
    ozet: {
      type: "string",
      description:
        "Kırmızı bölgeyi işletmenin kendi cevaplarına atıf yaparak yorumlayan 2-3 cümlelik özet.",
    },
    kok_vida: {
      type: "string",
      enum: ["Yetkinlik", "Kültür", "Netlik"],
      description: "5 Neden analiziyle ulaşılan muhtemel kök neden kategorisi.",
    },
    gerekce: {
      type: "string",
      description: "kok_vida seçimini işletmenin cevaplarına dayandıran kısa gerekçe.",
    },
    ilk_yardim: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 3,
      description: "Bu hafta uygulanabilir, somut 3 madde.",
    },
    kapanis: {
      type: "string",
      description:
        "Tam reçetenin ücretli teşhis görüşmesinde çıkarılacağını nazikçe belirten 1 cümlelik kapanış. Fiyat veya kesin garanti içermez.",
    },
  },
  required: ["ozet", "kok_vida", "gerekce", "ilk_yardim", "kapanis"],
};

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

  try {
    const sonuc = skorHesapla(state);
    const ai = new GoogleGenAI({ apiKey });

    // NOT: teshisKullaniciMesaji() işletme adını bilinçli olarak dışarıda
    // bırakır — ücretsiz katmanda gönderilen içerik Google tarafından
    // ürün geliştirmede kullanılabildiği için veri kimliksiz gidiyor.
    const yanit = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: teshisKullaniciMesaji(state, sonuc),
      config: {
        systemInstruction: TESHIS_SISTEM_PROMPTU,
        responseMimeType: "application/json",
        responseJsonSchema: TESHIS_SEMASI,
        maxOutputTokens: 2048,
      },
    });

    const metin = yanit.text;
    if (!metin) throw new Error("Model boş yanıt döndürdü.");

    const teshis = JSON.parse(metin) as TeshisSonucu;
    return NextResponse.json(teshis);
  } catch (err) {
    console.error("/api/teshis hatası:", err);
    return NextResponse.json(
      { error: "Teşhis oluşturulamadı." },
      { status: 500 },
    );
  }
}
