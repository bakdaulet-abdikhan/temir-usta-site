import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const tierInfo: Record<string, { title: string; color: string; desc: string; priceRange: string }> = {
    standard: { title: 'Standard', color: '#f5f5f5', desc: 'Сенімді шешім. Күнделікті қолдануға арналған тұрақты қақпалар.', priceRange: '230 000 – 360 000 ₸' },
    premium: { title: 'Premium', color: '#e0e0e0', desc: 'Жоғары сапалы материалдар мен заманауи дизайн.', priceRange: '350 000 – 600 000 ₸' },
    lux: { title: 'Lux', color: '#cecece', desc: 'Эксклюзивті дизайн, ең жоғары сапа.', priceRange: '600 000+ ₸' },
};

const tierOrder = ['standard', 'premium', 'lux'];

function r2Img(id: string) {
    return `https://pub-45c64cad9ebf4f4f8e48e787f035d2f3.r2.dev/${id.split('-')[0]}/${id}.webp`;
}

// Retry handler for failed images — appends cache-busting param
function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    const retries = Number(img.dataset.retries || '0');
    if (retries < 3) {
        img.dataset.retries = String(retries + 1);
        const base = img.src.split('&_t=')[0];
        img.src = `${base}&_t=${Date.now()}`;
    }
}

// Standard gates (16 items) — S1-xx
const standardGates = [
    { id: 'S1-01', image: r2Img('S1-01') },
    { id: 'S1-02', image: r2Img('S1-02') },
    { id: 'S1-03', image: r2Img('S1-03') },
    { id: 'S1-04', image: r2Img('S1-04') },
    { id: 'S1-05', image: r2Img('S1-05') },
    { id: 'S1-06', image: r2Img('S1-06') },
    { id: 'S1-07', image: r2Img('S1-07') },
    { id: 'S1-08', image: r2Img('S1-08') },
    { id: 'S1-09', image: r2Img('S1-09') },
    { id: 'S1-10', image: r2Img('S1-10') },
    { id: 'S1-11', image: r2Img('S1-11') },
    { id: 'S1-12', image: r2Img('S1-12') },
    { id: 'S1-13', image: r2Img('S1-13') },
    { id: 'S1-14', image: r2Img('S1-14') },
    { id: 'S1-15', image: r2Img('S1-15') },
];

// Premium gates (44 items) — P2-xx
const premiumGates = [
    { id: 'P2-01', image: r2Img('P2-01') },
    { id: 'P2-02', image: r2Img('P2-02') },
    { id: 'P2-03', image: r2Img('P2-03') },
    { id: 'P2-04', image: r2Img('P2-04') },
    { id: 'P2-05', image: r2Img('P2-05') },
    { id: 'P2-06', image: r2Img('P2-06') },
    { id: 'P2-07', image: r2Img('P2-07') },
    { id: 'P2-08', image: r2Img('P2-08') },
    { id: 'P2-09', image: r2Img('P2-09') },
    { id: 'P2-10', image: r2Img('P2-10') },
    { id: 'P2-11', image: r2Img('P2-11') },
    { id: 'P2-12', image: r2Img('P2-12') },
    { id: 'P2-13', image: r2Img('P2-13') },
    { id: 'P2-14', image: r2Img('P2-14') },
    { id: 'P2-15', image: r2Img('P2-15') },
    { id: 'P2-16', image: r2Img('P2-16') },
    { id: 'P2-17', image: r2Img('P2-17') },
    { id: 'P2-18', image: r2Img('P2-18') },
    { id: 'P2-19', image: r2Img('P2-19') },
    { id: 'P2-20', image: r2Img('P2-20') },

    { id: 'P2-22', image: r2Img('P2-22') },
    { id: 'P2-23', image: r2Img('P2-23') },
    { id: 'P2-24', image: r2Img('P2-24') },
    { id: 'P2-25', image: r2Img('P2-25') },
    { id: 'P2-26', image: r2Img('P2-26') },
    { id: 'P2-27', image: r2Img('P2-27') },

    { id: 'P2-29', image: r2Img('P2-29') },
    { id: 'P2-30', image: r2Img('P2-30') },
    { id: 'P2-31', image: r2Img('P2-31') },
    { id: 'P2-32', image: r2Img('P2-32') },
    { id: 'P2-33', image: r2Img('P2-33') },
    { id: 'P2-34', image: r2Img('P2-34') },
    { id: 'P2-35', image: r2Img('P2-35') },
    { id: 'P2-36', image: r2Img('P2-36') },
    { id: 'P2-37', image: r2Img('P2-37') },
    { id: 'P2-38', image: r2Img('P2-38') },
    { id: 'P2-39', image: r2Img('P2-39') },
    { id: 'P2-40', image: r2Img('P2-40') },
    { id: 'P2-41', image: r2Img('P2-41') },
    { id: 'P2-42', image: r2Img('P2-42') },
    { id: 'P2-43', image: r2Img('P2-43') },
    { id: 'P2-44', image: r2Img('P2-44') },
];

// Lux gates (69 items) — L3-xx
const luxGates = [
    { id: 'L3-01', image: r2Img('L3-01') },
    { id: 'L3-02', image: r2Img('L3-02') },
    { id: 'L3-03', image: r2Img('L3-03') },
    { id: 'L3-04', image: r2Img('L3-04') },
    { id: 'L3-05', image: r2Img('L3-05') },
    { id: 'L3-06', image: r2Img('L3-06') },
    { id: 'L3-07', image: r2Img('L3-07') },
    { id: 'L3-08', image: r2Img('L3-08') },
    { id: 'L3-09', image: r2Img('L3-09') },
    { id: 'L3-10', image: r2Img('L3-10') },
    { id: 'L3-11', image: r2Img('L3-11') },
    { id: 'L3-12', image: r2Img('L3-12') },
    { id: 'L3-13', image: r2Img('L3-13') },
    { id: 'L3-14', image: r2Img('L3-14') },
    { id: 'L3-15', image: r2Img('L3-15') },

    { id: 'L3-18', image: r2Img('L3-18') },
    { id: 'L3-19', image: r2Img('L3-19') },
    { id: 'L3-20', image: r2Img('L3-20') },
    { id: 'L3-21', image: r2Img('L3-21') },
    { id: 'L3-22', image: r2Img('L3-22') },
    { id: 'L3-23', image: r2Img('L3-23') },
    { id: 'L3-25', image: r2Img('L3-25') },
    { id: 'L3-26', image: r2Img('L3-26') },
    { id: 'L3-27', image: r2Img('L3-27') },
    { id: 'L3-28', image: r2Img('L3-28') },
    { id: 'L3-29', image: r2Img('L3-29') },
    { id: 'L3-30', image: r2Img('L3-30') },
    { id: 'L3-31', image: r2Img('L3-31') },
    { id: 'L3-32', image: r2Img('L3-32') },
    { id: 'L3-33', image: r2Img('L3-33') },
    { id: 'L3-34', image: r2Img('L3-34') },
    { id: 'L3-35', image: r2Img('L3-35') },
    { id: 'L3-36', image: r2Img('L3-36') },
    { id: 'L3-37', image: r2Img('L3-37') },
    { id: 'L3-38', image: r2Img('L3-38') },
    { id: 'L3-39', image: r2Img('L3-39') },
    { id: 'L3-40', image: r2Img('L3-40') },
    { id: 'L3-41', image: r2Img('L3-41') },
    { id: 'L3-42', image: r2Img('L3-42') },
    { id: 'L3-43', image: r2Img('L3-43') },
    { id: 'L3-44', image: r2Img('L3-44') },
    { id: 'L3-45', image: r2Img('L3-45') },
    { id: 'L3-46', image: r2Img('L3-46') },
    { id: 'L3-47', image: r2Img('L3-47') },
    { id: 'L3-48', image: r2Img('L3-48') },
    { id: 'L3-49', image: r2Img('L3-49') },
    { id: 'L3-50', image: r2Img('L3-50') },
    { id: 'L3-51', image: r2Img('L3-51') },
    { id: 'L3-52', image: r2Img('L3-52') },
    { id: 'L3-53', image: r2Img('L3-53') },
    { id: 'L3-54', image: r2Img('L3-54') },
    { id: 'L3-55', image: r2Img('L3-55') },
    { id: 'L3-56', image: r2Img('L3-56') },
    { id: 'L3-57', image: r2Img('L3-57') },
    { id: 'L3-58', image: r2Img('L3-58') },
    { id: 'L3-59', image: r2Img('L3-59') },
    { id: 'L3-60', image: r2Img('L3-60') },
    { id: 'L3-61', image: r2Img('L3-61') },
    { id: 'L3-62', image: r2Img('L3-62') },
    { id: 'L3-63', image: r2Img('L3-63') },
    { id: 'L3-64', image: r2Img('L3-64') },
    { id: 'L3-65', image: r2Img('L3-65') },
    { id: 'L3-66', image: r2Img('L3-66') },
    { id: 'L3-67', image: r2Img('L3-67') },

    { id: 'L3-69', image: r2Img('L3-69') },
];

const gateData: Record<string, { id: string; image: string }[]> = {
    standard: standardGates,
    premium: premiumGates,
    lux: luxGates,
};

/* ─── Zoom Modal Component ─── */
function ZoomModal({
    gate,
    gates,
    onClose,
    onNavigate,
}: {
    gate: { id: string; image: string };
    gates: { id: string; image: string }[];
    onClose: () => void;
    onNavigate: (gate: { id: string; image: string }) => void;
}) {
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const imgRef = useRef<HTMLDivElement>(null);
    const lastPinchDist = useRef(0);
    const lastTouchCenter = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const dragStart = useRef({ x: 0, y: 0 });

    const idx = gates.findIndex(g => g.id === gate.id);
    const hasPrev = idx > 0;
    const hasNext = idx < gates.length - 1;

    // Reset zoom when gate changes
    useEffect(() => {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
    }, [gate.id]);

    // Prevent body scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const handleZoomIn = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setScale(s => Math.min(s + 0.5, 5));
    }, []);

    const handleZoomOut = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setScale(s => {
            const next = Math.max(s - 0.5, 1);
            if (next === 1) setTranslate({ x: 0, y: 0 });
            return next;
        });
    }, []);

    const handleResetZoom = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setScale(1);
        setTranslate({ x: 0, y: 0 });
    }, []);

    // Pinch-to-zoom
    const onTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            lastPinchDist.current = Math.hypot(dx, dy);
            lastTouchCenter.current = {
                x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
                y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
            };
        } else if (e.touches.length === 1 && scale > 1) {
            isDragging.current = true;
            dragStart.current = {
                x: e.touches[0].clientX - translate.x,
                y: e.touches[0].clientY - translate.y,
            };
        }
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.hypot(dx, dy);
            if (lastPinchDist.current > 0) {
                const delta = dist / lastPinchDist.current;
                setScale(s => Math.min(Math.max(s * delta, 1), 5));
            }
            lastPinchDist.current = dist;
        } else if (e.touches.length === 1 && isDragging.current && scale > 1) {
            setTranslate({
                x: e.touches[0].clientX - dragStart.current.x,
                y: e.touches[0].clientY - dragStart.current.y,
            });
        }
    };

    const onTouchEnd = () => {
        lastPinchDist.current = 0;
        isDragging.current = false;
        if (scale <= 1) setTranslate({ x: 0, y: 0 });
    };

    const btnStyle: React.CSSProperties = {
        width: '44px', height: '44px', borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', border: 'none', cursor: 'pointer',
        transition: 'background-color 0.2s',
    };

    const navBtnStyle = (enabled: boolean): React.CSSProperties => ({
        ...btnStyle,
        width: '48px', height: '48px',
        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
        opacity: enabled ? 1 : 0.3,
        pointerEvents: enabled ? 'auto' : 'none',
    });

    return (
        <div
            style={{
                position: 'fixed', inset: 0, zIndex: 1000,
                backgroundColor: 'rgba(0,0,0,0.95)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column',
                animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={onClose}
        >
            {/* Top bar: close + zoom controls */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '1rem 1.5rem', zIndex: 1001,
                }}
            >
                {/* Gate ID */}
                <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '1px' }}>
                    {gate.id}
                </p>

                {/* Zoom controls */}
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button onClick={handleZoomOut} style={btnStyle}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    >
                        <ZoomOut size={20} />
                    </button>
                    <button onClick={handleResetZoom} style={{
                        ...btnStyle, width: 'auto', borderRadius: '22px', padding: '0 12px',
                        fontSize: '0.85rem', fontWeight: 600,
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    >
                        {Math.round(scale * 100)}%
                    </button>
                    <button onClick={handleZoomIn} style={btnStyle}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    >
                        <ZoomIn size={20} />
                    </button>

                    <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '0 0.25rem' }} />

                    <button onClick={(e) => { e.stopPropagation(); onClose(); }} style={btnStyle}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    >
                        <X size={22} />
                    </button>
                </div>
            </div>

            {/* Prev / Next */}
            <button
                onClick={(e) => { e.stopPropagation(); if (hasPrev) { onNavigate(gates[idx - 1]); } }}
                style={{ ...navBtnStyle(hasPrev), left: '1rem' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            >
                <ChevronLeft size={28} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); if (hasNext) { onNavigate(gates[idx + 1]); } }}
                style={{ ...navBtnStyle(hasNext), right: '1rem' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            >
                <ChevronRight size={28} />
            </button>

            {/* Image container with pinch-to-zoom + drag */}
            <div
                ref={imgRef}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                style={{
                    maxWidth: '90vw', maxHeight: '80vh',
                    overflow: 'hidden',
                    touchAction: 'none',
                    cursor: scale > 1 ? 'grab' : 'default',
                }}
            >
                <img
                    src={gate.image}
                    alt={gate.id}
                    onError={handleImgError}
                    draggable={false}
                    style={{
                        maxWidth: '100%', maxHeight: '75vh',
                        borderRadius: '4px', objectFit: 'contain',
                        transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
                        transition: isDragging.current ? 'none' : 'transform 0.2s ease',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    }}
                />
            </div>
        </div>
    );
}

/* ─── Category Page ─── */
export default function Category() {
    const { tier } = useParams<{ tier: string }>();
    const currentTier = tier && tierInfo[tier] ? tier : 'standard';
    const info = tierInfo[currentTier];
    const gates = gateData[currentTier] || [];

    const [zoomedGate, setZoomedGate] = useState<null | { id: string; image: string }>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentTier]);

    return (
        <div>
            {/* Hero */}
            <section style={{
                backgroundColor: 'var(--color-bg-dark)',
                color: 'var(--color-text-light)',
                paddingTop: '130px',
                paddingBottom: '3rem',
            }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '0.75rem', letterSpacing: '-0.5px' }}>
                        <em style={{ color: 'var(--color-accent)', fontStyle: 'normal' }}>{info.title}</em> Қақпалар
                    </h1>
                    <p style={{ opacity: 0.7, fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>{info.desc}</p>
                    <p style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--color-accent)', marginTop: '1rem' }}>{info.priceRange}</p>
                </div>
            </section>

            {/* Tier Navigation Tabs */}
            <section style={{ backgroundColor: 'var(--color-bg-light)', borderBottom: '1px solid #eaeaea', position: 'sticky', top: '70px', zIndex: 50 }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '1rem 0', flexWrap: 'wrap' }}>
                    {tierOrder.map((t) => (
                        <Link
                            to={`/catalog/${t}`}
                            key={t}
                            style={{
                                padding: '0.65rem 1.8rem',
                                borderRadius: '12px',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                backgroundColor: t === currentTier ? 'var(--color-accent)' : 'transparent',
                                color: t === currentTier ? '#fff' : 'var(--color-text-dark)',
                                border: t === currentTier ? '1.5px solid var(--color-accent)' : '1.5px solid #ddd',
                                transition: 'all 0.25s ease',
                                textDecoration: 'none',
                            }}
                            className={t !== currentTier ? 'hover-scale' : ''}
                        >
                            {tierInfo[t].title}
                        </Link>
                    ))}
                </div>
            </section>

            {/* Gates Grid */}
            <section style={{ backgroundColor: 'var(--color-surface-light)', padding: '3rem 0 5rem 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.5rem',
                    }}>
                        {gates.map((gate) => (
                            <div
                                key={gate.id}
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: '1.5px solid var(--color-border-light)',
                                    transition: 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
                                    cursor: 'pointer',
                                }}
                                className="hover-scale"
                                onClick={() => setZoomedGate(gate)}
                            >
                                <div style={{ position: 'relative', paddingTop: '66%', backgroundColor: info.color, overflow: 'hidden' }}>
                                    <img
                                        src={gate.image}
                                        alt={gate.id}
                                        onError={handleImgError}
                                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                        loading="lazy"
                                    />
                                    {/* Magnifier icon: always visible on mobile, hover-only on desktop */}
                                    <div
                                        className="zoom-icon-wrapper"
                                        style={{
                                            position: 'absolute',
                                            top: '12px',
                                            right: '12px',
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '50%',
                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'opacity 0.3s ease',
                                        }}
                                    >
                                        <Search size={16} color="#000" />
                                    </div>
                                </div>
                                <div style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--color-text-dark)', margin: 0 }}>
                                        {gate.id}
                                    </p>
                                    <a
                                        href={`https://wa.me/77056401566?text=${encodeURIComponent(`Сәлеметсіз бе! Мені ${info.title} санатындағы ${gate.id} қақпасы қызықтырады. Бағасын айтып бере аласыз ба?`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.35rem',
                                            padding: '0.4rem 0.75rem',
                                            backgroundColor: '#25D366',
                                            color: '#fff',
                                            borderRadius: '8px',
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            whiteSpace: 'nowrap',
                                            transition: 'background-color 0.2s',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1da851'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
                                    >
                                        Бағасын білу
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <style>{`
                    /* Desktop: hide magnifier by default, show on hover */
                    @media (hover: hover) {
                        .zoom-icon-wrapper { opacity: 0 !important; }
                        .hover-scale:hover .zoom-icon-wrapper { opacity: 1 !important; }
                    }
                    /* Touch / mobile: always show magnifier */
                    @media (hover: none) {
                        .zoom-icon-wrapper { opacity: 0.85 !important; }
                    }
                `}</style>
            </section>

            {/* Zoom Modal */}
            {zoomedGate && (
                <ZoomModal
                    gate={zoomedGate}
                    gates={gates}
                    onClose={() => setZoomedGate(null)}
                    onNavigate={(g) => setZoomedGate(g)}
                />
            )}
        </div>
    );
}
