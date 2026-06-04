# Deploy Rápido - Edge Function BNCC

## Passo 1: Obter Access Token (2 min)

1. Acesse: https://supabase.com/dashboard/account/tokens
2. Clique em **"Create a new token"**
3. Nome: `PlanAula Deploy`
4. Escopo: `All` ou `Functions`
5. **Copie o token inteiro** (começa com `sbp_...`)

## Passo 2: Fazer Deploy (30 seg)

### Windows PowerShell:
```powershell
$env:SUPABASE_ACCESS_TOKEN = "seu_token_aqui"
cd C:\Users\ciler\Documents\PlanAula
npx supabase link --project-ref yqnbxpbbpbwjbtzydrqk
npx supabase functions deploy generate-plan
```

### Linux/Mac Terminal:
```bash
export SUPABASE_ACCESS_TOKEN="seu_token_aqui"
cd /c/Users/ciler/Documents/PlanAula
npx supabase link --project-ref yqnbxpbbpbwjbtzydrqk
npx supabase functions deploy generate-plan
```

## Passo 3: Verificar Deploy

```bash
npx supabase functions get generate-plan
```

Você deve ver a função listada com status **"Active"** ✅

## Alternativa: Deploy via Dashboard (Mais lento)

1. Acesse: https://supabase.com/dashboard/project/yqnbxpbbpbwjbtzydrqk/functions
2. Clique em `generate-plan`
3. Cole o código de: `supabase/functions/generate-plan/index.ts`
4. Clique **Save**

---

**⏱️ Tempo total: ~5 minutos**

Depois disso, o sistema de **validação BNCC com retry** estará ativo! 🚀
