import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { skorHesapla, tumSorularCevaplandiMi } from "@/lib/checkup/scoring";
import { TESHIS_SISTEM_PROMPTU, teshisKullaniciMesaji } from "@/lib/checkup/prompt";
import type { CheckupState, TeshisSonucu } from "@/lib/checkup/types";

// Modelin serbest metin yerine kesin bu şemada JSON döndürmesini
// zorlamak için tool-use kullanıyoruz — metinden JSON ayrıştırmaya
// (ve başarısız ayrıştırmaya) kıyasla çok daha güvenilir.
const TESHIS_ARACI: Anthropic.Tool = {
  name: "dijital_teshis_koy",
  description:
    "İşletmenin dijital check-up sonuçlarına göre yapılandırılmış bir ön teşhis kaydeder.",
  input_schema: {
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
  },
};

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn("ANTHROPIC_API_KEY tanımlı değil — /api/teshis devre dışı.");
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
    const anthropic = new Anthropic({ apiKey });

    const mesaj = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 1024,
      system: TESHIS_SISTEM_PROMPTU,
      tools: [TESHIS_ARACI],
      tool_choice: { type: "tool", name: "dijital_teshis_koy" },
      messages: [
        { role: "user", content: teshisKullaniciMesaji(state, sonuc) },
      ],
    });

    const araclKullanimi = mesaj.content.find(
      (blok): blok is Anthropic.ToolUseBlock => blok.type === "tool_use",
    );

    if (!araclKullanimi) {
      throw new Error("Model beklenen aracı çağırmadı.");
    }

    const teshis = araclKullanimi.input as TeshisSonucu;
    return NextResponse.json(teshis);
  } catch (err) {
    console.error("/api/teshis hatası:", err);
    return NextResponse.json(
      { error: "Teşhis oluşturulamadı." },
      { status: 500 },
    );
  }
}
