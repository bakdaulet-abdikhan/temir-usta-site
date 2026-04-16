import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

const MAP_SRCS = [
    'https://maps.google.com/maps?q=43.221685,76.625391&z=15&output=embed',
    'https://maps.google.com/maps?q=43.3102,68.240784&z=15&output=embed',
];

export default function Footer() {
    const location = useLocation();
    const isCategoryPage = location.pathname.startsWith('/catalog/');
    const { lang, langPath } = useLang();
    const tx = translations[lang].footer;
    const locs = translations[lang].locations;

    return (
        <footer style={{ backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-light)', overflow: 'hidden' }}>

            {/* ── Top CTA ── */}
            {!isCategoryPage && (
                <div style={{ padding: '5rem 0 4rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                        <div style={{ maxWidth: '520px' }}>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.15, color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
                                {tx.ctaTitle}<br />
                                <span style={{ color: 'var(--color-accent)' }}>{tx.ctaTitleAccent}</span>
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.6 }}>
                                {tx.ctaSubtitle}
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                                {tx.ctaNote}
                            </p>
                            <a
                                href={`https://wa.me/77056401566?text=${encodeURIComponent(tx.waMsg)}`}
                                className="btn-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ borderRadius: '999px', paddingLeft: '1.75rem', paddingRight: '1.75rem' }}
                            >
                                {tx.ctaBtn}
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Info Grid ── */}
            <div style={{ padding: '4rem 0 3rem' }}>
                <div className="container">
                    <div className="footer-grid">

                        {/* Brand */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                                <img src="/temir-icon.svg" alt="Temir Usta icon" style={{ height: '34px', width: 'auto' }} />
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
                                    TEMIR ÚSTA
                                </span>
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                {tx.brandDesc}
                            </p>
                            <a href="https://www.instagram.com/temir_usta_kz" target="_blank" rel="noopener noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', transition: 'color 0.25s', opacity: 1 }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> @temir_usta_kz
                            </a>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h4 style={{ fontSize: '0.8rem', fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1.25rem' }}>{tx.navTitle}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                {tx.navItems.map((item) => (
                                    <Link key={item.label} to={langPath(item.href)}
                                        style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', transition: 'color 0.2s', opacity: 1 }}
                                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                                    >{item.label}</Link>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 style={{ fontSize: '0.8rem', fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1.25rem' }}>{tx.contactTitle}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <a href="tel:+77056401566" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', transition: 'color 0.2s', opacity: 1 }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                                >
                                    <Phone size={15} /> +7 (705) 640-15-66
                                </a>
                                <a href="https://wa.me/77056401566" target="_blank" rel="noopener noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', transition: 'color 0.2s', opacity: 1 }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#25D366')}
                                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                    WhatsApp
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ── Maps with paired addresses ── */}
            <div className="container" style={{ paddingBottom: '4rem' }}>
                <h4 style={{ fontSize: '0.8rem', fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1.5rem' }}>{tx.addressTitle}</h4>
                <div className="locations-grid">
                    {locs.map((loc, i) => (
                        <div key={loc.city}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                <div>
                                    <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>{loc.city}</span>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', lineHeight: 1.55, margin: '0.15rem 0 0' }}>{loc.address}</p>
                                </div>
                            </div>
                            <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <iframe src={MAP_SRCS[i]}
                                    width="100%" height="240" style={{ border: 0, display: 'block' }}
                                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                                    title={`Temir Usta — ${loc.city}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Huge Brand Name ── */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <div className="container">
                    <p style={{
                        margin: 0,
                        fontSize: 'min(calc((100vw - 3rem) / 6.5), 190px)',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        lineHeight: 0.85,
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                        padding: '0.5rem 0 0',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0.02))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        userSelect: 'none',
                        pointerEvents: 'none',
                    }}>
                        TEMIR USTA
                    </p>
                </div>
            </div>

            {/* ── Copyright ── */}
            <div className="container" style={{
                padding: '1.5rem 1.5rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.8rem',
            }}>
                <p>© {new Date().getFullYear()} Temir Usta. {tx.copyright}</p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link to={langPath('/')} style={{ opacity: 1 }}>{tx.privacyPolicy}</Link>
                    <Link to={langPath('/')} style={{ opacity: 1 }}>{tx.termsOfUse}</Link>
                </div>
            </div>

            <style>{`
                .footer-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr;
                    gap: 3rem;
                }
                .locations-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
                @media (max-width: 900px) {
                    .footer-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
                }
                @media (max-width: 600px) {
                    .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
                    .locations-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </footer>
    );
}
