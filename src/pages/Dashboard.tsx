import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import PlanForm from '../components/PlanForm'
import PlanResult from '../components/PlanResult'
import Modal from '../components/Modal'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [loading, setLoading] = useState(false)
  const [planContent, setPlanContent] = useState('')
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [usuario, setUsuario] = useState<{ plano: string; planos_mes: number; mes_ref: string } | null>(null)
  const [userId, setUserId] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return
      setUserId(data.user.id)
      supabase.from('usuarios').select('*').eq('id', data.user.id).single()
        .then(({ data: u }) => { if (u) setUsuario(u) })
    })
  }, [])

  const getCurrentMonth = () => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  }

  const handleGenerate = async (formData: { disciplina: string; serie: string; tema: string; duracao: string; recursos: string[] }) => {
    if (!usuario) return

    const currentMonth = getCurrentMonth()
    let planosMes = usuario.planos_mes
    if (usuario.mes_ref !== currentMonth) {
      planosMes = 0
      await supabase.from('usuarios').update({ planos_mes: 0, mes_ref: currentMonth }).eq('id', userId)
    }

    const limites: Record<string, number> = { gratis: 5, starter: 30, pro: 100, escola: 500 }
    const limite = limites[usuario.plano] ?? 5
    if (planosMes >= limite) {
      setShowUpgrade(true)
      return
    }

    setLoading(true)
    setPlanContent('')

    try {
      const { data, error } = await supabase.functions.invoke('generate-plan', {
        body: { ...formData, recursos: formData.recursos.join(', '), user_id: userId }
      })

      if (error || !data?.plano) throw new Error(error?.message || 'Erro ao gerar plano')

      setPlanContent(data.plano)

      // Salvar plano
      await supabase.from('planos').insert({
        user_id: userId,
        disciplina: formData.disciplina,
        serie: formData.serie,
        tema: formData.tema,
        duracao: formData.duracao,
        recursos: formData.recursos.join(', '),
        conteudo: data.plano,
      })

      // SÓ incrementar contador se passou na validação BNCC
      // Se falhou, não conta como uso
      if (data.validado === true) {
        const newCount = planosMes + 1
        await supabase.from('usuarios').update({ planos_mes: newCount, mes_ref: currentMonth }).eq('id', userId)
        setUsuario(prev => prev ? { ...prev, planos_mes: newCount, mes_ref: currentMonth } : prev)
        toast.success('✅ Plano gerado com sucesso! (Validado conforme BNCC)')
      } else {
        // Plano gerado mas com aviso de validação
        toast.success('⚠️ Plano gerado (Atenção: validação BNCC pode precisar revisão)', { duration: 4000 })
      }
    } catch (err: any) {
      toast.error(err.message || 'Erro ao gerar plano. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const LIMITES: Record<string, number> = { gratis: 5, starter: 30, pro: 100, escola: 500 }
  const isPro = usuario?.plano !== 'gratis'
  const limiteAtual = LIMITES[usuario?.plano ?? 'gratis'] ?? 5
  const planosUsados = usuario?.planos_mes ?? 0

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Gerar Plano de Aula</h1>
        <p style={{ color: 'var(--muted)' }}>
          Preencha os dados abaixo e nossa IA criará um plano completo no padrão BNCC.
        </p>
        {usuario && (
          <div style={{
            marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(255,77,0,0.1)', border: '1px solid rgba(255,77,0,0.2)',
            borderRadius: '8px', padding: '0.4rem 0.9rem', fontSize: '0.85rem'
          }}>
            <span style={{ color: 'var(--muted)' }}>Planos este mês:</span>
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{Math.min(planosUsados, limiteAtual)}/{limiteAtual}</span>
            <span className={`badge badge-${isPro ? 'pro' : 'gratis'}`} style={{ marginLeft: '0.25rem' }}>
              {usuario.plano.charAt(0).toUpperCase() + usuario.plano.slice(1)}
            </span>
          </div>
        )}
      </div>

      <div className="card">
        <PlanForm onSubmit={handleGenerate} loading={loading} />
      </div>

      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '3rem', color: 'var(--muted)' }}>
          <div className="spinner" />
          <p>Gerando seu plano de aula...</p>
        </div>
      )}

      {planContent && !loading && <PlanResult content={planContent} isPro={isPro} />}

      <Modal open={showUpgrade} onClose={() => setShowUpgrade(false)} title="Limite atingido">
        <div style={{ padding: '0.5rem 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🚀</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Você atingiu o limite do plano <strong style={{ color: 'var(--primary)' }}>
                {usuario?.plano?.charAt(0).toUpperCase()}{usuario?.plano?.slice(1)}
              </strong>
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              Faça upgrade para continuar gerando planos este mês.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {[
              { id: 'starter', label: 'Starter', limite: 30,  preco: 19 },
              { id: 'pro',     label: 'Pro',     limite: 100, preco: 39 },
              { id: 'escola',  label: 'Escola',  limite: 500, preco: 89 },
            ].filter(p => {
              const limites: Record<string, number> = { gratis: 5, starter: 30, pro: 100, escola: 500 }
              return p.limite > (limites[usuario?.plano ?? 'gratis'] ?? 5)
            }).map(p => (
              <a key={p.id} href="#kiwify" onClick={() => setShowUpgrade(false)} style={{ display: 'block' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px',
                  padding: '0.85rem 1rem', cursor: 'pointer', transition: 'border-color 0.2s'
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <div>
                    <span style={{ fontWeight: 700 }}>{p.label}</span>
                    <span style={{ color: 'var(--muted)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>{p.limite} planos/mês</span>
                  </div>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>R${p.preco}/mês</span>
                </div>
              </a>
            ))}
          </div>

          <Link to="/conta" onClick={() => setShowUpgrade(false)}>
            <button className="btn-secondary" style={{ width: '100%' }}>Ver minha conta</button>
          </Link>
        </div>
      </Modal>
    </div>
  )
}
