import { Truck, Wrench, ArrowRight, Shield, Gem, Crown, Phone, PenLine, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef, type ReactNode } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { useSEO } from '../hooks/useSEO';

/* ─── Scroll Reveal Component ─── */
function ScrollReveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => el.classList.replace('reveal-hidden', 'reveal-visible'), delay);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.12 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);
    return <div ref={ref} className={`reveal-hidden ${className}`}>{children}</div>;
}

const TIER_ICONS = [Shield, Gem, Crown];
const STEP_ICONS = [Phone, PenLine, Wrench, Truck, CheckCircle];

const r2Img = (id: string) => `https://pub-45c64cad9ebf4f4f8e48e787f035d2f3.r2.dev/${id.split("-")[0]}/${id}.webp`;

const galleryImages = [
    { id: 'S1-01', url: r2Img('S1-01') },
    { id: 'S1-05', url: r2Img('S1-05') },
    { id: 'S1-10', url: r2Img('S1-10') },
    { id: 'S1-14', url: r2Img('S1-14') },
    { id: 'P2-08', url: r2Img('P2-08') },
    { id: 'P2-14', url: r2Img('P2-14') },
    { id: 'P2-20', url: r2Img('P2-20') },
    { id: 'P2-30', url: r2Img('P2-30') },
    { id: 'P2-38', url: r2Img('P2-38') },
    { id: 'L3-20', url: r2Img('L3-20') },
    { id: 'L3-35', url: r2Img('L3-35') },
    { id: 'L3-45', url: r2Img('L3-45') },
    { id: 'L3-55', url: r2Img('L3-55') },
    { id: 'L3-63', url: r2Img('L3-63') },
    { id: 'L3-69', url: r2Img('L3-69') },
];

/* ─── YouTube Facade Component ─── */
function YouTubeFacade({ videoId }: { videoId: string }) {
    const [playing, setPlaying] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <div ref={containerRef} style={{ position: 'absolute', inset: 0 }}>
            {playing ? (
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1`}
                    title="Temir Usta — қақпа өндірісі"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                />
            ) : (
                <button
                    onClick={() => setPlaying(true)}
                    style={{
                        position: 'absolute', inset: 0, width: '100%', height: '100%',
                        padding: 0, border: 0, cursor: 'pointer', background: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    <img
                        src={thumb}
                        alt="Video"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)' }} />
                    <svg
                        width="72" height="72" viewBox="0 0 72 72"
                        style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))' }}
                    >
                        <circle cx="36" cy="36" r="36" fill="rgba(255,255,255,0.95)" />
                        <polygon points="29,22 55,36 29,50" fill="#111" />
                    </svg>
                </button>
            )}
        </div>
    );
}


/* ─── Home Page ─── */
export default function Home() {
    const { lang, langPath } = useLang();
    const tx = translations[lang];

    useSEO(
        lang === 'ru'
            ? {
                  title: 'Темір Ұста — Премиум Ворота в Казахстане',
                  description: 'Темір Ұста — ведущий производитель ворот в Казахстане. 15+ лет опыта, 5 000+ установленных ворот. Категории Standard, Premium и Lux. Бесплатная консультация, доставка по всему Казахстану.',
              }
            : {
                  title: 'Темір Ұста — Қазақстандағы Премиум Қақпалар',
                  description: 'Темір Ұста — Қазақстанның жетекші қақпа өндірушісі. 15+ жыл тәжірибе, 5 000+ орнатылған қақпа. Стандарт, Премиум және Люкс санаттары. Тегін кеңес, жедел жеткізу.',
              }
    );

    const tiers = tx.tiers;
    const stats = tx.stats;

    return (
        <div style={{ backgroundColor: 'var(--color-bg-light)', overflowX: 'hidden' }}>

            {/* ═══ Hero Section ═══ */}
            <section style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'left',
                backgroundImage: 'url(/hero-img.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 0.4) 100%)' }} />
                <div className="container" style={{ position: 'relative', zIndex: 10, color: 'var(--color-text-light)' }}>
                    <div style={{ maxWidth: '700px' }}>
                        <div className="slide-up" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', color: 'var(--color-accent)', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                            <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-accent)' }} />
                            {tx.hero.badge}
                        </div>

                        <h1 className="slide-up" style={{ animationDelay: '0.1s', fontSize: 'clamp(3rem, 6vw, 5.5rem)', marginBottom: '1.5rem', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                            {tx.hero.title}<br />
                            <span style={{ fontStyle: 'italic', fontWeight: 'normal', opacity: 0.9 }}>{tx.hero.subtitle}</span>
                        </h1>
                        <p className="slide-up" style={{ animationDelay: '0.2s', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '500px', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>
                            {tx.hero.desc}
                        </p>
                        <div className="slide-up" style={{ animationDelay: '0.3s', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link to={langPath('/catalog/standard')} className="btn-primary hover-scale" style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>
                                {tx.hero.cta} <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                            </Link>
                            <a href="https://wa.me/77056401566" target="_blank" rel="noopener noreferrer" className="btn-outline hover-scale" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'var(--color-text-light)', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>
                                {tx.hero.contact}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Gallery Strip Section ═══ */}
            <section style={{ backgroundColor: 'var(--color-bg-light)', padding: '4rem 0', overflow: 'hidden' }}>

                {/* Scrolling strip */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <div className="gallery-fade-left" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, background: 'linear-gradient(to right, var(--color-bg-light), transparent)', zIndex: 10, pointerEvents: 'none' }} />
                    <div className="gallery-fade-right" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, background: 'linear-gradient(to left, var(--color-bg-light), transparent)', zIndex: 10, pointerEvents: 'none' }} />

                    <div className="gallery-track">
                        {[...galleryImages, ...galleryImages].map((img, i) => (
                            <Link to={langPath('/catalog/lux')} key={i} style={{ flexShrink: 0, display: 'block', width: '280px', height: '200px', overflow: 'hidden', borderRadius: '10px', backgroundColor: '#e8e8e8' }}>
                                <img
                                    src={img.url}
                                    alt={`${lang === 'ru' ? 'Металлические ворота' : 'Темір қақпа'} ${img.id} — Темір Ұста`}
                                    loading="lazy"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', display: 'block' }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <style>{`
                    .gallery-fade-left, .gallery-fade-right { width: 120px; }
                    @media (max-width: 768px) {
                        .gallery-fade-left, .gallery-fade-right { width: 40px; }
                    }
                    .gallery-track {
                        display: flex;
                        gap: 1rem;
                        padding: 0 1rem;
                        width: max-content;
                        animation: gallery-scroll 45s linear infinite;
                    }
                    .gallery-track:hover { animation-play-state: paused; }
                    @keyframes gallery-scroll {
                        from { transform: translateX(0); }
                        to { transform: translateX(-50%); }
                    }
                `}</style>

                {/* CTA below gallery */}
                <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                    <Link to={langPath('/catalog/standard')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', border: '1.5px solid var(--color-border-light)', color: 'var(--color-text-dark)', fontWeight: 600, fontSize: '0.9rem', borderRadius: '12px', transition: 'all 0.25s', textDecoration: 'none' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-light)'; e.currentTarget.style.color = 'var(--color-text-dark)'; }}
                    >
                        {tx.gallery.viewAll} <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            {/* ═══ About Section ═══ */}
            <section id="about" style={{ padding: '5rem 0', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-light)' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
                        <ScrollReveal>
                            <div style={{ flex: '1 1 360px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                                    <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-accent)' }} />
                                    {tx.about.badge}
                                </div>
                                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '1.25rem', color: 'var(--color-text-light)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                                    {tx.about.heading1}<br />
                                    {tx.about.heading2}
                                </h2>
                                <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem', lineHeight: 1.7 }}>
                                    {tx.about.p1}
                                </p>
                                <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                                    {tx.about.p2}
                                </p>
                            </div>
                        </ScrollReveal>
                        <div style={{ flex: '1 1 460px' }}>
                            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: '14px', overflow: 'hidden', backgroundColor: '#000' }}>
                                <YouTubeFacade videoId="eXEAPWtBVg8" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Stats Section ═══ */}
            <section style={{ backgroundColor: 'var(--color-surface)', padding: '5rem 0 0 0', position: 'relative', zIndex: 20 }}>
                <div className="container">
                    <div className="stats-grid" style={{ textAlign: 'center' }}>
                        {stats.map((s, i) => (
                            <div key={i} style={{ position: 'relative' }}>
                                <div style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-serif)', color: 'var(--color-accent)', marginBottom: '0.5rem', lineHeight: 1 }}>{s.number}</div>
                                <div style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
                                {i !== stats.length - 1 && (
                                    <div className="stat-divider" style={{ position: 'absolute', top: '20%', right: '-1rem', height: '60%', width: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <style>{`
                    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
                    .stat-divider { display: none; }
                    @media (min-width: 769px) { .stat-divider { display: block !important; } }
                    @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; } }
                `}</style>

                {/* Factory scrolling strip */}
                <div style={{ position: 'relative', overflow: 'hidden', marginTop: '4rem' }}>
                    <div className="factory-track">
                        {[
                            { src: '/factory/factory-welding-gate.png', alt: 'Gate manufacturing' },
                            { src: '/factory/factory-welding-close.png', alt: 'Welding work' },
                            { src: '/factory/factory-machinery.png', alt: 'Production equipment' },
                            { src: '/factory/factory-painting.png', alt: 'Painting workshop' },
                            { src: '/factory/factory-welding-gate.png', alt: 'Gate manufacturing' },
                            { src: '/factory/factory-welding-close.png', alt: 'Welding work' },
                            { src: '/factory/factory-machinery.png', alt: 'Production equipment' },
                            { src: '/factory/factory-painting.png', alt: 'Painting workshop' },
                        ].map((img, i) => (
                            <div key={i} style={{ flexShrink: 0, width: '480px', height: '300px', overflow: 'hidden' }}>
                                <img src={img.src} alt={img.alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            </div>
                        ))}
                    </div>
                </div>
                <style>{`
                    .factory-track { display: flex; gap: 4px; width: max-content; animation: factory-scroll 30s linear infinite; }
                    .factory-track:hover { animation-play-state: paused; }
                    @keyframes factory-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                    @media (max-width: 768px) { .factory-track > div { width: 300px !important; height: 200px !important; } }
                `}</style>
            </section>

            {/* ═══ Process Section ═══ */}
            <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-surface-light)' }}>
                <div className="container">
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#fff', border: '1.5px solid var(--color-border-light)', borderRadius: '999px', padding: '0.4rem 1.1rem', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', display: 'inline-block' }} />
                                {tx.process.badge}
                            </div>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-text-dark)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                                {tx.process.heading1}<br />
                                <span style={{ color: 'var(--color-accent)' }}>{tx.process.heading2}</span>
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="process-grid">
                        {tx.process.steps.map((step, i, arr) => {
                            const Icon = STEP_ICONS[i];
                            return (
                                <div key={i} style={{ position: 'relative', textAlign: 'center', padding: '1.5rem 0.75rem' }}>
                                    <div style={{ position: 'relative', width: '86px', height: '86px', margin: '0 auto 1.4rem' }}>
                                        <div style={{ width: '86px', height: '86px', borderRadius: '50%', backgroundColor: '#fff', border: '1.5px solid var(--color-border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
                                            <Icon size={30} color="#9a9a9a" strokeWidth={1.5} />
                                        </div>
                                        <div style={{ position: 'absolute', top: '-5px', right: '-5px', width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: '#fff', letterSpacing: '0.5px' }}>
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '0.6rem', fontFamily: 'var(--font-serif)' }}>
                                        {step.title}
                                    </h3>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65, maxWidth: '180px', margin: '0 auto' }}>
                                        {step.desc}
                                    </p>

                                    {i < arr.length - 1 && (
                                        <svg
                                            className="process-arrow-svg"
                                            viewBox="0 0 80 44"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{ position: 'absolute', top: '28px', right: '-26px', width: '52px', height: '30px', zIndex: 2 }}
                                        >
                                            <path d="M4 34 C 20 6, 60 6, 76 34" stroke="#E8772E" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" opacity="0.55" />
                                            <path d="M70 28 L78 36 L62 37" fill="#E8772E" opacity="0.55" />
                                        </svg>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <style>{`
                    .process-grid {
                        display: grid;
                        grid-template-columns: repeat(5, 1fr);
                        gap: 0.5rem;
                        position: relative;
                    }
                    .process-arrow-svg { display: block; }
                    @media (max-width: 900px) {
                        .process-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
                    }
                    @media (max-width: 600px) {
                        .process-grid { grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
                        .process-arrow-svg { display: none; }
                    }
                `}</style>
            </section>

            {/* ═══ FAQ Section ═══ */}
            <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-surface-light)' }}>
                <div className="container">
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-text-dark)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                                {tx.faq.heading}
                            </h2>
                        </div>
                    </ScrollReveal>
                    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {tx.faq.items.map((item, i) => (
                            <div key={i} style={{ borderBottom: '1px solid var(--color-border-light)', padding: '1.5rem 0' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '0.6rem', lineHeight: 1.4 }}>
                                    {item.q}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                                    {item.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Catalog Section ═══ */}
            <section id="catalog" style={{ padding: '8rem 0', backgroundColor: 'var(--color-bg-light)' }}>
                <div className="container">
                    <ScrollReveal>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
                            <div style={{ maxWidth: '600px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                                    {tx.catalog.badge}
                                </div>
                                <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'var(--color-text-dark)', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                                    {tx.catalog.title}
                                </h2>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                                    {tx.catalog.subtitle}
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                    <div className="tier-cards-grid">
                        {tiers.map((tier, idx) => {
                            const Icon = TIER_ICONS[idx];
                            const isLux = tier.id === 'lux';
                            const isPremium = tier.id === 'premium';
                            const bg = isLux ? 'var(--color-bg-dark)' : '#fff';
                            const textColor = isLux ? '#fff' : 'var(--color-text-dark)';
                            const mutedColor = isLux ? 'rgba(255,255,255,0.5)' : 'var(--color-text-muted)';
                            const borderStyle = isLux ? '2px solid var(--color-accent)' : isPremium ? '2px solid var(--color-accent)' : '1.5px solid var(--color-border-light)';
                            const iconBg = isLux ? 'rgba(232,119,46,0.15)' : 'var(--color-surface-light)';
                            const dotColor = isLux ? 'var(--color-accent)' : isPremium ? 'var(--color-accent)' : '#bbb';
                            return (
                                <div key={tier.id} style={{
                                    backgroundColor: bg,
                                    border: borderStyle,
                                    borderRadius: '16px',
                                    padding: '2.5rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    boxShadow: isLux ? '0 8px 40px rgba(232,119,46,0.2)' : isPremium ? '0 4px 24px rgba(0,0,0,0.07)' : 'none',
                                }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = isLux ? '0 16px 56px rgba(232,119,46,0.3)' : '0 12px 40px rgba(0,0,0,0.12)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = isLux ? '0 8px 40px rgba(232,119,46,0.2)' : isPremium ? '0 4px 24px rgba(0,0,0,0.07)' : 'none'; }}
                                >
                                    {/* Badge */}
                                    {isLux && (
                                        <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--color-accent)', color: '#fff', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '0.3rem 1rem', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                                            {tx.catalog.exclusiveBadge}
                                        </div>
                                    )}
                                    {isPremium && (
                                        <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--color-text-dark)', color: '#fff', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '0.3rem 1rem', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                                            {tx.catalog.popularBadge}
                                        </div>
                                    )}

                                    {/* Header */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.75rem', color: textColor, marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>{tier.title}</h3>
                                            <p style={{ color: mutedColor, fontSize: '0.85rem' }}>{tx.catalog.from}</p>
                                            <p style={{ color: isLux ? 'var(--color-accent)' : 'var(--color-text-dark)', fontWeight: 700, fontSize: '1.2rem', marginTop: '0.2rem' }}>{tier.price}</p>
                                        </div>
                                        <div style={{ width: '48px', height: '48px', backgroundColor: iconBg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <Icon size={22} color="var(--color-accent)" />
                                        </div>
                                    </div>

                                    <p style={{ color: mutedColor, marginBottom: '2rem', flex: 1, lineHeight: 1.6, fontSize: '0.95rem' }}>{tier.desc}</p>

                                    {/* Features */}
                                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {tier.features.map((f, i) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: isLux ? 'rgba(255,255,255,0.75)' : 'var(--color-text-dark)', fontSize: '0.9rem' }}>
                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: dotColor, flexShrink: 0 }} />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link to={langPath(`/catalog/${tier.id}`)}
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '0.9rem 1.25rem', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem',
                                            textDecoration: 'none', transition: 'all 0.25s',
                                            ...(isLux
                                                ? { backgroundColor: 'var(--color-accent)', color: '#fff', border: 'none' }
                                                : { backgroundColor: 'transparent', color: 'var(--color-text-dark)', border: '1.5px solid var(--color-border-light)' }),
                                        }}
                                        onMouseEnter={e => {
                                            const el = e.currentTarget;
                                            if (isLux) { el.style.backgroundColor = 'var(--color-accent-dark)'; }
                                            else { el.style.borderColor = 'var(--color-text-dark)'; el.style.backgroundColor = 'var(--color-text-dark)'; el.style.color = '#fff'; }
                                        }}
                                        onMouseLeave={e => {
                                            const el = e.currentTarget;
                                            if (isLux) { el.style.backgroundColor = 'var(--color-accent)'; }
                                            else { el.style.borderColor = 'var(--color-border-light)'; el.style.backgroundColor = 'transparent'; el.style.color = 'var(--color-text-dark)'; }
                                        }}
                                    >
                                        {tx.catalog.viewSeries} <ArrowRight size={16} />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    <style>{`.tier-cards-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; } @media(max-width:900px){.tier-cards-grid{grid-template-columns:1fr;max-width:480px;margin:0 auto;}}`}</style>
                </div>
            </section>


        </div>
    );
}
