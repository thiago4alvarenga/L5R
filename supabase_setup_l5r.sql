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
