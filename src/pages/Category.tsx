import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const tierInfo: Record<string, { title: string; color: string; desc: string; priceRange: string }> = {
    standard: { title: 'Standard', color: '#f5f5f5', desc: 'Сенімді шешім. Күнделікті қолдануға арналған тұрақты қақпалар.', priceRange: '230 000 – 360 000 ₸' },
    premium: { title: 'Premium', color: '#e0e0e0', desc: 'Жоғары сапалы материалдар мен заманауи дизайн.', priceRange: '350 000 – 600 000 ₸' },
    lux: { title: 'Lux', color: '#cecece', desc: 'Эксклюзивті дизайн, ең жоғары сапа.', priceRange: '600 000+ ₸' },
};

const tierOrder = ['standard', 'premium', 'lux'];

// Helper to convert Google Drive file IDs to thumbnail URLs
function driveImg(fileId: string) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w600`;
}

// Retry handler for failed Drive images — appends cache-busting param
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
    { id: 'S1-01', image: driveImg('1ID3sKVWap4Biv0h6ZfFBFTkcKV4h1X0u') },
    { id: 'S1-02', image: driveImg('1Jz4WnRz0JOYr7S3DgsEqD8sO6J3x-jTg') },
    { id: 'S1-03', image: driveImg('1MwQjLHr-r5x-dl9dPUtPL26SrYWXEzv-') },
    { id: 'S1-04', image: driveImg('1n6MsacGtzoB48UtkpnbmIcu3hL2IRVsL') },
    { id: 'S1-05', image: driveImg('1tZSrdL5PwPxhXeWLSxEhtV18ozHB8GWj') },
    { id: 'S1-06', image: driveImg('1aVJLIWQgX0AOa4lgkgB5Zg8ElD6U71C-') },
    { id: 'S1-07', image: driveImg('1kE6s6xAeJkDYoPUcda6vLnohauD5hJFA') },
    { id: 'S1-08', image: driveImg('1MloKrrK5M_nAjx408MkW5bPgOZPY24Zw') },
    { id: 'S1-09', image: driveImg('1w9C1PjjSJZzKPz4WbjO-vvPIq4YO8b7h') },
    { id: 'S1-10', image: driveImg('1CnowBZ1vduRoagfnW7NoGxK7kYMjOMfG') },
    { id: 'S1-11', image: driveImg('1wqm8-bhUSHOb64LM_C7J_6lOlHZFqBrt') },
    { id: 'S1-12', image: driveImg('1x1VBiFwUegEicZCrnz2Gr58h3ItWFu5d') },
    { id: 'S1-13', image: driveImg('1aPtJGJN3ruK58uDQ9e-uWVEvq0NgruoQ') },
    { id: 'S1-14', image: driveImg('1y0aAAGpb-LoR532rTsRdAv0LR2A04OOF') },
    { id: 'S1-15', image: driveImg('1cMSGvHv67rcEowKcz5HPi96LuoG6SceF') },
    { id: 'S1-16', image: driveImg('1CVrHHtNynE0tGk1-fB8CEBV2VaBPPItp') },
];

// Premium gates (44 items) — P2-xx
const premiumGates = [
    { id: 'P2-01', image: driveImg('10OQ7GdrYplHeg-KwESlPogtjvBKiGBgd') },
    { id: 'P2-02', image: driveImg('1CbKSKzoiIrZ1Dz_HksZWNnMvZPZOmxFe') },
    { id: 'P2-03', image: driveImg('1Ckmw_p1I8MyLWtGY4-xnK4rVFdpTl9TT') },
    { id: 'P2-04', image: driveImg('1KJje2DDNFczZCbhUFfgvJhIKskTudFHX') },
    { id: 'P2-05', image: driveImg('1GJ6-OTEH61B6vZZwl9gs8Ngq7QGB9C6a') },
    { id: 'P2-06', image: driveImg('1rEOxYHos50yabjc4gLsIdB4VCUJ593Yt') },
    { id: 'P2-07', image: driveImg('1EbBbRaBxBTZ3emtvK97sjd92-Aja_CzV') },
    { id: 'P2-08', image: driveImg('1BqY6_NfXwy5lJ_-RCFGxDxGzFhGMTyG9') },
    { id: 'P2-09', image: driveImg('1w47OdWFYVZnSSOlm78Oigf2zYMhX-nWz') },
    { id: 'P2-10', image: driveImg('1QP1VdzcBOdw0_zor2jc5XwPaoGOHc8HH') },
    { id: 'P2-11', image: driveImg('1v0snV_wTVTjwTvnNqyGyGMuq5ZY9V9cN') },
    { id: 'P2-12', image: driveImg('1jslvVVk9zgVLuWRpWBjegzZ5Q1DAylkx') },
    { id: 'P2-13', image: driveImg('1DlFetBrSmIgLCBA2C_ncjbWg-_LMmLYd') },
    { id: 'P2-14', image: driveImg('1cMdWTX1HGfWIsU6qvb7oMwykSjb8Devd') },
    { id: 'P2-15', image: driveImg('1bZE_rR3pwkF-MY04C-6Eb7aciFf5H7VO') },
    { id: 'P2-16', image: driveImg('1IViu2mGNCnlR7stF3ktAcr6zBVbhvhZH') },
    { id: 'P2-17', image: driveImg('1FNp3Q-4cH4-f2z7S1HAIHfX6TDJWANlA') },
    { id: 'P2-18', image: driveImg('1_w_z25guh7SwTLl__h87IYNURpi3Sj-m') },
    { id: 'P2-19', image: driveImg('1uvgSn3QVJhxcQPnx0oJPNCg7a2zWwvgy') },
    { id: 'P2-20', image: driveImg('1Q8CYo7jvLfss8fLhdb0X6GjOfBrK0F84') },

    { id: 'P2-22', image: driveImg('1gzDmus9ERiKINmN3wYQyzImBZ2y1AO-a') },
    { id: 'P2-23', image: driveImg('14qVq2IDbGLDbZK9jBMqg1ErwqjQEt7dO') },
    { id: 'P2-24', image: driveImg('18Czh97cZq3214LN8gEUspnxFgNk2a6ua') },
    { id: 'P2-25', image: driveImg('1w3KJyfVZtiZ2kvBrav6eYQMbZJwNa_vU') },
    { id: 'P2-26', image: driveImg('1OpENSvj1OrKdijRoHAA4w9LJBKYoFmwE') },
    { id: 'P2-27', image: driveImg('1OHAnUWz3mghB1H-n1pBWWlU9DpTm4Dr-') },

    { id: 'P2-29', image: driveImg('1p-XAO8Bw3yjZGYPs4kyqIJppTjr7n7TO') },
    { id: 'P2-30', image: driveImg('1wua14MVSQb2gy5qPt6pKYL6Cc2nSkbBi') },
    { id: 'P2-31', image: driveImg('1tHZTVI5ZVLB-yMzxtDSnpCtkoiuMsHZM') },
    { id: 'P2-32', image: driveImg('1EuDU9ByEy2E-G8ii0yaJ_nqYxwhp91OF') },
    { id: 'P2-33', image: driveImg('1SG3yTFXsc03l81OdOaRmlLmt34YlSUus') },
    { id: 'P2-34', image: driveImg('1GTjoRvqiYfFSnwhLuSYk2gfjES3aE3kl') },
    { id: 'P2-35', image: driveImg('1uziFt0XPictbchad5zDSTsMavDJqFQiQ') },
    { id: 'P2-36', image: driveImg('1LC4IMvPWrFfORxssBwhNy4rNXA2f6I9s') },
    { id: 'P2-37', image: driveImg('1PeMBea87iCJkyCX-R2Wz4y2DWvQdw0cs') },
    { id: 'P2-38', image: driveImg('1ExMFTTgsONqLYB66w6kS3ZYsTvagz48I') },
    { id: 'P2-39', image: driveImg('1bDGn2517HuDJiE2YW9NDo_NsKbCuQCSm') },
    { id: 'P2-40', image: driveImg('1TfICw5EoTfW1EwUT-zR_I5CkN--96gmh') },
    { id: 'P2-41', image: driveImg('1oi2YSSpHf0mRyXutZ1uBXPylYKjpKmrQ') },
    { id: 'P2-42', image: driveImg('1XzaUlZY814kVM2xoDGQjbp7_Eyn4LrTe') },
    { id: 'P2-43', image: driveImg('1fg-OMewxBHWLu97tKqxvTlCPAA5C2R7P') },
    { id: 'P2-44', image: driveImg('1etCeQf8PToTTDKDcx7kXZ1GElXoJPa1_') },
];

// Lux gates (69 items) — L3-xx
const luxGates = [
    { id: 'L3-01', image: driveImg('13kjREIx3hELPS6FlE3-Qm8UmhiU15LlL') },
    { id: 'L3-02', image: driveImg('1atMmX2BN59aHUMYBprG4W6pWLSVkCU3s') },
    { id: 'L3-03', image: driveImg('19D1gx_obONaogl06MkfSlegATkg3JSAN') },
    { id: 'L3-04', image: driveImg('1r4ZxmZWfG_-HY30P64BLsG3y_eu4OHFd') },
    { id: 'L3-05', image: driveImg('1FKPmsC7u8GZ3_HDg_not80JUP8mDeOHW') },
    { id: 'L3-06', image: driveImg('1e2W5OgxJa9YZBmYYGRO6Qxz0ZACnvn5c') },
    { id: 'L3-07', image: driveImg('1DLfa-dEJPAp_maXFE_q3ePmyCqsMqxBF') },
    { id: 'L3-08', image: driveImg('1tETgyLL1Q_ZOBRUfjOJwmIOKLbjLqVyJ') },
    { id: 'L3-09', image: driveImg('1q4xcV9w_Omg7SWLPTMpr5-RNr8GOEEei') },
    { id: 'L3-10', image: driveImg('1I6rVYeIPmhpi9FdEhIsk8icFc4OOYleV') },
    { id: 'L3-11', image: driveImg('1FvqDhihdgPK7bmrgSKFlSMAgic6Z1tR6') },
    { id: 'L3-12', image: driveImg('100-esu7kUTLajaZwlsHF5a_HZ0WigxAb') },
    { id: 'L3-13', image: driveImg('15dK5xWnAzEfISXTzibuNVXZImLHcfXIE') },
    { id: 'L3-14', image: driveImg('1KTmImzIoqZjQDXII_y9HGeMmrkIbTz4V') },
    { id: 'L3-15', image: driveImg('1-0B9k_RW-e_xi9MlN1_5pQtlHFJz1sAm') },

    { id: 'L3-18', image: driveImg('1YyakowNP6nNhOaZhiyegs2HsQIo4fWWO') },
    { id: 'L3-19', image: driveImg('1yVZM8CJoQDZ4oMIPu61GFhiMgQtPHZ4S') },
    { id: 'L3-20', image: driveImg('1s8vWgKqWZ-6MzWameVQAY5fbDwC-hsDG') },
    { id: 'L3-21', image: driveImg('1io9TNlEjYXaN_070xWcTk6xRxOY-3G4o') },
    { id: 'L3-22', image: driveImg('1pz_h1b5b4YhIavmpuiMa8ek3Mp6pbOfV') },
    { id: 'L3-23', image: driveImg('1qddLniC7zX6dJXkliSLMNBsIUbsd48Xz') },
    { id: 'L3-25', image: driveImg('1Mby_uKMwErQqflN3kKfUfEnNC24rJRPg') },
    { id: 'L3-26', image: driveImg('1yLoRZxNc860aHn4z0QEO19LiQRhwAXtw') },
    { id: 'L3-27', image: driveImg('11RX-kEKkNozoGukUAmTonC4NwZNQyuw3') },
    { id: 'L3-28', image: driveImg('1Narum0KBgwTZSmA5PaqLxoKMdycbYc4w') },
    { id: 'L3-29', image: driveImg('190EY9C44g07bv1P1jo4mKLSArqTZk0fh') },
    { id: 'L3-30', image: driveImg('1-96TavGQaI6ybbdtJd9SX_mkA7Rv-TBA') },
    { id: 'L3-31', image: driveImg('1Nzl4PCuPWGGZjO6xOsvptjK-XtM7_Xkn') },
    { id: 'L3-32', image: driveImg('1F5MJlMB7Xy5iusts-dcKgp3r_w6bBdIm') },
    { id: 'L3-33', image: driveImg('1HlpfZ_54mcUHM9RmydervIIcSUj5RSC7') },
    { id: 'L3-34', image: driveImg('1eLgViFFciaCzxY1HAzvUl_NfOXEswgZy') },
    { id: 'L3-35', image: driveImg('1RAeJSJQeKosdlZK3ZS7gAf0c5E8Det-2') },
    { id: 'L3-36', image: driveImg('1zp0VDEk0P_hVFWhehnZobHzVmunyrRvp') },
    { id: 'L3-37', image: driveImg('1Qk5lSGjIK8Vw74XHCEKafzD7Hd9bJYk2') },
    { id: 'L3-38', image: driveImg('10vVlN4l04RlhPvexRiEBxoyRmYlXSeN0') },
    { id: 'L3-39', image: driveImg('1OEQrsvrc8yDO9BVhaLjZXZdo-w0wclrY') },
    { id: 'L3-40', image: driveImg('1ntCyAQYwXsYY_aKUWKiBvrFPdnIm0Q3z') },
    { id: 'L3-41', image: driveImg('1Rx7pKF4uzVMKLwAQm-hMgGasX5pFaphI') },
    { id: 'L3-42', image: driveImg('1MWQa6k6Iwafqa7OnEk-BufDJU3zRhQf2') },
    { id: 'L3-43', image: driveImg('10N8Na_ywRtSTxe2OzVqmOOxpijJGnT7p') },
    { id: 'L3-44', image: driveImg('17d7L5jfp6VlLA9-1T5Wmc2H9DGqW5ZjG') },
    { id: 'L3-45', image: driveImg('1fHyQHzMJt2riqzbq7ZaPFrQsRDCtLzEe') },
    { id: 'L3-46', image: driveImg('1C5YeKV87JjAikp_RpLGTuVGU42g1cgtU') },
    { id: 'L3-47', image: driveImg('1p8OQabBLwkLanMW4EIk1ITxtCyNK7Y5d') },
    { id: 'L3-48', image: driveImg('1a6uC1tRDiPCqdCQS04H5BBAWdaKDZ-bX') },
    { id: 'L3-49', image: driveImg('1LHG0aXRHQ0MeFkpUtx1rABitjurczMvi') },
    { id: 'L3-50', image: driveImg('1R8u86Tj65Lnn5K9SQUqudazfQSr6uSzw') },
    { id: 'L3-51', image: driveImg('1gIUO5Fi6NEJpHnBN5CU5AFbebBf2eyag') },
    { id: 'L3-52', image: driveImg('1l5eAJdzn8rctJD4YxBDLZc8usXkVRcSd') },
    { id: 'L3-53', image: driveImg('1IZWlKodYe0-i2sPSGtZdTJHkJk8WbpBI') },
    { id: 'L3-54', image: driveImg('1So1cwRyuMuygigQdlDMfAjdMT1-BiA_7') },
    { id: 'L3-55', image: driveImg('1B55dFzo4LzXepjp0asUNZF5ABv4K6Cfl') },
    { id: 'L3-56', image: driveImg('1jdTRqcRrB_CTAzYlZCMBXF2EbkYHv0TM') },
    { id: 'L3-57', image: driveImg('1FzLqRTBVvBM0oaRcTrsKC72MFxliAHNd') },
    { id: 'L3-58', image: driveImg('1o-ICAZdPPlOkRE3qxiUQ3DeEJdermv9f') },
    { id: 'L3-59', image: driveImg('1vcycCgq-uBwGv429l6H6XmlMUhwVT4ZB') },
    { id: 'L3-60', image: driveImg('13CCHTbtjhlFV_YdohRAgDaeLvPGhVvgW') },
    { id: 'L3-61', image: driveImg('15E4uJn8tQzWuuXfUclnsR64xmLpWNBI7') },
    { id: 'L3-62', image: driveImg('1OqQYRThTFTxbJUiEPO4zuyfwj8uNYDgO') },
    { id: 'L3-63', image: driveImg('1Tlp2dJr6Ds21YJmTGj5mxt2sN9heiPuc') },
    { id: 'L3-64', image: driveImg('1W5izGkmONrUh4IsfxvzAEWKmaBkiqJbA') },
    { id: 'L3-65', image: driveImg('1y4P6Rd0x2_2bSI0JJ3PWv73NXqc-WJpA') },
    { id: 'L3-66', image: driveImg('1uJ55FrDnRBV6b1s5mRbZtyu7VM7Zu7r2') },
    { id: 'L3-67', image: driveImg('18bzgUgbvNWOTcdoZTtFp2LoTNBQGoqiq') },

    { id: 'L3-69', image: driveImg('1SeyNgV8twteDiLwxjJsGq5nAeUFlETNL') },
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
