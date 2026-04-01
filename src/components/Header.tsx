import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 100,
            backgroundColor: isScrolled ? 'rgba(30, 10, 0, 0.92)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
            color: 'var(--color-text-light)',
            transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, padding 0.4s ease',
            borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
            padding: isScrolled ? '0' : '0.5rem 0',
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '80px',
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', opacity: 1 }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, letterSpacing: '0.5px', color: '#fff' }}>
                        TEMIR USTA
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav" style={{ gap: '2rem' }}>
                    <Link to="/" style={{ fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.3px', color: 'rgba(255,255,255,0.85)', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                    >Басты бет</Link>
                    <a href="/#catalog" style={{ fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.3px', color: 'rgba(255,255,255,0.85)', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                    >Каталог</a>
                    <a href="/#about" style={{ fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.3px', color: 'rgba(255,255,255,0.85)', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                    >Біз туралы</a>
                    <a href="/#catalog" className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.875rem' }}>
                        Каталогты көру
                    </a>
                </nav>

                {/* Mobile Nav Toggle */}
                <button
                    className="mobile-nav-toggle"
                    style={{ color: '#fff' }}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div style={{
                    position: 'absolute',
                    top: '80px',
                    left: 0,
                    width: '100%',
                    backgroundColor: 'rgba(30, 10, 0, 0.98)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    padding: '2rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    animation: 'fadeIn 0.25s ease',
                }}>
                    {[
                        { label: 'Басты бет', href: '/', isLink: true },
                        { label: 'Каталог', href: '/#catalog', isLink: false },
                        { label: 'Біз туралы', href: '/#about', isLink: false },
                    ].map(({ label, href, isLink }) => {
                        const style: React.CSSProperties = {
                            fontWeight: 500, fontSize: '1.05rem',
                            color: '#fff',
                            padding: '1rem 0',
                            borderBottom: '1px solid rgba(255,255,255,0.07)',
                            display: 'block',
                        };
                        return isLink
                            ? <Link key={label} to={href} onClick={() => setMobileMenuOpen(false)} style={style}>{label}</Link>
                            : <a key={label} href={href} onClick={() => setMobileMenuOpen(false)} style={style}>{label}</a>;
                    })}
                    <a href="/#catalog" onClick={() => setMobileMenuOpen(false)} className="btn-primary" style={{ textAlign: 'center', marginTop: '1.5rem', borderRadius: '999px' }}>
                        Каталогты көру
                    </a>
                </div>
            )}
        </header>
    );
}
