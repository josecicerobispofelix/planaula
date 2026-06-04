# PlanAula

Gerador de planos de aula com IA no padrão BNCC. React + Vite + TypeScript + Supabase.

## Instalação local

```bash
git clone <repo>
cd PlanAula
npm install
cp .env.example .env
# preencha .env com suas credenciais do Supabase
npm run dev
```

## Configuração do Supabase

### 1. Banco de dados — execute no SQL Editor do Supabase

```sql
create table planos (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade,
  disciplina text, serie text, tema text,
  duracao text, recursos text, conteudo text,
  created_at timestamptz default now()
);

create table usuarios (
  id uuid primary key references auth.users on delete cascade,
  plano text default 'gratis',
  planos_mes integer default 0,
  mes_ref text default ''
);

alter table planos enable row level security;
create policy "users own planos" on planos
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table usuarios enable row level security;
create policy "users own usuarios" on usuarios
  using (auth.uid() = id) with check (auth.uid() = id);

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.usuarios (id, plano, planos_mes, mes_ref)
  values (new.id, 'gratis', 0, '');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
```

### 2. Edge Function

```bash
# Instale a CLI do Supabase
npm install -g supabase

supabase login
supabase link --project-ref yqnbxpbbpbwjbtzydrqk
supabase secrets set OPENAI_API_KEY=sk-...
supabase functions deploy generate-plan
```

## Deploy no Vercel

1. Faça push do projeto para GitHub
2. Importe no [vercel.com](https://vercel.com)
3. Adicione as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy automático!

O `vercel.json` já está configurado para SPA (todas as rotas apontam para `index.html`).
