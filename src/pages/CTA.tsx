import { useState } from 'react';

const WHATSAPP_URL = `https://wa.me/77273122530?text=${encodeURIComponent('Сәлеметсіз бе! TEMIR USTA-дан қақпа алғым келген еді..')}`;

const r2Img = (id: string) => `https://pub-45c64cad9ebf4f4f8e48e787f035d2f3.r2.dev/${id.split('-')[0]}/${id}.webp`;

const galleryImages = [
    'S1-01','S1-05','S1-10','S1-14',
    'P2-08','P2-14','P2-20','P2-30','P2-38',
    'L3-20','L3-35','L3-45','L3-55','L3-63','L3-69',
].map(id => ({ id, url: r2Img(id) }));

const BODY = {
    kz: 'Нарықта 15+ жыл тәжірибе!\n10 000-нан астам сәтті орнатылған қақпалар.',
    ru: 'На рынке 15+ лет опыта!\nБолее 10 000 успешно установленных ворот.',
};

const CTA_TEXT = {
    kz: 'ТЕГІН КОНСУЛЬТАЦИЯ',
    ru: 'БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ',
};

export default function CTA() {
    const [lang, setLang] = useState<'kz' | 'ru'>('kz');

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

    return (
        <div style={{
            height: '100dvh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            backgroundImage: 'url(/hero-img.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            {/* Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.45) 100%)' }} />

            {/* Mini nav */}
            <div style={{
                position: 'relative',
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 clamp(1.5rem, 8vw, 6rem)',
                height: '72px',
                flexShrink: 0,
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src="/logo-temir-usta-T.svg" alt="" style={{ height: '1.3em', width: 'auto', filter: 'invert(1)' }} />
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, letterSpacing: '0.5px', color: '#fff' }}>
                        TEMIR USTA
                    </span>
                </div>

                {/* Language switcher */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <button onClick={() => setLang('kz')} style={{ ...langBtnBase, color: lang === 'kz' ? '#fff' : 'rgba(255,255,255,0.35)' }}>KZ</button>
                    <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>|</span>
                    <button onClick={() => setLang('ru')} style={{ ...langBtnBase, color: lang === 'ru' ? '#fff' : 'rgba(255,255,255,0.35)' }}>RU</button>
                </div>
            </div>

            {/* Hero content */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                padding: '0 clamp(1.5rem, 8vw, 6rem) clamp(2rem, 6vh, 5rem)',
            }}>
                <div style={{ maxWidth: '680px', color: '#fff' }}>
                    <div className="slide-up" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1.75rem',
                        color: 'var(--color-accent)',
                        fontWeight: 500,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontSize: '0.85rem',
                    }}>
                        <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-accent)' }} />
                        СЕНІМДІЛІК ПЕН СТИЛЬ
                    </div>

                    <h1 className="slide-up" style={{
                        animationDelay: '0.1s',
                        fontSize: 'clamp(2.6rem, 5.5vw, 5.5rem)',
                        marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                    }}>
                        Темір Ұста<br />
                        <span style={{ fontStyle: 'italic', fontWeight: 'normal', opacity: 0.9 }}>
                            қақпа жасау шеберлері
                        </span>
                    </h1>

                    <p className="slide-up" style={{
                        animationDelay: '0.15s',
                        fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
                        color: 'rgba(255,255,255,0.65)',
                        lineHeight: 1.6,
                        marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
                        maxWidth: '480px',
                        whiteSpace: 'pre-line',
                    }}>
                        {BODY[lang]}
                    </p>

                    <div className="slide-up" style={{ animationDelay: '0.2s' }}>
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: 'clamp(1.1rem, 2.5vh, 1.4rem) clamp(2rem, 5vw, 3.25rem)',
                                minHeight: '58px',
                                backgroundColor: '#25D366',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                                boxShadow: '0 4px 24px rgba(37,211,102,0.45)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)';
                                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 32px rgba(37,211,102,0.65)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
                                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 24px rgba(37,211,102,0.45)';
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            {CTA_TEXT[lang]}
                        </a>
                    </div>
                </div>
            </div>

            {/* Moving gallery strip */}
            <div style={{ position: 'relative', zIndex: 10, overflow: 'hidden', paddingBottom: 'clamp(1.5rem, 3vh, 2.5rem)', flexShrink: 0 }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to right, rgba(10,10,10,0.9), transparent)', zIndex: 2, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to left, rgba(10,10,10,0.9), transparent)', zIndex: 2, pointerEvents: 'none' }} />

                <div className="cta-gallery-track">
                    {[...galleryImages, ...galleryImages].map((img, i) => (
                        <div key={i} style={{
                            flexShrink: 0,
                            width: 'clamp(220px, 24vw, 320px)',
                            height: 'clamp(155px, 17vw, 225px)',
                            overflow: 'hidden',
                            borderRadius: '10px',
                            backgroundColor: '#222',
                        }}>
                            <img
                                src={img.url}
                                alt={`Темір қақпа ${img.id}`}
                                loading="lazy"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .cta-gallery-track {
                    display: flex;
                    gap: 1rem;
                    padding: 0 1rem;
                    width: max-content;
                    animation: cta-gallery-scroll 40s linear infinite;
                }
                @keyframes cta-gallery-scroll {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}
