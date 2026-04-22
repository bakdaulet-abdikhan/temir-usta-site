import { useLang } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { useSEO } from '../hooks/useSEO';

type PolicyType = 'privacy' | 'terms';

function PolicyPage({ type }: { type: PolicyType }) {
    const { lang } = useLang();
    const tx = translations[lang][type];

    useSEO({ title: `${tx.title} — Темір Ұста`, description: tx.sections[0].body });

    return (
        <div style={{ backgroundColor: 'var(--color-bg-light)', paddingTop: '100px', paddingBottom: '6rem' }}>
            <div className="container" style={{ maxWidth: '760px', margin: '0 auto' }}>
                <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--color-text-dark)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    {tx.title}
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '3rem' }}>
                    {tx.lastUpdated}
                </p>
                {tx.sections.map((section, i) => (
                    <div key={i} style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '0.6rem' }}>
                            {section.heading}
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                            {section.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function PrivacyPage() {
    return <PolicyPage type="privacy" />;
}

export function TermsPage() {
    return <PolicyPage type="terms" />;
}
