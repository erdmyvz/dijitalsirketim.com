// ÖDEME BİLGİLERİ — tek düzenleme noktası.
//
// MVP'de ödeme manuel havale/EFT ile alınıyor (bkz. KARARLAR.md).
// Aşağıdaki üç değer doldurulana kadar başvuru sonrası ekran IBAN
// GÖSTERMEZ; bunun yerine "ödeme bilgileri sizinle paylaşılacak" deyip
// WhatsApp'a yönlendirir.
//
// Bu bilinçli bir güvenlik önlemi: yer tutucu bir IBAN'ın canlıya
// sızması, müşterinin yanlış hesaba para göndermesi demek olurdu.
//
// Doldurmak için: null değerleri gerçek bilgilerle değiştirin.

/** Check-Up ücreti, gösterilecek biçimde (ör. "12.500 TL"). */
export const CHECKUP_UCRETI: string | null = null;

/** IBAN, boşluklu yazılabilir (ör. "TR00 0000 0000 0000 0000 0000 00"). */
export const IBAN: string | null = null;

/** Hesap sahibinin adı — havalede alıcı adı olarak görünecek isim. */
export const HESAP_SAHIBI: string | null = null;

/** Üçü de doldurulduysa ödeme talimatı ekranı gösterilebilir. */
export function odemeBilgileriHazirMi(): boolean {
  return Boolean(CHECKUP_UCRETI && IBAN && HESAP_SAHIBI);
}
