create table if not exists public.leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) <= 160),
  company text check (char_length(company) <= 100),
  message text not null check (char_length(message) between 10 and 3000),
  consent_version text not null,
  status text not null default 'new' check (status in ('new','contacted','qualified','archived'))
);
alter table public.leads enable row level security;
revoke all on table public.leads from anon, authenticated;
grant insert on table public.leads to anon;
grant usage, select on sequence public.leads_id_seq to anon;
create policy "Anonymous visitors can create leads"
on public.leads for insert to anon
with check (
  char_length(name) between 2 and 80
  and char_length(email) <= 160
  and char_length(message) between 10 and 3000
);
