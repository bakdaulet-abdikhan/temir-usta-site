import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { lang, setLang, langPath } = useLang();
    const tx = translations[lang].nav;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const langBtnBase: React.CSSProperties = {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.8rem',
        fontWeight: 700,
        letterSpacing: '1px',
        padding: '0.25rem 0.4rem',
        borderRadius: '4px',
        transition: 'color 0.2s',
        fontFamily: 'var(--font-sans)',
    };

    const LangSwitcher = ({ color }: { color: string }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <button
                onClick={() => setLang('kz')}
                style={{ ...langBtnBase, color: lang === 'kz' ? color : 'rgba(255,255,255,0.35)' }}
            >KZ</button>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>|</span>
            <button
                onClick={() => setLang('ru')}
                style={{ ...langBtnBase, color: lang === 'ru' ? color : 'rgba(255,255,255,0.35)' }}
            >RU</button>
        </div>
    );

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
                <Link to={langPath('/')} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
                    <img src="/temir-icon.svg" alt="Temir Usta icon" style={{ height: '26px', width: 'auto' }} />
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, letterSpacing: '0.5px', color: '#fff' }}>
                        TEMIR ÚSTA
                    </span>
                </Link>

                {/* Desktop Nav — hidden on mobile via .desktop-nav CSS */}
                <nav className="desktop-nav" style={{ gap: '2rem' }}>
                    <Link to={langPath('/')}
                        style={{ fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.3px', color: 'rgba(255,255,255,0.85)', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                    >{tx.home}</Link>
                    <a href={langPath('/') + '#catalog'}
                        style={{ fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.3px', color: 'rgba(255,255,255,0.85)', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                    >{tx.catalog}</a>
                    <a href={langPath('/') + '#about'}
                        style={{ fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.3px', color: 'rgba(255,255,255,0.85)', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                    >{tx.about}</a>

                    {/* Language switcher — one instance, desktop only */}
                    <LangSwitcher color="#fff" />

                    <a href={langPath('/') + '#catalog'} className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.875rem' }}>
                        {tx.viewCatalog}
                    </a>
                </nav>

                {/* Mobile right-side group: lang switcher + hamburger, always together */}
                <div className="mobile-right-group">
                    <div className="lang-switcher-mobile-only">
                        <LangSwitcher color="#fff" />
                    </div>
                    <button
                        className="mobile-nav-toggle"
                        style={{ color: '#fff' }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
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
                        { label: tx.home, href: langPath('/'), isLink: true },
                        { label: tx.catalog, href: langPath('/') + '#catalog', isLink: false },
                        { label: tx.about, href: langPath('/') + '#about', isLink: false },
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

                    {/* Language switcher inside mobile menu */}
                    <div style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                        <LangSwitcher color="#fff" />
                    </div>

                    <a href={langPath('/') + '#catalog'} onClick={() => setMobileMenuOpen(false)} className="btn-primary" style={{ textAlign: 'center', marginTop: '1.5rem', borderRadius: '999px' }}>
                        {tx.viewCatalog}
                    </a>
                </div>
            )}
        </header>
    );
}
