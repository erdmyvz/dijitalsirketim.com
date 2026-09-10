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

-- INSERT için policy YOK: kayıtlar yalnızca sunucudaki API route'un
-- kullandığı service-role anahtarıyla eklenir (service role RLS'i
-- baypas eder). Böylece anon anahtarı sızsa bile tabloya dışarıdan
-- kayıt eklenemez / okunamaz.

-- =====================================================================
-- Üyelik ve müşteri paneli (2026-09-07)
-- =====================================================================
-- Bu bölümden önce "authenticated = admin" varsayımı geçerliydi, çünkü
-- Supabase Auth'a yalnızca admin hesabı elle ekleniyordu. Artık
-- müşteriler de kayıt olabildiği için bu varsayım YANLIŞ ve güvenlik
-- açığı: aşağıdaki "profiles" tablosu olmadan, herhangi bir müşteri
-- hesabı da "basvurular" tablosunun tamamını okuyabilirdi.

-- profiles: her auth.users satırına karşılık bir profil; admin bayrağı
-- burada tutulur.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Herkes yalnızca kendi profilini okuyabilir.
drop policy if exists "Kullanici kendi profilini okur" on public.profiles;
create policy "Kullanici kendi profilini okur"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

-- Yeni kullanıcı kaydolduğunda otomatik profil satırı oluşturan
-- tetikleyici (is_admin varsayılan olarak false — yalnızca aşağıdaki
-- tek seferlik INSERT ile admin hesabı işaretlenir).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, is_admin)
  values (new.id, false)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- TEK SEFERLİK BACKFILL: bu ALTER'ı ilk çalıştırdığınızda henüz
-- profiles satırı olmayan kullanıcı(lar) — o an yalnızca elle
-- eklediğiniz admin hesabınız — admin olarak işaretlenir. Var olan bir
-- profiles satırını asla GÜNCELLEMEZ (ON CONFLICT DO NOTHING), yani
-- bu SQL'i tekrar çalıştırmak ileride kaydolan müşterileri admin
-- yapmaz.
insert into public.profiles (id, is_admin)
select id, true from auth.users
where id not in (select id from public.profiles)
on conflict (id) do nothing;

-- basvurular: "authenticated = admin" artık geçersiz — yalnızca
-- profiles.is_admin=true olanlar okuyabilsin.
drop policy if exists "Admin basvurulari okuyabilir" on public.basvurular;
drop policy if exists "Sadece adminler basvurulari okuyabilir" on public.basvurular;
create policy "Sadece adminler basvurulari okuyabilir"
  on public.basvurular
  for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_admin
    )
  );

-- karneler: check-up sonuçlarının müşteri hesabına bağlı kaydı.
-- Puanlama tekrar hesaplanabilsin diye yalnızca ham veriler (profil +
-- 21 cevap) tutulur; skor her görüntülemede src/lib/checkup/scoring.ts
-- ile taze hesaplanır. ai_teshis ise o ana ait bir "anlık görüntü" —
-- her açılışta yeniden üretilmez (hem maliyet hem tutarlılık için).
create table if not exists public.karneler (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  isletme_adi text,
  sektor text,
  is_modeli text,
  calisan_sayisi text,
  ciro_araligi text,
  problem_metni text,
  cevaplar jsonb not null,
  ai_teshis jsonb,
  -- Tedavi sürecinin takibi (ileride admin panelinden güncellenecek).
  durum text not null default 'Beklemede'
);

alter table public.karneler enable row level security;

drop policy if exists "Kullanici kendi karnelerini okur" on public.karneler;
create policy "Kullanici kendi karnelerini okur"
  on public.karneler
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Kullanici kendi karnesini ekler" on public.karneler;
create policy "Kullanici kendi karnesini ekler"
  on public.karneler
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Adminler tum karneleri okur" on public.karneler;
create policy "Adminler tum karneleri okur"
  on public.karneler
  for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_admin
    )
  );

-- ---------------------------------------------------------------------
-- Ayarlar: fiyat ve ödeme bilgileri (admin panelinden düzenlenir)
-- ---------------------------------------------------------------------
-- Fiyat kodda sabit tutulmuyor; birim ücret, Nabız Planı tabanı ve
-- ödeme bilgileri buradan okunuyor (bkz. KARARLAR.md 2026-09-10).
-- Tablo okunamazsa uygulama koddaki varsayılana düşer, çökmez.

create table if not exists public.ayarlar (
  anahtar text primary key,
  deger text not null,
  guncellendi timestamptz not null default now()
);

alter table public.ayarlar enable row level security;

-- Fiyat ve IBAN zaten kullanıcıya gösterilen bilgiler — okuması serbest.
drop policy if exists "Ayarlari herkes okuyabilir" on public.ayarlar;
create policy "Ayarlari herkes okuyabilir"
  on public.ayarlar
  for select
  using (true);

-- Yazma yalnızca adminlere açık.
drop policy if exists "Ayarlari sadece admin yazar" on public.ayarlar;
create policy "Ayarlari sadece admin yazar"
  on public.ayarlar
  for all
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_admin
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_admin
    )
  );

-- Başlangıç değerleri (yalnızca yoksa eklenir — mevcut değerleri ezmez).
insert into public.ayarlar (anahtar, deger) values
  ('birim_ucret', '10000'),
  ('nabiz_tabani', '5000')
on conflict (anahtar) do nothing;

-- ---------------------------------------------------------------------
-- Abonelikler: tedavi sistemine erişim hakkı
-- ---------------------------------------------------------------------
-- Ödeme manuel havale/EFT ile alınıyor; admin bankadan görüp panelden
-- onaylıyor ve süre tanıyor (bkz. KARARLAR.md 2026-09-10).
-- Erişim, planın kapsadığı FONKSİYONLARLA SINIRLI: 4 fonksiyon için
-- ödeyen, yalnızca o 4 fonksiyonun modüllerini görür.

create table if not exists public.abonelikler (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  baslangic timestamptz not null default now(),
  bitis timestamptz not null,
  -- questions.ts'teki FonksiyonId değerleri: 'musteri_bulma' vb.
  fonksiyonlar text[] not null default '{}',
  -- Onay anındaki aylık tutar — kayıt/denetim için.
  aylik_tutar numeric,
  aciklama text,
  -- Hangi admin onayladı.
  olusturan uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create index if not exists abonelikler_user_bitis_idx
  on public.abonelikler (user_id, bitis desc);

alter table public.abonelikler enable row level security;

drop policy if exists "Kullanici kendi aboneligini okur" on public.abonelikler;
create policy "Kullanici kendi aboneligini okur"
  on public.abonelikler
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Aboneliği yalnızca admin oluşturur/değiştirir — kullanıcı kendine
-- erişim yazamaz.
drop policy if exists "Abonelikleri sadece admin yonetir" on public.abonelikler;
create policy "Abonelikleri sadece admin yonetir"
  on public.abonelikler
  for all
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_admin
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_admin
    )
  );

-- Ödeme bilgileri de ayarlardan okunur (boş bırakılırsa ekranda IBAN
-- gösterilmez, WhatsApp'a yönlendirilir — yanlış hesaba ödeme riskine
-- karşı, mevcut odeme.ts davranışının aynısı).
insert into public.ayarlar (anahtar, deger) values
  ('iban', ''),
  ('hesap_sahibi', '')
on conflict (anahtar) do nothing;

-- ---------------------------------------------------------------------
-- Modül ilerlemesi: kullanıcının hangi adımı bitirdiği, şablona ne yazdığı
-- ---------------------------------------------------------------------
-- modul_id / adim_id, src/data/moduller.ts'teki id'lerdir. Bu yüzden o
-- id'ler bir kez yayına çıktıktan sonra DEĞİŞTİRİLMEMELİ — değişirse
-- kullanıcının ilerlemesi o adıma bağlanamaz.

create table if not exists public.modul_ilerleme (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  modul_id text not null,
  adim_id text not null,
  tamamlandi boolean not null default false,
  -- Kullanıcının şablona yazdığı metin; yarıda bırakıp dönebilsin.
  sablon_metni text,
  guncellendi timestamptz not null default now(),
  unique (user_id, modul_id, adim_id)
);

create index if not exists modul_ilerleme_user_modul_idx
  on public.modul_ilerleme (user_id, modul_id);

alter table public.modul_ilerleme enable row level security;

-- Kullanıcı yalnızca kendi ilerlemesini görür ve yazar.
drop policy if exists "Kullanici kendi ilerlemesini yonetir" on public.modul_ilerleme;
create policy "Kullanici kendi ilerlemesini yonetir"
  on public.modul_ilerleme
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Adminler ilerlemeyi okuyabilir (destek/takip için).
drop policy if exists "Adminler ilerlemeyi okur" on public.modul_ilerleme;
create policy "Adminler ilerlemeyi okur"
  on public.modul_ilerleme
  for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_admin
    )
  );
