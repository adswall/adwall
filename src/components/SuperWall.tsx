"use client";

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const AD_CLIENT = 'ca-pub-9411950027978678';
const AD_SLOTS = ['8997930843']; // Replace with actual Slot ID from your legacy code if different

// Span possibilities
const SPANS = ['col-span-1 row-span-1', 'col-span-2 row-span-1', 'col-span-1 row-span-2', 'col-span-2 row-span-2', 'col-span-3 row-span-2', 'col-span-2 row-span-3', 'col-span-3 row-span-3'];
const WEIGHTS = [5, 4, 4, 3, 2, 2, 1];

export default function SuperWall() {
    const t = useTranslations('SuperWall');
    const [enabled, setEnabled] = useState(false);
    const wallRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const [tiles, setTiles] = useState<any[]>([]);

    const toggle = () => {
        if (!enabled) {
            generateTiles();
            setEnabled(true);
            setTimeout(centerWall, 100);
        } else {
            setEnabled(false);
        }
    };

    const generateTiles = () => {
        // Generate deterministic set of tiles for client render
        const newTiles = [];
        const count = 200; // Total tiles
        let weightSum = WEIGHTS.reduce((a, b) => a + b, 0);

        for (let i = 0; i < count; i++) {
            let r = Math.floor(Math.random() * weightSum);
            let span = SPANS[0];
            for (let j = 0; j < WEIGHTS.length; j++) {
                if (r < WEIGHTS[j]) { span = SPANS[j]; break; }
                r -= WEIGHTS[j];
            }
            newTiles.push({ id: i, span, slot: AD_SLOTS[i % AD_SLOTS.length] });
        }
        setTiles(newTiles);

        // Push Ads
        setTimeout(() => {
            try {
                const ads = document.querySelectorAll('.superwall-ad');
                ads.forEach((el: any) => {
                    if (!el.dataset.pushed) {
                        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
                        (window as any).adsbygoogle.push({});
                        el.dataset.pushed = "1";
                    }
                });
            } catch (e) { }
        }, 500);
    };

    const centerWall = () => {
        if (wallRef.current && canvasRef.current) {
            wallRef.current.scrollIntoView({ block: 'center', inline: 'center' });
            // Fine tune scroll within the overflow container
            // Simplified for this demo
        }
    };

    return (
        <div className="my-10 border border-white/10 rounded-2xl overflow-hidden bg-[#0f172a]">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0b1220]">
                <div>
                    <h3 className="font-bold text-lg">{t('title')}</h3>
                    <p className="text-xs text-muted">{t('desc')}</p>
                </div>
                <button onClick={toggle} className="px-5 py-2.5 rounded-xl bg-accent text-white font-bold hover:brightness-110 transition">
                    {enabled ? t('disable') : t('enable')}
                </button>
            </div>

            {enabled && (
                <div ref={wallRef} className="relative w-full h-[80vh] overflow-auto cursor-grab active:cursor-grabbing">
                    <div ref={canvasRef} className="w-[400vw] h-[400vh] bg-[#0b1220] relative grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] auto-rows-[120px] gap-4 p-20">
                        {tiles.map(tile => (
                            <div key={tile.id} className={`relative bg-[#0f172a] border border-white/5 rounded-xl shadow-xl overflow-hidden ${tile.span}`}>
                                <div className="absolute top-2 right-2 text-[10px] text-muted tracking-widest uppercase opacity-50">Ad</div>
                                <ins className="adsbygoogle superwall-ad"
                                    style={{ display: 'block', width: '100%', height: '100%' }}
                                    data-ad-client={AD_CLIENT}
                                    data-ad-slot={tile.slot}
                                    data-ad-format="auto"
                                    data-full-width-responsive="true"></ins>
                            </div>
                        ))}

                        {/* Center Marker */}
                        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 shadow-[0_0_20px_rgba(255,0,0,0.5)]"></div>
                    </div>
                </div>
            )}
        </div>
    );
}
