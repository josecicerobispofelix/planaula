import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err) {
      if (err.message.includes('Invalid login credentials')) setError('E-mail ou senha incorretos.')
      else if (err.message.includes('Email not confirmed')) setError('Confirme seu e-mail antes de entrar.')
      else setError('Erro ao entrar. Tente novamente.')
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem' }}>Entrar na sua conta</h1>
          <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>
            Não tem conta?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Cadastre-se grátis</Link>
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
              placeholder="Sua senha" required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
