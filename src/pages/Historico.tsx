import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Modal from '../components/Modal'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

interface Plano {
  id: string
  disciplina: string
  tema: string
  serie: string
  created_at: string
  conteudo: string
}

export default function Historico() {
  const [planos, setPlanos] = useState<Plano[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Plano | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return
      supabase.from('planos')
        .select('*')
        .eq('user_id', data.user.id)
        .order('created_at', { ascending: false })
        .then(({ data: p }) => { if (p) setPlanos(p); setLoading(false) })
    })
  }, [])

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copiado!')
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
      <div className="spinner" />
    </div>
  )

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Histórico</h1>
        <p style={{ color: 'var(--muted)' }}>Todos os planos de aula que você gerou.</p>
      </div>

      {planos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--muted)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text)' }}>
            Nenhum plano gerado ainda
          </h3>
          <p style={{ marginBottom: '1.5rem' }}>Crie seu primeiro plano de aula agora!</p>
          <Link to="/dashboard">
            <button className="btn-primary">Gerar Plano</button>
          </Link>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
                  {['Disciplina', 'Tema', 'Série', 'Data', 'Ação'].map(h => (
                    <th key={h} style={{ padding: '1rem', textAlign: 'left', color: 'var(--muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {planos.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: i < planos.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{p.disciplina}</td>
                    <td style={{ padding: '1rem', color: 'var(--muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.tema}</td>
                    <td style={{ padding: '1rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{p.serie.split(' - ')[0]}</td>
                    <td style={{ padding: '1rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{formatDate(p.created_at)}</td>
                    <td style={{ padding: '1rem' }}>
                      <button className="btn-secondary" onClick={() => setSelected(p)} style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}>
                        Ver plano
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected ? `${selected.disciplina} — ${selected.tema}` : ''}>
        {selected && (
          <>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="badge badge-gratis">{selected.serie.split(' - ')[0]}</span>
              <span className="badge badge-gratis">{selected.disciplina}</span>
            </div>
            <div style={{
              background: 'var(--bg)', border: '1px solid var(--border)',
              borderRadius: '8px', padding: '1rem', marginBottom: '1rem',
              maxHeight: '50vh', overflowY: 'auto'
            }} className="plan-content">
              <ReactMarkdown>{selected.conteudo}</ReactMarkdown>
            </div>
            <style>{`
              .plan-content h1,.plan-content h2,.plan-content h3,.plan-content h4{color:#FF4D00;font-weight:700;margin:1rem 0 0.4rem;line-height:1.3}
              .plan-content h4{font-size:0.9rem}
              .plan-content p{color:var(--text);font-size:0.875rem;line-height:1.75;margin-bottom:0.4rem}
              .plan-content ul,.plan-content ol{padding-left:1.4rem;margin-bottom:0.75rem}
              .plan-content li{color:var(--text);font-size:0.875rem;line-height:1.7;margin-bottom:0.15rem}
              .plan-content strong{font-weight:700}
              .plan-content hr{border:none;border-top:1px solid var(--border);margin:0.75rem 0}
            `}</style>
            <button className="btn-primary" onClick={() => handleCopy(selected.conteudo)} style={{ width: '100%' }}>
              Copiar plano
            </button>
          </>
        )}
      </Modal>
    </div>
  )
}
