-- Família L5R — configuração do banco (rode no SQL Editor do projeto Supabase)
-- Cria a tabela de famílias, ativa RLS com políticas públicas (jogo colaborativo por código de sala)
-- e habilita atualização ao vivo (realtime).
-- Pode rodar no MESMO projeto do Kingdom (é uma tabela nova, não colide com kingdom_reinos)
-- ou em um projeto Supabase separado — só trocar SUPA_URL/SUPA_KEY no topo do index.html.

create table if not exists public.l5r_familias (
  codigo      text primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

alter table public.l5r_familias enable row level security;

drop policy if exists "l5r_select" on public.l5r_familias;
drop policy if exists "l5r_insert" on public.l5r_familias;
drop policy if exists "l5r_update" on public.l5r_familias;

create policy "l5r_select" on public.l5r_familias for select using (true);
create policy "l5r_insert" on public.l5r_familias for insert with check (true);
create policy "l5r_update" on public.l5r_familias for update using (true) with check (true);

alter publication supabase_realtime add table public.l5r_familias;

-- 2026-11-05: a lista de famílias do app ordena por updated_at. O app já manda a data em cada
-- gravação; este gatilho garante a ordem mesmo se alguma gravação vier sem ela.
create or replace function public.l5r_tocar_updated_at() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
drop trigger if exists l5r_tocar on public.l5r_familias;
create trigger l5r_tocar before insert or update on public.l5r_familias
  for each row execute function public.l5r_tocar_updated_at();
