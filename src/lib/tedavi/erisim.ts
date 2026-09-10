import { createClient } from "@/lib/supabase/server";
import type { FonksiyonId } from "@/data/questions";

/** Abonelik bitişine bu kadar gün kalınca uyarı gösterilir. */
export const UYARI_ESIGI_GUN = 7;

export type Abonelik = {
  id: string;
  baslangic: string;
  bitis: string;
  fonksiyonlar: string[];
  aylik_tutar: number | null;
};

export type ErisimDurumu = {
  aktif: boolean;
  bitis: Date | null;
  kalanGun: number | null;
  /** Erişimi olan fonksiyonlar — plan neyi kapsıyorsa o. */
  fonksiyonlar: FonksiyonId[];
  /** Bitişe UYARI_ESIGI_GUN veya daha az kaldıysa true. */
  yakindaBitiyor: boolean;
};

export const ERISIM_YOK: ErisimDurumu = {
  aktif: false,
  bitis: null,
  kalanGun: null,
  fonksiyonlar: [],
  yakindaBitiyor: false,
};

function kalanGunHesapla(bitis: Date): number {
  const fark = bitis.getTime() - Date.now();
  // Yukarı yuvarlanır: bugün biten abonelik "0 gün" değil "1 gün" görünür
  // ki kullanıcı son günü kaybettiğini sanmasın.
  return Math.max(0, Math.ceil(fark / (1000 * 60 * 60 * 24)));
}

/**
 * Giriş yapmış kullanıcının aktif aboneliğini okur.
 *
 * Oturum yoksa, abonelik yoksa/süresi dolmuşsa ya da Supabase
 * erişilemiyorsa ERISIM_YOK döner — asla fırlatmaz (sonKarne.ts ile
 * aynı savunmacı desen).
 */
export async function erisimDurumu(): Promise<ErisimDurumu> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return ERISIM_YOK;

    // En geç biten abonelik geçerli olandır (üst üste ay eklenmiş
    // olabilir).
    const { data, error } = await supabase
      .from("abonelikler")
      .select("id, baslangic, bitis, fonksiyonlar, aylik_tutar")
      .gt("bitis", new Date().toISOString())
      .order("bitis", { ascending: false })
      .limit(1)
      .maybeSingle<Abonelik>();

    if (error || !data) return ERISIM_YOK;

    const bitis = new Date(data.bitis);
    const kalanGun = kalanGunHesapla(bitis);

    return {
      aktif: true,
      bitis,
      kalanGun,
      fonksiyonlar: (data.fonksiyonlar ?? []) as FonksiyonId[],
      yakindaBitiyor: kalanGun <= UYARI_ESIGI_GUN,
    };
  } catch {
    return ERISIM_YOK;
  }
}

/** Kullanıcının belirli bir fonksiyonun modüllerine erişimi var mı? */
export function fonksiyonaErisimVarMi(
  erisim: ErisimDurumu,
  fonksiyonId: FonksiyonId,
): boolean {
  return erisim.aktif && erisim.fonksiyonlar.includes(fonksiyonId);
}

export function tarihBicimle(tarih: Date): string {
  return tarih.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
