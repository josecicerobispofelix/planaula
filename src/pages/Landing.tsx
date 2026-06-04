import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2rem', borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, background: 'rgba(15,17,23,0.95)',
        backdropFilter: 'blur(8px)', zIndex: 100
      }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>PlanAula</span>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/login">
            <button className="btn-secondary" style={{ padding: '0.5rem 1.25rem' }}>Entrar</button>
          </Link>
          <Link to="/register">
            <button className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Experimentar grátis</button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: '900px', margin: '0 auto', padding: '5rem 2rem 4rem',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-block', background: 'rgba(255,77,0,0.1)',
          border: '1px solid rgba(255,77,0,0.3)', borderRadius: '999px',
          padding: '0.3rem 1rem', fontSize: '0.85rem', color: 'var(--primary)',
          marginBottom: '1.5rem', fontWeight: 600
        }}>
          IA + BNCC = Plano de aula em segundos
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800,
          lineHeight: 1.15, marginBottom: '1.25rem'
        }}>
          Plano de aula completo<br />
          <span style={{ color: 'var(--primary)' }}>em 30 segundos</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--muted)', marginBottom: '2.5rem', maxWidth: '520px', margin: '0 auto 2.5rem' }}>
          Com IA e no padrão BNCC. Sem perder horas.
        </p>
        <Link to="/register">
          <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '0.9rem 2.5rem' }}>
            Criar meu plano agora — grátis
          </button>
        </Link>
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
          Sem cartão de crédito. 5 planos grátis por mês.
        </p>
      </section>

      {/* Como funciona */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 700, marginBottom: '3rem' }}>
          Como funciona
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {[
            { num: '01', title: 'Informe o tema', desc: 'Preencha disciplina, série, tema e duração da aula em segundos.' },
            { num: '02', title: 'IA gera o plano', desc: 'Nossa IA cria um plano completo com objetivos, metodologia e habilidades BNCC.' },
            { num: '03', title: 'Copie ou imprima', desc: 'Copie o texto, exporte em PDF ou salve no histórico para usar depois.' },
          ].map(step => (
            <div key={step.num} className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
              <div style={{
                width: '48px', height: '48px', background: 'rgba(255,77,0,0.15)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem', fontSize: '1rem', fontWeight: 700, color: 'var(--primary)'
              }}>{step.num}</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{step.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preços */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 700, marginBottom: '3rem' }}>
          Planos simples e transparentes
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {/* Grátis */}
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Grátis</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              R$0<span style={{ fontSize: '1rem', color: 'var(--muted)', fontWeight: 400 }}>/mês</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {['5 planos por mês', 'Cópia de texto', 'Padrão BNCC'].map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--primary)' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <Link to="/register" style={{ display: 'block' }}>
              <button className="btn-secondary" style={{ width: '100%' }}>Começar grátis</button>
            </Link>
          </div>

          {/* Pro */}
          <div className="card" style={{ padding: '2rem', border: '2px solid var(--primary)', position: 'relative' }}>
            <div style={{
              position: 'absolute', top: '-12px', right: '1.5rem',
              background: 'var(--primary)', color: '#fff', fontSize: '0.75rem',
              fontWeight: 700, padding: '0.2rem 0.75rem', borderRadius: '999px'
            }}>POPULAR</div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Pro</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              R$29<span style={{ fontSize: '1rem', color: 'var(--muted)', fontWeight: 400 }}>/mês</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {['Planos ilimitados', 'Exportar em PDF', 'Histórico completo', 'Suporte prioritário'].map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--primary)' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <Link to="/register" style={{ display: 'block' }}>
              <button className="btn-primary" style={{ width: '100%' }}>Assinar Pro</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)', padding: '2rem',
        textAlign: 'center', color: 'var(--muted)', fontSize: '0.875rem'
      }}>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <a href="#" style={{ transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>Termos de uso</a>
          <a href="#" style={{ transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>Política de privacidade</a>
          <a href="mailto:contato@planaula.com.br" style={{ transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>Contato</a>
        </div>
        <p>© 2026 PlanAula. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
