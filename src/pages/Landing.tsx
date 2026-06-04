import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

function useCounters(targets: [number, number, number], duration = 2200) {
  const [v0, setV0] = useState(0)
  const [v1, setV1] = useState(0)
  const [v2, setV2] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    function animate(target: number, setter: (n: number) => void) {
      const start = Date.now()
      const tick = () => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        setter(Math.floor(ease * target))
        if (progress < 1) requestAnimationFrame(tick)
        else setter(target)
      }
      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        animate(targets[0], setV0)
        animate(targets[1], setV1)
        animate(targets[2], setV2)
      }
    }, { threshold: 0.2 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { values: [v0, v1, v2] as const, ref }
}

const depoimentos = [
  {
    nome: 'Camila Rodrigues',
    cargo: 'Professora de Português · 8 anos de experiência',
    texto: 'Antes eu gastava quase 2 horas preparando um plano de aula. Com o PlanAula faço em 30 segundos e ainda fica no padrão BNCC. Simplesmente incrível!',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
    estrelas: 5,
  },
  {
    nome: 'Rafael Mendes',
    cargo: 'Professor de Matemática · Ensino Médio',
    texto: 'Uso todo dia para planejar minhas aulas. A qualidade do conteúdo gerado é surpreendente — metodologia clara, objetivos bem definidos e habilidades BNCC certinhas.',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    estrelas: 5,
  },
  {
    nome: 'Fernanda Lima',
    cargo: 'Coordenadora Pedagógica · Rede Municipal',
    texto: 'Recomendei para todos os professores da minha escola. Economizamos horas de planejamento por semana. Vale muito o investimento no plano Pro!',
    foto: 'https://randomuser.me/api/portraits/women/68.jpg',
    estrelas: 5,
  },
  {
    nome: 'Bruno Castro',
    cargo: 'Professor de Ciências · 5º ao 9º ano',
    texto: 'Fiz minha primeira aula em menos de 1 minuto. A IA entende o contexto e gera planos completos com recursos didáticos e avaliação. Top demais!',
    foto: 'https://randomuser.me/api/portraits/men/75.jpg',
    estrelas: 5,
  },
  {
    nome: 'Ana Paula Souza',
    cargo: 'Professora de História · Ensino Fundamental',
    texto: 'O que mais gosto é que os planos já vêm com as habilidades BNCC mapeadas. Isso economiza um tempo enorme na hora de fazer relatórios pedagógicos.',
    foto: 'https://randomuser.me/api/portraits/women/17.jpg',
    estrelas: 5,
  },
  {
    nome: 'Marcelo Ferreira',
    cargo: 'Professor de Educação Física',
    texto: 'Nunca imaginei que IA poderia ajudar tanto no planejamento de aulas práticas. Os planos ficam excelentes e alinhados com o que preciso ensinar.',
    foto: 'https://randomuser.me/api/portraits/men/52.jpg',
    estrelas: 5,
  },
]

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px', marginBottom: '0.75rem' }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ color: '#f59e0b', fontSize: '1rem' }}>★</span>
      ))}
    </div>
  )
}

export default function Landing() {
  const { values, ref: countRef } = useCounters([3847, 28450, 98] as [number, number, number])

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
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '5rem 2rem 4rem', textAlign: 'center' }}>
        <div style={{
          display: 'inline-block', background: 'rgba(255,77,0,0.1)',
          border: '1px solid rgba(255,77,0,0.3)', borderRadius: '999px',
          padding: '0.3rem 1rem', fontSize: '0.85rem', color: 'var(--primary)',
          marginBottom: '1.5rem', fontWeight: 600
        }}>
          IA + BNCC = Plano de aula em segundos
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem' }}>
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

      {/* Contador de usuários */}
      <section style={{ background: 'rgba(255,77,0,0.05)', borderTop: '1px solid rgba(255,77,0,0.1)', borderBottom: '1px solid rgba(255,77,0,0.1)', padding: '3rem 2rem' }}>
        <div ref={countRef} style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--primary)' }}>
              {values[0].toLocaleString('pt-BR')}+
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>professores usando</div>
          </div>
          <div>
            <div style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--primary)' }}>
              {values[1].toLocaleString('pt-BR')}+
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>planos gerados</div>
          </div>
          <div>
            <div style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--primary)' }}>
              {values[2]}%
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>de satisfação</div>
          </div>
        </div>
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

      {/* Depoimentos */}
      <section style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              O que os professores dizem
            </h2>
            <p style={{ color: 'var(--muted)' }}>Mais de 3.800 educadores já transformaram seu planejamento</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {depoimentos.map((d) => (
              <div key={d.nome} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Stars n={d.estrelas} />
                <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.7, flex: 1 }}>
                  "{d.texto}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <img
                    src={d.foto}
                    alt={d.nome}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border)' }}
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(d.nome)}&background=FF4D00&color=fff&size=44`
                    }}
                  />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{d.nome}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{d.cargo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preços */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 700, marginBottom: '3rem' }}>
          Planos simples e transparentes
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
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

      {/* CTA final */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 2rem 5rem', textAlign: 'center' }}>
        <div className="card" style={{ padding: '3rem 2rem', border: '1px solid rgba(255,77,0,0.3)', background: 'rgba(255,77,0,0.05)' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>
            Pronto para economizar horas de planejamento?
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
            Junte-se a mais de 3.800 professores que já simplificaram seu trabalho.
          </p>
          <Link to="/register">
            <button className="btn-primary" style={{ fontSize: '1.05rem', padding: '0.9rem 2.5rem' }}>
              Criar conta grátis agora
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '2rem', textAlign: 'center', color: 'var(--muted)', fontSize: '0.875rem' }}>
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
