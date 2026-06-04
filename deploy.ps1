# Script de Deploy - Edge Function Supabase
# Uso: ./deploy.ps1 "seu_token_aqui"

param(
    [Parameter(Mandatory=$true)]
    [string]$Token
)

Write-Host "🚀 Iniciando deploy da Edge Function..." -ForegroundColor Cyan

# 1. Configurar token
$env:SUPABASE_ACCESS_TOKEN = $Token
Write-Host "✅ Token configurado" -ForegroundColor Green

# 2. Link com projeto
Write-Host "🔗 Linkando com projeto Supabase..." -ForegroundColor Cyan
cd "C:\Users\ciler\Documents\PlanAula"
npx supabase link --project-ref yqnbxpbbpbwjbtzydrqk

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao linkar projeto" -ForegroundColor Red
    exit 1
}

# 3. Fazer deploy da função
Write-Host "📤 Fazendo deploy da função..." -ForegroundColor Cyan
npx supabase functions deploy generate-plan

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deploy concluído com sucesso!" -ForegroundColor Green
    Write-Host "🎉 Edge Function está ativa!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro no deploy" -ForegroundColor Red
    exit 1
}
