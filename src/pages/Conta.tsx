import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface Usuario {
  plano: string
  planos_mes: number
  mes_ref: string
}

export default function Conta() {
  const [email, setEmail] = useState('')
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return
      setEmail(data.user.email || '')
      supabase.from('usuarios').select('*').eq('id', data.user.id).single()
        .then(({ data: u }) => { if (u) setUsuario(u); setLoading(false) })
    })
  }, [])

  const getCurrentMonth = () => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  }

  const planosUsados = usuario?.mes_ref === getCurrentMonth() ? (usuario?.planos_mes || 0) : 0
  const isPro = usuario?.plano === 'pro'
  const progressPct = Math.min((planosUsados / 5) * 100, 100)

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
      <div className="spinner" />
    </div>
  )

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Minha Conta</h1>
        <p style={{ color: 'var(--muted)' }}>Informações da sua conta e plano.</p>
      </div>

      {/* Info Card */}
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.25rem' }}>E-mail</p>
            <p style={{ fontWeight: 600 }}>{email}</p>
          </div>
          <span className={`badge badge-${isPro ? 'pro' : 'gratis'}`} style={{ fontSize: '0.85rem', padding: '0.3rem 0.9rem' }}>
            {isPro ? 'Pro' : 'Grátis'}
          </span>
        </div>
      </div>

      {/* Usage Card (free only) */}
      {!isPro && (
        <div className="card" style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>Uso este mês</p>
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{planosUsados} / 5</span>
          </div>
          <div style={{ background: 'var(--border)', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: '999px',
              background: progressPct >= 100 ? '#e04444' : 'var(--primary)',
              width: `${progressPct}%`, transition: 'width 0.4s ease'
            }} />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
            {planosUsados >= 5 ? 'Limite atingido. Assine o Pro para continuar.' : `${5 - planosUsados} plano${5 - planosUsados !== 1 ? 's' : ''} restante${5 - planosUsados !== 1 ? 's' : ''} este mês.`}
          </p>
        </div>
      )}

      {/* Upgrade Card (free only) */}
      {!isPro && (
        <div className="card" style={{ border: '1px solid rgba(255,77,0,0.4)', background: 'rgba(255,77,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Assine o PlanAula Pro</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                {['Planos ilimitados', 'Exportação em PDF', 'Histórico completo', 'Suporte prioritário'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ color: 'var(--primary)' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="#kiwify">
                <button className="btn-primary" style={{ width: '100%' }}>
                  Assinar por R$29/mês
                </button>
              </a>
            </div>
          </div>
        </div>
      )}

      {isPro && (
        <div className="card" style={{ border: '1px solid rgba(255,77,0,0.3)', background: 'rgba(255,77,0,0.05)', textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎉</div>
          <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Você é Pro!</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Aproveite todos os recursos ilimitados do PlanAula Pro.</p>
        </div>
      )}
    </div>
  )
}
