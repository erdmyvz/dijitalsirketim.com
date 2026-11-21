-- Dijital Şirketim — veritabanı şeması
-- Supabase SQL Editor'a yapıştırıp çalıştırın. Tekrar çalıştırmak
-- güvenlidir: her ifade "if not exists" ile korunuyor.
--
-- Faz 1'de tek bir tablo var: görüşme talepleri. Reklam hesabı,
-- mesajlar ve rakip verileri faz 2'de eklenecek.

create table if not exists public.gorusme_talepleri (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  ad_soyad      text not null,
  telefon       text not null,
  eposta        text,
  -- 'ajans' (dijital pazarlama işi yapan) veya 'isletme' (kendi işi
  -- için pazarlama yapan). Serbest metin kabul edilmez.
  kim           text check (kim in ('ajans', 'isletme')),
  isletme       text,
  -- 'not' SQL'de ayrılmış kelime; sütun adı bilerek 'mesaj'.
  mesaj         text,
  -- Takip konuşmasında kullanılan kısa kod (DS-XXXX).
  referans_kodu text,
  -- Erdem'in kendi iş akışı: talebe dönüldü mü?
  donuldu       boolean not null default false
);

comment on table public.gorusme_talepleri is
  'Siteden gelen görüşme talepleri. Yalnızca servis rolü yazar, kimse okuyamaz.';

-- Satır bazlı güvenlik açık ve HİÇBİR politika tanımlı değil.
-- Sonuç: anon ve authenticated roller bu tabloyu ne okuyabilir ne
-- yazabilir. Yazma işlemi yalnızca sunucudaki servis rolü anahtarıyla
-- yapılır (RLS'i atlar), okuma ise şimdilik yalnızca Supabase panelinden.
-- Yönetim ekranı eklendiğinde buraya admin okuma politikası gelecek.
alter table public.gorusme_talepleri enable row level security;

-- Yeni talepler önce görünsün.
create index if not exists gorusme_talepleri_created_at_idx
  on public.gorusme_talepleri (created_at desc);
