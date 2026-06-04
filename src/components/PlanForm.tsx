import { useState } from 'react'

const series = [
  '1º Ano - Ensino Fundamental', '2º Ano - Ensino Fundamental', '3º Ano - Ensino Fundamental',
  '4º Ano - Ensino Fundamental', '5º Ano - Ensino Fundamental', '6º Ano - Ensino Fundamental',
  '7º Ano - Ensino Fundamental', '8º Ano - Ensino Fundamental', '9º Ano - Ensino Fundamental',
  '1º Ano - Ensino Médio', '2º Ano - Ensino Médio', '3º Ano - Ensino Médio',
]

const recursosOpcoes = ['Quadro', 'Datashow', 'Computador', 'Material impresso']

interface PlanFormProps {
  onSubmit: (data: { disciplina: string; serie: string; tema: string; duracao: string; recursos: string[] }) => void
  loading: boolean
}

export default function PlanForm({ onSubmit, loading }: PlanFormProps) {
  const [disciplina, setDisciplina] = useState('')
  const [serie, setSerie] = useState('')
  const [tema, setTema] = useState('')
  const [duracao, setDuracao] = useState('')
  const [recursos, setRecursos] = useState<string[]>([])

  const toggleRecurso = (r: string) => {
    setRecursos(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ disciplina, serie, tema, duracao, recursos })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        <div>
          <label>Disciplina</label>
          <input
            value={disciplina} onChange={e => setDisciplina(e.target.value)}
            placeholder="Ex: Matemática" required
          />
        </div>
        <div>
          <label>Série / Ano</label>
          <select value={serie} onChange={e => setSerie(e.target.value)} required>
            <option value="">Selecione a série</option>
            {series.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label>Tema da aula</label>
        <input
          value={tema} onChange={e => setTema(e.target.value)}
          placeholder="Ex: Frações e operações básicas" required
        />
      </div>

      <div>
        <label>Duração</label>
        <select value={duracao} onChange={e => setDuracao(e.target.value)} required>
          <option value="">Selecione a duração</option>
          <option value="50 minutos">50 minutos</option>
          <option value="1 hora e 30 minutos">1h30</option>
          <option value="2 horas">2 horas</option>
        </select>
      </div>

      <div>
        <label>Recursos disponíveis</label>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          {recursosOpcoes.map(r => (
            <label key={r} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              cursor: 'pointer', userSelect: 'none', color: 'var(--text)',
              marginBottom: 0, fontSize: '0.9rem'
            }}>
              <input
                type="checkbox" checked={recursos.includes(r)}
                onChange={() => toggleRecurso(r)}
                style={{ width: 'auto', accentColor: 'var(--primary)' }}
              />
              {r}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', fontSize: '1rem', padding: '0.9rem' }}>
        {loading ? 'Gerando plano...' : 'Gerar Plano de Aula'}
      </button>
    </form>
  )
}
