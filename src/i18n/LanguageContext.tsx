import { createContext, useContext, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Lang } from './translations';

interface LangCtx {
    lang: Lang;
    setLang: (l: Lang) => void;
    /** Prefix a path with /ru when in Russian mode, e.g. langPath('/catalog/standard') → '/ru/catalog/standard' */
    langPath: (path: string) => string;
}

const LangContext = createContext<LangCtx>({
    lang: 'kz',
    setLang: () => {},
    langPath: (p) => p,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const location = useLocation();
    const navigate = useNavigate();

    const lang: Lang = location.pathname.startsWith('/ru') ? 'ru' : 'kz';

    const langPath = (path: string): string => {
        if (lang === 'ru') {
            // '/' → '/ru', '/catalog/x' → '/ru/catalog/x'
            return `/ru${path === '/' ? '' : path}`;
        }
        return path;
    };

    const setLang = (l: Lang) => {
        const cur = location.pathname;
        const isRu = cur.startsWith('/ru');
        if (l === 'ru' && !isRu) {
            navigate(`/ru${cur === '/' ? '' : cur}`, { replace: true });
        } else if (l === 'kz' && isRu) {
            navigate(cur.slice(3) || '/', { replace: true });
        }
    };

    return <LangContext.Provider value={{ lang, setLang, langPath }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
