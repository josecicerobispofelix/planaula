#!/bin/bash
# Script de Deploy - Edge Function Supabase
# Uso: ./deploy.sh "seu_token_aqui"

if [ -z "$1" ]; then
    echo "❌ Token não fornecido!"
    echo "Uso: ./deploy.sh \"seu_token_aqui\""
    echo ""
    echo "Para obter o token:"
    echo "1. Acesse: https://supabase.com/dashboard/account/tokens"
    echo "2. Clique em 'Create a new token'"
    echo "3. Nome: PlanAula Deploy"
    echo "4. Copie o token (começa com 'sbp_')"
    exit 1
fi

TOKEN=$1

echo "🚀 Iniciando deploy da Edge Function..."

# 1. Configurar token
export SUPABASE_ACCESS_TOKEN="$TOKEN"
echo "✅ Token configurado"

# 2. Link com projeto
echo "🔗 Linkando com projeto Supabase..."
cd /c/Users/ciler/Documents/PlanAula || exit 1
npx supabase link --project-ref yqnbxpbbpbwjbtzydrqk

if [ $? -ne 0 ]; then
    echo "❌ Erro ao linkar projeto"
    exit 1
fi

# 3. Fazer deploy da função
echo "📤 Fazendo deploy da função..."
npx supabase functions deploy generate-plan

if [ $? -eq 0 ]; then
    echo "✅ Deploy concluído com sucesso!"
    echo "🎉 Edge Function está ativa!"
else
    echo "❌ Erro no deploy"
    exit 1
fi
