import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'

interface PlanResultProps {
  content: string
  isPro: boolean
}

export default function PlanResult({ content, isPro }: PlanResultProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    toast.success('Copiado!')
  }

  const handlePdf = () => {
    if (!isPro) return
    import('jspdf').then(({ jsPDF }) => {
      const doc = new jsPDF()
      const clean = content.replace(/[#*`_~]/g, '').replace(/---/g, '').trim()
      const lines = doc.splitTextToSize(clean, 180)
      doc.setFontSize(11)
      doc.text(lines, 15, 20)
      doc.save('plano-de-aula.pdf')
    })
  }

  return (
    <div className="card" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>Plano de Aula Gerado</h3>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={handleCopy} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            Copiar texto
          </button>
          <button
            className="btn-secondary"
            onClick={handlePdf}
            title={isPro ? 'Exportar em PDF' : 'Disponível no plano Pro'}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', opacity: isPro ? 1 : 0.5, cursor: isPro ? 'pointer' : 'not-allowed' }}
          >
            {isPro ? 'Exportar PDF' : '🔒 Exportar PDF'}
          </button>
        </div>
      </div>
      <div style={{
        background: 'var(--bg)', border: '1px solid var(--border)',
        borderRadius: '8px', padding: '1.5rem', maxHeight: '520px', overflowY: 'auto'
      }} className="plan-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      <style>{`
        .plan-content h1, .plan-content h2, .plan-content h3, .plan-content h4 {
          color: #FF4D00;
          font-weight: 700;
          margin: 1.25rem 0 0.5rem;
          line-height: 1.3;
        }
        .plan-content h3 { font-size: 1.1rem; }
        .plan-content h4 { font-size: 0.95rem; }
        .plan-content p { color: var(--text); font-size: 0.9rem; line-height: 1.75; margin-bottom: 0.5rem; }
        .plan-content ul, .plan-content ol { padding-left: 1.4rem; margin-bottom: 0.75rem; }
        .plan-content li { color: var(--text); font-size: 0.9rem; line-height: 1.7; margin-bottom: 0.2rem; }
        .plan-content strong { color: var(--text); font-weight: 700; }
        .plan-content hr { border: none; border-top: 1px solid var(--border); margin: 1rem 0; }
        .plan-content code { background: rgba(255,77,0,0.1); color: #FF4D00; padding: 0.1rem 0.35rem; border-radius: 4px; font-size: 0.85rem; }
      `}</style>
    </div>
  )
}
