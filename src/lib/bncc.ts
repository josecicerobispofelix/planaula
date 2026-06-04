// Mapeamento rigoroso de BNCC por série/ano
// Fonte: Base Nacional Comum Curricular oficial

export const BNCC_POR_SERIE: Record<string, { habilidades: string[]; competencias: string[] }> = {
  '1º ano': {
    competencias: [
      'Reconhecer a importância da leitura e da escrita em diferentes contextos',
      'Utilizar-se da linguagem para expressar sentimentos, experiências e ideias',
      'Compreender diferentes gêneros textuais',
    ],
    habilidades: [
      '(EF01LP01) Reconhecer que textos são lidos e escritos da esquerda para a direita e de cima para baixo',
      '(EF01LP02) Diferenciar letras de outros sinais gráficos',
      '(EF01LP03) Localizar informações explícitas em textos',
      '(EF01LP04) Ler, numerando, orações simples',
    ],
  },
  '2º ano': {
    competencias: [
      'Ler, compreender e interpretar textos em diferentes contextos',
      'Produzir textos em gêneros diversos',
      'Analisar aspectos notáveis da linguagem',
    ],
    habilidades: [
      '(EF02LP01) Utilizar, ao produzir um texto, recursos de referenciação (pronomes, elipses, repetição) para construir a coesão textual',
      '(EF02LP02) Segmentar corretamente as palavras ao escrever',
      '(EF02LP03) Ler e compreender com autonomia textos curtos',
      '(EF02LP04) Escrever textos simples em situações do cotidiano',
    ],
  },
  '3º ano': {
    competencias: [
      'Ler fluentemente diferentes tipos de textos',
      'Compreender e produzir textos com coerência e coesão',
      'Reconhecer estruturas textuais em gêneros variados',
    ],
    habilidades: [
      '(EF03LP01) Ler e compreender textos de diferentes gêneros',
      '(EF03LP02) Identificar o tema de textos lidos em voz alta',
      '(EF03LP03) Localizar informações explícitas em textos',
      '(EF03LP04) Inferir informações implícitas em textos',
      '(EF03LP05) Produzir textos com estrutura apropriada',
    ],
  },
  '4º ano': {
    competencias: [
      'Ler com fluência, compreensão e interpretação textos diversos',
      'Produzir textos coerentes, coesos e adequados ao contexto',
      'Analisar características de gêneros textuais',
      'Reconhecer aspectos gramaticais da língua portuguesa',
    ],
    habilidades: [
      '(EF04LP01) Salientar partes essentes de um texto lido em voz alta ou silenciosamente',
      '(EF04LP02) Ler e compreender, silenciosamente, textos narrativos de maior extensão',
      '(EF04LP03) Localizar informações explícitas em textos',
      '(EF04LP04) Identificar o tema/assunto de um texto',
      '(EF04LP05) Diferenciar discurso direto e indireto',
      '(EF04LP06) Produzir textos em diferentes gêneros, adequados ao contexto',
    ],
  },
  '5º ano': {
    competencias: [
      'Ler com fluência e compreensão textos de maior complexidade',
      'Produzir textos bem estruturados e coerentes',
      'Analisar aspectos semânticos, sintáticos e discursivos',
      'Reconhecer variações linguísticas',
    ],
    habilidades: [
      '(EF05LP01) Grafar corretamente palavras com dígrafos',
      '(EF05LP02) Identificar informações explícitas e implícitas em textos',
      '(EF05LP03) Inferir o sentido de uma palavra ou expressão',
      '(EF05LP04) Diferenciar tipos de narrador',
      '(EF05LP05) Analisar a progressão textual de diferentes gêneros',
      '(EF05LP06) Produzir textos com coerência e coesão',
    ],
  },
  '6º ano': {
    competencias: [
      'Ler e compreender textos de diferentes gêneros em prosa e poesia',
      'Produzir textos em diferentes gêneros adequados ao contexto',
      'Analisar estruturas gramaticais e discursivas',
      'Reconhecer variações linguísticas e registros de linguagem',
    ],
    habilidades: [
      '(EF06LP01) Reconhecer a impossibilidade de uma linguagem neutra',
      '(EF06LP02) Identificar particularidades linguísticas de diferentes gêneros textuais',
      '(EF06LP03) Analisar diferenças de sentido entre palavras de uma série sinonímica',
      '(EF06LP04) Analisar a estrutura de textos narrativos',
      '(EF06LP05) Produzir textos em diferentes gêneros com coerência',
      '(EF06LP06) Usar adequadamente modos e tempos verbais',
    ],
  },
  '7º ano': {
    competencias: [
      'Ler textos de diferentes gêneros, compreendendo suas características e funções',
      'Produzir textos coesos, coerentes e adequados ao contexto',
      'Analisar aspectos notáveis da linguagem em diferentes contextos',
      'Compreender fenômenos relacionados à variação e mudança linguística',
    ],
    habilidades: [
      '(EF07LP01) Distinguir diferentes contextos de uso da linguagem',
      '(EF07LP02) Identificar características de diferentes gêneros textuais',
      '(EF07LP03) Analisar processos de formação de palavras',
      '(EF07LP04) Reconhecer e diferenciar classes de palavras',
      '(EF07LP05) Produzir textos em diferentes gêneros com adequação',
      '(EF07LP06) Analisar aspectos sintáticos de períodos compostos',
    ],
  },
  '8º ano': {
    competencias: [
      'Ler textos diversos com autonomia e compreensão crítica',
      'Produzir textos argumentativos e de análise',
      'Compreender fenômenos linguísticos complexos',
      'Refletir sobre a variação e adequação linguística',
    ],
    habilidades: [
      '(EF08LP01) Identificar características de diferentes gêneros textuais',
      '(EF08LP02) Analisar aspectos relacionados à autoria e à estrutura de textos',
      '(EF08LP03) Reconhecer e analisar processos de formação de palavras',
      '(EF08LP04) Analisar estruturas sintáticas do período composto',
      '(EF08LP05) Produzir textos argumentativos com clareza',
      '(EF08LP06) Usar adequadamente conectivos e marcadores discursivos',
    ],
  },
  '9º ano': {
    competencias: [
      'Ler textos diversos com análise crítica e aprofundada',
      'Produzir textos argumentativos bem estruturados',
      'Analisar e refletir sobre fenômenos linguísticos complexos',
      'Compreender variações linguísticas e registro de linguagem em contextos específicos',
    ],
    habilidades: [
      '(EF09LP01) Distinguir diferentes contextos de uso da linguagem',
      '(EF09LP02) Identificar características de diferentes gêneros textuais',
      '(EF09LP03) Analisar processos de formação e transformação de palavras',
      '(EF09LP04) Reconhecer usos de diferentes classes de palavras em diferentes contextos',
      '(EF09LP05) Produzir textos argumentativos com estrutura clara',
      '(EF09LP06) Analisar períodos compostos e suas relações semânticas',
    ],
  },
  'Ensino Médio - 1º ano': {
    competencias: [
      'Compreender e analisar textos em diferentes linguagens e contextos',
      'Produzir textos artísticos, científicos e informativos',
      'Refletir criticamente sobre a linguagem e suas manifestações',
      'Compreender fenômenos sociais relacionados à linguagem',
    ],
    habilidades: [
      '(EM13LP01) Reconhecer características de diferentes gêneros discursivos',
      '(EM13LP02) Analisar como identidades sociais são construídas nos textos',
      '(EM13LP03) Analisar estruturas de diferentes textos',
      '(EM13LP04) Produzir textos em diferentes gêneros com consciência das escolhas linguísticas',
    ],
  },
  'Ensino Médio - 2º ano': {
    competencias: [
      'Ler e compreender textos diversos com análise crítica profunda',
      'Produzir textos bem estruturados em diferentes contextos',
      'Refletir sobre uso social da linguagem e suas implicações',
      'Analisar processos de significação na linguagem',
    ],
    habilidades: [
      '(EM13LP05) Analisar como textos constroem significados relacionados a temas como política, justiça, ética',
      '(EM13LP06) Produzir textos que respeitem estrutura, coerência e adequação ao contexto',
      '(EM13LP07) Analisar impactos de tecnologias digitais na linguagem',
    ],
  },
  'Ensino Médio - 3º ano': {
    competencias: [
      'Compreender e analisar textos em perspectiva histórica e crítica',
      'Produzir textos complexos para diferentes públicos e contextos',
      'Refletir criticamente sobre construção de sentidos na linguagem',
      'Utilizar linguagem como ferramenta de transformação social',
    ],
    habilidades: [
      '(EM13LP08) Analisar como textos refletem contextos históricos e sociais',
      '(EM13LP09) Produzir textos para diferentes contextos e públicos com adequação e coerência',
      '(EM13LP10) Analisar efeitos de sentido em textos multimodais',
    ],
  },
};

export function validarBNCCPorSerie(serie: string): boolean {
  return Object.keys(BNCC_POR_SERIE).includes(serie);
}

export function obterHabilidadesBNCC(serie: string): string[] {
  return BNCC_POR_SERIE[serie]?.habilidades || [];
}

export function obterCompetenciasBNCC(serie: string): string[] {
  return BNCC_POR_SERIE[serie]?.competencias || [];
}

export function formatarBNCCParaPrompt(serie: string): string {
  const dados = BNCC_POR_SERIE[serie];
  if (!dados) return '';

  return `
## BNCC para ${serie}

**Competências:**
${dados.competencias.map(c => `- ${c}`).join('\n')}

**Habilidades (BNCC):**
${dados.habilidades.map(h => `- ${h}`).join('\n')}
`;
}
