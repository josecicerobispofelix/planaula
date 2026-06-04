import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// Mapeamento BNCC por série - referência rigorosa
const BNCC_REFERENCIAS: Record<string, string> = {
  '1º ano': `Habilidades BNCC para 1º ano:
  - EF01LP01: Reconhecer características da linguagem escrita
  - EF01LP02: Identificar letras do alfabeto
  - EF01LP03: Localizar informações explícitas em textos
  - EF01MA01: Identificar quantidade de objetos em conjuntos`,

  '2º ano': `Habilidades BNCC para 2º ano:
  - EF02LP01: Utilizar recursos de referenciação
  - EF02LP02: Segmentar corretamente palavras
  - EF02LP03: Ler e compreender com autonomia
  - EF02MA01: Comparar e ordenar números naturais`,

  '3º ano': `Habilidades BNCC para 3º ano:
  - EF03LP01: Ler e compreender textos diversos
  - EF03LP02: Identificar tema de textos
  - EF03LP03: Localizar informações explícitas
  - EF03MA01: Ler, escrever e comparar números naturais`,

  '4º ano': `Habilidades BNCC para 4º ano:
  - EF04LP01: Salientar partes essentes de textos
  - EF04LP02: Ler textos narrativos de maior extensão
  - EF04LP03: Localizar informações em textos
  - EF04MA01: Ler, escrever e comparar números naturais`,

  '5º ano': `Habilidades BNCC para 5º ano:
  - EF05LP01: Grafar corretamente palavras
  - EF05LP02: Identificar informações explícitas e implícitas
  - EF05LP03: Inferir sentido de palavras
  - EF05MA01: Ler, escrever e comparar números naturais`,

  '6º ano': `Habilidades BNCC para 6º ano:
  - EF06LP01: Reconhecer impossibilidade de linguagem neutra
  - EF06LP02: Identificar particularidades linguísticas
  - EF06LP03: Analisar diferenças de sentido
  - EF06MA01: Comparar, ordenar e aproximar números racionais`,

  '7º ano': `Habilidades BNCC para 7º ano:
  - EF07LP01: Distinguir contextos de uso da linguagem
  - EF07LP02: Identificar características de gêneros
  - EF07LP03: Analisar processos de formação de palavras
  - EF07MA01: Problematizar e resolver problemas de multiplicação e divisão`,

  '8º ano': `Habilidades BNCC para 8º ano:
  - EF08LP01: Identificar características de gêneros textuais
  - EF08LP02: Analisar aspectos de autoria
  - EF08LP03: Reconhecer processos de formação de palavras
  - EF08MA01: Efetuar cálculos com números racionais`,

  '9º ano': `Habilidades BNCC para 9º ano:
  - EF09LP01: Distinguir contextos de uso da linguagem
  - EF09LP02: Identificar características de gêneros
  - EF09LP03: Analisar processos de formação de palavras
  - EF09MA01: Reconhecer que, uma equação do 1º grau é uma igualdade`,
};

function getBNCC(serie: string): string {
  return BNCC_REFERENCIAS[serie] || `Série: ${serie}\nGaranta conformidade com a BNCC oficial para esta série.`;
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

    const bnccContext = getBNCC(serie)

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
            content: `Você é um especialista em educação brasileira com profundo conhecimento da BNCC (Base Nacional Comum Curricular).

IMPORTANTE: Você DEVE garantir 100% de conformidade com a BNCC para a série/ano informado. Não improvise habilidades BNCC.

Ao gerar planos de aula:
1. Use APENAS habilidades BNCC corretas para a série especificada
2. Cite os códigos BNCC (ex: EF05LP01) quando possível
3. Alinhe metodologia com competências da série
4. Se não tiver certeza de uma habilidade BNCC, use uma genérica mas CORRETA para a série
5. Estruture de forma clara e prática

Gere em português do Brasil, com linguagem clara e didática.`
          },
          {
            role: 'user',
            content: `${bnccContext}

Disciplina: ${disciplina}
Série: ${serie}
Tema: ${tema}
Duração: ${duracao}
Recursos: ${recursos}

Crie um PLANO DE AULA COMPLETO com as seguintes seções:

## Dados da Aula
- Disciplina: ${disciplina}
- Série: ${serie}
- Tema: ${tema}
- Duração: ${duracao}

## Objetivos Gerais
[Pelo menos 3 objetivos alinhados com BNCC]

## Habilidades BNCC Trabalhar
[Liste os códigos e descrições das habilidades BNCC específicas para ${serie}]

## Conteúdo Programático
[Conteúdo estruturado por tópicos]

## Metodologia
[Estratégias pedagógicas específicas]

## Recursos Didáticos Necessários
- Recursos fornecidos: ${recursos}
- Recursos complementares sugeridos

## Procedimento Passo a Passo
[Descrição detalhada da execução da aula]

## Avaliação
[Critérios de avaliação alinhados com BNCC]

## Reflexões Finais
[Considerações sobre o aprendizado esperado]`
          }
        ],
        max_tokens: 2000,
        temperature: 0.5,
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
