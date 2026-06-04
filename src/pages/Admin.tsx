import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

interface Stats {
  totalUsuarios: number
  usuariosGratis: number
  usuariosStarter: number
  usuariosPro: number
  usuariosEscola: number
  totalPlanosGerados: number
  custoAPITotal: number
  receitaTeórica: number
  lucroLíquido: number
}

const PREÇOS = { gratis: 0, starter: 19, pro: 39, escola: 89 }
const CUSTO_POR_PLANO = 0.006
const EMAIL_ADMIN = 'cicerobispofelix@gmail.com'

export default function Admin() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user || user.email !== EMAIL_ADMIN) {
        setError('Acesso negado. Apenas admin pode acessar.')
        setLoading(false)
        setTimeout(() => navigate('/'), 2000)
        return
      }

      Promise.all([
        supabase.from('usuarios').select('plano'),
        supabase.from('planos').select('id', { count: 'exact' }),
        supabase.from('planos').select('user_id')
      ]).then(async ([usuariosRes, planosCountRes, planosRes]) => {
        const usuarios = usuariosRes.data || []
        const planosCount = planosCountRes.count || 0
        const planos = planosRes.data || []

        const contagem = {
          gratis: usuarios.filter((u: any) => u.plano === 'gratis').length,
          starter: usuarios.filter((u: any) => u.plano === 'starter').length,
          pro: usuarios.filter((u: any) => u.plano === 'pro').length,
          escola: usuarios.filter((u: any) => u.plano === 'escola').length,
        }

        const custoAPI = planosCount * CUSTO_POR_PLANO
        const receita =
          (contagem.starter * PREÇOS.starter) +
          (contagem.pro * PREÇOS.pro) +
          (contagem.escola * PREÇOS.escola)
        const lucro = receita - custoAPI

        setStats({
          totalUsuarios: usuarios.length,
          usuariosGratis: contagem.gratis,
          usuariosStarter: contagem.starter,
          usuariosPro: contagem.pro,
          usuariosEscola: contagem.escola,
          totalPlanosGerados: planosCount,
          custoAPITotal: custoAPI,
          receitaTeórica: receita,
          lucroLíquido: lucro,
        })
        setLoading(false)
      })
    })
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="spinner" />
    </div>
  )

  if (error) return (
    <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--text)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{error}</h2>
      <p style={{ color: 'var(--muted)' }}>Redirecionando em breve...</p>
    </div>
  )

  if (!stats) return null

  const margemLucro = stats.receitaTeórica > 0
    ? ((stats.lucroLíquido / stats.receitaTeórica) * 100).toFixed(1)
    : '0'
  const statusLucro = stats.lucroLíquido > 0 ? '✅' : '❌'
  const alertaCusto = stats.custoAPITotal > (stats.receitaTeórica * 0.5)

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>📊 Analytics PlanAula</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Dashboard administrativo • Última atualização: {new Date().toLocaleTimeString('pt-BR')}</p>

      {/* Alerta de custo alto */}
      {alertaCusto && (
        <div style={{
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '2rem'
        }}>
          <div style={{ fontWeight: 700, color: '#ef4444', marginBottom: '0.25rem' }}>⚠️ Atenção: Custo alto de API</div>
          <p style={{ color: 'var(--text)', fontSize: '0.9rem' }}>
            O custo de API (R${stats.custoAPITotal.toFixed(2)}) está acima de 50% da receita. Considere revisar os preços.
          </p>
        </div>
      )}

      {/* Cards principais */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Planos Gerados (mês)', valor: stats.totalPlanosGerados, cor: 'var(--primary)' },
          { label: 'Custo API Total', valor: `R$${stats.custoAPITotal.toFixed(2)}`, cor: '#ef4444' },
          { label: 'Receita Teórica', valor: `R$${stats.receitaTeórica.toFixed(2)}`, cor: '#22c55e' },
          { label: 'Lucro Líquido', valor: `${statusLucro} R$${stats.lucroLíquido.toFixed(2)}`, cor: stats.lucroLíquido > 0 ? '#22c55e' : '#ef4444' },
        ].map((card, i) => (
          <div key={i} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{card.label}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: card.cor }}>{card.valor}</div>
          </div>
        ))}
      </div>

      {/* Margem de lucro */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '1rem' }}>📈 Margem de Lucro</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Percentual</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{margemLucro}%</div>
          </div>
          <div>
            <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Recomendado</div>
            <div style={{ fontSize: '1rem', color: 'var(--text)' }}>Mínimo 80% de lucro</div>
          </div>
        </div>

        {/* Barra de progresso */}
        <div style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', height: '12px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${Math.min(Number(margemLucro), 100)}%`,
            background: Number(margemLucro) >= 80 ? '#22c55e' : '#ef4444',
            transition: 'width 0.3s'
          }} />
        </div>
      </div>

      {/* Distribuição de usuários */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '1rem' }}>👥 Distribuição de Usuários ({stats.totalUsuarios})</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {[
            { plano: 'Grátis', qtd: stats.usuariosGratis, preço: 0, cor: '#6b7280' },
            { plano: 'Starter', qtd: stats.usuariosStarter, preço: PREÇOS.starter, cor: '#3b82f6' },
            { plano: 'Pro', qtd: stats.usuariosPro, preço: PREÇOS.pro, cor: 'var(--primary)' },
            { plano: 'Escola', qtd: stats.usuariosEscola, preço: PREÇOS.escola, cor: '#8b5cf6' },
          ].map(p => (
            <div key={p.plano} style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
              borderRadius: '10px', padding: '1rem', textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: p.cor }}>{p.qtd}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>{p.plano}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text)' }}>R${p.preço}/mês</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela de custo por plano */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '1rem' }}>💰 Rentabilidade por Plano</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
                {['Plano', 'Usuários', 'Preço/mês', 'Receita', 'Planos ~', 'Custo API', 'Lucro'].map(h => (
                  <th key={h} style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--muted)', fontSize: '0.8rem', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { plano: 'Starter', usuarios: stats.usuariosStarter, preço: PREÇOS.starter, limit: 30 },
                { plano: 'Pro', usuarios: stats.usuariosPro, preço: PREÇOS.pro, limit: 100 },
                { plano: 'Escola', usuarios: stats.usuariosEscola, preço: PREÇOS.escola, limit: 500 },
              ].map(p => {
                const planosEstimados = p.usuarios * p.limit
                const custoAPI = planosEstimados * CUSTO_POR_PLANO
                const receita = p.usuarios * p.preço
                const lucro = receita - custoAPI
                return (
                  <tr key={p.plano} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>{p.plano}</td>
                    <td style={{ padding: '0.75rem' }}>{p.usuarios}</td>
                    <td style={{ padding: '0.75rem' }}>R${p.preço}</td>
                    <td style={{ padding: '0.75rem', color: '#22c55e', fontWeight: 600 }}>R${receita.toFixed(2)}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--muted)' }}>{planosEstimados}</td>
                    <td style={{ padding: '0.75rem', color: '#ef4444' }}>R${custoAPI.toFixed(2)}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 600, color: lucro > 0 ? '#22c55e' : '#ef4444' }}>
                      R${lucro.toFixed(2)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notas */}
      <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(59,130,246,0.1)', borderLeft: '4px solid #3b82f6', borderRadius: '8px', color: 'var(--text)', fontSize: '0.9rem' }}>
        <p><strong>ℹ️ Notas:</strong></p>
        <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.5rem' }}>
          <li>Custo por plano: R${CUSTO_POR_PLANO} (GPT-4o-mini via OpenAI)</li>
          <li>Planos estimados: baseado no limite máximo de cada tier</li>
          <li>Receita teórica: valor mensal mínimo esperado</li>
          <li>Dados atualizados em tempo real do Supabase</li>
        </ul>
      </div>
    </div>
  )
}
