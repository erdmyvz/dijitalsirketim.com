import { ImageResponse } from "next/og";

// Link paylaşıldığında görünen kart (WhatsApp, X, LinkedIn…).
// Statik dosya değil: next/og ile build zamanında üretilip önbelleğe
// alınıyor. Projede hiç raster görsel yok, bu da o desenle tutarlı.
export const alt =
  "Dijital Şirketim — Amerika'yı yeniden keşfetmeye gerek yok";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#6366f1",
              fontSize: 36,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            D
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#a1a1aa" }}>
            Dijital Şirketim
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            color: "#f4f4f5",
            maxWidth: 940,
          }}
        >
          Amerika&apos;yı yeniden keşfetmeye gerek yok.
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            lineHeight: 1.4,
            color: "#a1a1aa",
            maxWidth: 900,
          }}
        >
          Sektöründe çalıştığı kanıtlanmış reklamları ve içerikleri bul,
          markana uyarla, uygula.
        </div>
      </div>
    ),
    size,
  );
}
