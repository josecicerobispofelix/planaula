import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) { setError('A senha deve ter pelo menos 6 caracteres.'); return }
    setLoading(true)
    const { error: err } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (err) {
      if (err.message.includes('already registered')) setError('Este e-mail já está cadastrado.')
      else if (err.message.includes('Password should be')) setError('A senha deve ter pelo menos 6 caracteres.')
      else setError('Erro ao criar conta. Tente novamente.')
      return
    }
    navigate('/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '2rem'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/">
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>PlanAula</span>
          </Link>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem' }}>Criar conta grátis</h1>
          <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>
            Já tem conta?{' '}
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Entrar</Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {error && (
            <div style={{
              background: 'rgba(255,77,0,0.1)', border: '1px solid rgba(255,77,0,0.3)',
              borderRadius: '8px', padding: '0.75rem 1rem', color: '#ff6b3d', fontSize: '0.9rem'
            }}>{error}</div>
          )}

          <div>
            <label>E-mail</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com" required
            />
          </div>

          <div>
            <label>Senha</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres" required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Criando conta...' : 'Criar conta grátis'}
          </button>

          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', textAlign: 'center' }}>
            Ao criar conta você concorda com os{' '}
            <a href="#" style={{ color: 'var(--primary)' }}>Termos de uso</a> e{' '}
            <a href="#" style={{ color: 'var(--primary)' }}>Política de privacidade</a>.
          </p>
        </form>
      </div>
    </div>
  )
}
