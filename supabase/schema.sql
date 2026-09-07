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
