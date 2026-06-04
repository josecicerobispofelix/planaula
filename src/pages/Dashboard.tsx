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

    if (usuario.plano === 'gratis' && planosMes >= 5) {
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

      await supabase.from('planos').insert({
        user_id: userId,
        disciplina: formData.disciplina,
        serie: formData.serie,
        tema: formData.tema,
        duracao: formData.duracao,
        recursos: formData.recursos.join(', '),
        conteudo: data.plano,
      })

      const newCount = planosMes + 1
      await supabase.from('usuarios').update({ planos_mes: newCount, mes_ref: currentMonth }).eq('id', userId)
      setUsuario(prev => prev ? { ...prev, planos_mes: newCount, mes_ref: currentMonth } : prev)
      toast.success('Plano gerado com sucesso!')
    } catch (err: any) {
      toast.error(err.message || 'Erro ao gerar plano. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const isPro = usuario?.plano === 'pro'

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Gerar Plano de Aula</h1>
        <p style={{ color: 'var(--muted)' }}>
          Preencha os dados abaixo e nossa IA criará um plano completo no padrão BNCC.
        </p>
        {!isPro && usuario && (
          <div style={{
            marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(255,77,0,0.1)', border: '1px solid rgba(255,77,0,0.2)',
            borderRadius: '8px', padding: '0.4rem 0.9rem', fontSize: '0.85rem'
          }}>
            <span style={{ color: 'var(--muted)' }}>Planos usados este mês:</span>
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{Math.min(usuario.planos_mes, 5)}/5</span>
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
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Você atingiu o limite de 5 planos gratuitos
          </h3>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Assine o PlanAula Pro por R$29/mês e tenha planos ilimitados, exportação em PDF e histórico completo.
          </p>
          <a href="#kiwify" onClick={() => setShowUpgrade(false)}>
            <button className="btn-primary" style={{ width: '100%', fontSize: '1rem' }}>
              Assinar Pro — R$29/mês
            </button>
          </a>
          <Link to="/conta" onClick={() => setShowUpgrade(false)}>
            <button className="btn-secondary" style={{ width: '100%', marginTop: '0.75rem' }}>
              Ver minha conta
            </button>
          </Link>
        </div>
      </Modal>
    </div>
  )
}
