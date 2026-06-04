import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const navItems = [
  { path: '/dashboard', label: 'Gerar Plano', icon: '✏️' },
  { path: '/historico', label: 'Histórico', icon: '📋' },
  { path: '/conta', label: 'Minha Conta', icon: '👤' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [plano, setPlano] = useState('gratis')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setEmail(data.user.email || '')
        supabase.from('usuarios').select('plano').eq('id', data.user.id).single()
          .then(({ data: u }) => { if (u) setPlano(u.plano) })
      }
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Até logo!')
    navigate('/')
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside style={{
        position: 'fixed', left: 0, top: 0, bottom: 0, width: '240px',
        background: 'var(--card)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem',
        zIndex: 50
      }} className="desktop-sidebar">
        <div style={{ marginBottom: '2rem', paddingLeft: '0.5rem' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>PlanAula</span>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map(item => {
            const active = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.7rem 0.75rem', borderRadius: '8px',
                background: active ? 'rgba(255,77,0,0.15)' : 'transparent',
                color: active ? 'var(--primary)' : 'var(--muted)',
                fontWeight: active ? 600 : 400,
                transition: 'all 0.2s',
                fontSize: '0.95rem'
              }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text)' } }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)' } }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <div style={{ marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email}</p>
            <span className={`badge badge-${plano}`}>{plano === 'pro' ? 'Pro' : 'Grátis'}</span>
          </div>
          <button onClick={handleLogout} style={{
            width: '100%', background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--muted)', padding: '0.6rem', borderRadius: '8px',
            fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#e04444'; e.currentTarget.style.color = '#e04444' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
          >
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav style={{
        display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'var(--card)', borderTop: '1px solid var(--border)',
        padding: '0.5rem 0', zIndex: 50
      }} className="mobile-nav">
        {navItems.map(item => {
          const active = location.pathname === item.path
          return (
            <Link key={item.path} to={item.path} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '0.25rem', flex: 1, padding: '0.4rem',
              color: active ? 'var(--primary)' : 'var(--muted)',
              fontSize: '0.7rem', fontWeight: active ? 600 : 400
            }}>
              <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
        <button onClick={handleLogout} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '0.25rem', flex: 1, padding: '0.4rem', background: 'none',
          border: 'none', color: 'var(--muted)', fontSize: '0.7rem', cursor: 'pointer'
        }}>
          <span style={{ fontSize: '1.25rem' }}>🚪</span>
          <span>Sair</span>
        </button>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </>
  )
}
