import { ImageResponse } from "next/og";

// Site genelindeki varsayılan paylaşım görseli — WhatsApp/sosyal medyada
// link paylaşıldığında görünen kart. Statik bir dosya değil, next/og ile
// build zamanında üretilip önbelleğe alınıyor — projede zaten hiç raster
// görsel yok (tüm ikonlar emoji/SVG), bu da o desenle tutarlı.
export const alt = "Dijital Şirketim — Türkiye'nin Şirket Doktoru";
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
          alignItems: "center",
          justifyContent: "center",
          background: "#020617",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 148,
            height: 148,
            borderRadius: "50%",
            background: "#0d9488",
            fontSize: 76,
            marginBottom: 44,
          }}
        >
          🩺
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          dijital
          <span style={{ color: "#2dd4bf" }}>şirketim</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 34,
            fontWeight: 500,
            color: "#94a3b8",
          }}
        >
          Türkiye&apos;nin Şirket Doktoru
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 24,
            color: "#5eead4",
            padding: "10px 28px",
            borderRadius: 999,
            border: "1.5px solid #115e59",
          }}
        >
          21 Kontrol Noktalı Dijital Check-Up
        </div>
      </div>
    ),
    { ...size },
  );
}
