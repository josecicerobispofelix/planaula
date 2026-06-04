import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { disciplina, serie, tema, duracao, recursos } = await req.json()

    const openaiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiKey) {
      return new Response(JSON.stringify({ error: 'OPENAI_API_KEY não configurada' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente especializado em educação brasileira. Gere planos de aula completos, objetivos, no padrão BNCC, em português do Brasil. Seja prático e direto.'
          },
          {
            role: 'user',
            content: `Crie um plano de aula para a disciplina ${disciplina}, série ${serie}, tema: ${tema}, duração: ${duracao}, recursos disponíveis: ${recursos}. Estruture com as seções: Objetivo Geral, Conteúdo Programático, Metodologia, Recursos Didáticos, Avaliação e Habilidades BNCC relacionadas.`
          }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      })
    })

    if (!response.ok) {
      const err = await response.text()
      return new Response(JSON.stringify({ error: `Erro OpenAI: ${err}` }), {
        status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const data = await response.json()
    const plano = data.choices?.[0]?.message?.content || ''

    return new Response(JSON.stringify({ plano }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
