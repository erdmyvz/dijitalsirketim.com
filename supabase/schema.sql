-- dijitalşirketim.com.tr — Supabase şeması
-- Bu dosyayı Supabase Dashboard > SQL Editor'de bir kez çalıştırın.

-- Check-Up başvuruları tablosu
create table if not exists public.basvurular (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ad_soyad text not null,
  isletme_adi text,
  sektor text,
  telefon text not null,
  -- Havale/EFT açıklamasına yazılan kod. Gelen ödemeyi başvuruyla
  -- eşleştirmek için kullanılır (ör. "DS-4K7M").
  referans_kodu text
);

-- Şemayı daha önce çalıştırdıysanız, eksik kolonu eklemek için:
alter table public.basvurular
  add column if not exists referans_kodu text;

-- Satır Düzeyi Güvenlik (RLS): tablo varsayılan olarak herkese kapalı.
alter table public.basvurular enable row level security;

-- Giriş yapmış kullanıcılar (admin) başvuruları okuyabilir.
-- Not: Bu projede Supabase Auth'a yalnızca admin kullanıcı(lar) eklenir;
-- sitede halka açık üyelik yoktur.
create policy "Admin basvurulari okuyabilir"
  on public.basvurular
  for select
  to authenticated
  using (true);

-- INSERT için policy YOK: kayıtlar yalnızca sunucudaki API route'un
-- kullandığı service-role anahtarıyla eklenir (service role RLS'i
-- baypas eder). Böylece anon anahtarı sızsa bile tabloya dışarıdan
-- kayıt eklenemez / okunamaz.
