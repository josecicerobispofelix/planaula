# 🚀 Deploy da Edge Function - Agora!

## Passo 1: Obter Access Token (30 seg)

1. **Abra:** https://supabase.com/dashboard/account/tokens
2. Clique em **"Create a new token"**
3. Nome: `PlanAula Deploy`
4. Clique em **"Create token"**
5. **COPIE O TOKEN INTEIRO** (começa com `sbp_`)
   - ⚠️ Não compartilhe com ninguém
   - ⚠️ Só aparece uma vez!

## Passo 2: Fazer Deploy (1 min)

### **Windows (PowerShell):**

```powershell
cd C:\Users\ciler\Documents\PlanAula
.\deploy.ps1 "seu_token_aqui"
```

Substitua `seu_token_aqui` pelo token que copiou.

### **Linux/Mac (Terminal):**

```bash
cd /c/Users/ciler/Documents/PlanAula
chmod +x deploy.sh
./deploy.sh "seu_token_aqui"
```

Substitua `seu_token_aqui` pelo token que copiou.

## Exemplo Completo:

```powershell
.\deploy.ps1 "sbp_1a2b3c4d5e6f7g8h9i0j"
```

## Sucesso! 🎉

Quando ver:
```
✅ Deploy concluído com sucesso!
🎉 Edge Function está ativa!
```

**Seu app está 100% pronto para o público!**

---

## Troubleshooting

### "Token inválido"
- Verifique se copiou o token inteiro
- Tente gerar um novo token

### "Acesso negado"
- Verifique se o token tem permissão para `Functions`
- Gere um novo token com permissão total

### "Função não encontrada"
- Aguarde 30 segundos e tente acessar o app novamente
- Cache pode estar desatualizado

---

**Precisa de ajuda?**
Abra uma issue em: https://github.com/josecicerobispofelix/planaula/issues
