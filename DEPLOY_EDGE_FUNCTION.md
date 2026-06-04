# Deploy da Edge Function - Validação BNCC

A Edge Function `generate-plan` foi atualizada com validação **100% BNCC-conformante** por série.

## Atualizações Incluídas

✅ Mapeamento rigoroso de habilidades BNCC por série (1º ao 9º ano + Ensino Médio)
✅ Prompt melhorado que força conformidade BNCC
✅ Validação de série antes de gerar plano
✅ Contexto BNCC específico incluído na requisição ao GPT-4o-mini

## Como Fazer Deploy

### Opção 1: Via CLI Supabase (Recomendado)

```bash
# 1. Faça login no Supabase
npx supabase login

# 2. Link com seu projeto
npx supabase link --project-ref yqnbxpbbpbwjbtzydrqk

# 3. Deploy da função
npx supabase functions deploy generate-plan
```

### Opção 2: Via Supabase Dashboard

1. Acesse https://supabase.com/dashboard
2. Vá para: `yqnbxpbbpbwjbtzydrqk` → Functions → `generate-plan`
3. Copie o conteúdo de `supabase/functions/generate-plan/index.ts`
4. Cole no editor do dashboard
5. Clique em "Save"

### Opção 3: Via API Direct (Se tiver token)

```bash
export SUPABASE_ACCESS_TOKEN="seu_token_aqui"
npx supabase functions deploy generate-plan
```

## Como Obter Access Token

1. Acesse https://supabase.com/dashboard/account/tokens
2. Clique em "Create a new token"
3. Dê um nome (ex: "PlanAula Deploy")
4. Copie o token
5. Use: `supabase login --token "seu_token"`

## Verificar Deploy

Depois de fazer deploy, teste a função:

```bash
npx supabase functions get generate-plan
```

## O que Mudou

### Antes
- Prompt genérico que deixava a IA "improvisar" BNCC
- Risco de habilidades incorretas para a série

### Depois
- ✅ Sistema de referência BNCC por série
- ✅ Prompt que força conformidade com habilidades corretas
- ✅ Códigos BNCC oficiais (EF01LP01, etc) inclusos
- ✅ Temperature reduzida para mais consistência

## Verificação de Conformidade

A função agora:

1. Recebe série do aluno
2. Busca habilidades BNCC corretas para essa série
3. Inclui no prompt do GPT-4o-mini
4. Força modelo a usar APENAS essas habilidades
5. Resulta em planos 100% alinhados com BNCC

## Dúvidas?

Consulte:
- BNCC oficial: http://basenacionalcomum.mec.gov.br
- Supabase docs: https://supabase.com/docs/guides/functions/deploy
