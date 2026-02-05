"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function ConsentModal() {
    const t = useTranslations('Consent');
    const [isOpen, setIsOpen] = useState(false);
    const [showBanner, setShowBanner] = useState(false);

    // Consent State
    const [adsMode, setAdsMode] = useState<'off' | 'safe' | 'personalized'>('safe');
    const [analytics, setAnalytics] = useState(false);
    const [functional, setFunctional] = useState(true);

    useEffect(() => {
        // Check saved
        try {
            const saved = localStorage.getItem('adwall_consent_v3');
            if (!saved) {
                setShowBanner(true);
            } else {
                applyConsent(JSON.parse(saved));
            }
        } catch (e) { }

        // Listen for open
        window.addEventListener('open-consent', () => setIsOpen(true));
        return () => window.removeEventListener('open-consent', () => setIsOpen(true));
    }, []);

    const applyConsent = (c: any) => {
        // GTAG updates
        const updates = {
            'analytics_storage': c.analytics ? 'granted' : 'denied',
            'functionality_storage': c.functional ? 'granted' : 'denied',
            'ad_storage': (c.adsMode === 'off') ? 'denied' : 'granted',
            'ad_user_data': (c.adsMode === 'personalized') ? 'granted' : 'denied',
            'ad_personalization': (c.adsMode === 'personalized') ? 'granted' : 'denied'
        };
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('consent', 'update', updates);
        }
    };

    const save = (mode: 'off' | 'safe' | 'personalized') => {
        const c = { adsMode: mode, analytics, functional };
        localStorage.setItem('adwall_consent_v3', JSON.stringify(c));
        applyConsent(c);
        setIsOpen(false);
        setShowBanner(false);
        window.location.reload(); // Reload to apply ad scripts cleanly
    };

    if (!showBanner && !isOpen) return null;

    return (
        <>
            {/* Banner */}
            {showBanner && !isOpen && (
                <div className="fixed bottom-4 left-4 right-4 bg-[#111827] text-white p-5 rounded-2xl shadow-2xl z-50 flex flex-col md:flex-row gap-4 items-center justify-between border border-white/10">
                    <div className="text-sm">{t('bannerText')}</div>
                    <div className="flex gap-3 shrink-0">
                        <button onClick={() => save('off')} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-semibold">{t('reject')}</button>
                        <button onClick={() => setIsOpen(true)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-semibold">{t('manage')}</button>
                        <button onClick={() => save('safe')} className="px-4 py-2 rounded-lg bg-[#38bdf8] text-[#0b1220] hover:bg-[#60a5fa] text-sm font-bold">{t('acceptSafe')}</button>
                    </div>
                </div>
            )}

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white text-slate-900 w-full max-w-2xl rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-2">{t('modalTitle')}</h2>
                        <p className="text-slate-500 text-sm mb-6">{t('modalDesc')}</p>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold mb-3">{t('secAds')}</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                                        <input type="radio" name="adsMode" checked={adsMode === 'off'} onChange={() => setAdsMode('off')} />
                                        <div>
                                            <div className="font-semibold">{t('optNoAds')}</div>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 bg-blue-50/50 border-blue-200">
                                        <input type="radio" name="adsMode" checked={adsMode === 'safe'} onChange={() => setAdsMode('safe')} />
                                        <div>
                                            <div className="font-semibold text-blue-900">{t('optSafe')}</div>
                                            <div className="text-xs text-blue-700">{t('optSafeDesc')}</div>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                                        <input type="radio" name="adsMode" checked={adsMode === 'personalized'} onChange={() => setAdsMode('personalized')} />
                                        <div>
                                            <div className="font-semibold">{t('optPerso')}</div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="py-4 border-t border-b border-slate-100 flex items-center justify-between">
                                <div>
                                    <div className="font-bold">{t('secAnalytics')}</div>
                                    <div className="text-xs text-slate-500">{t('secAnalyticsDesc')}</div>
                                </div>
                                <input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} className="w-5 h-5 accent-blue-600" />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-3">
                            <button onClick={() => setIsOpen(false)} className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700">{t('close')}</button>
                            <button onClick={() => save(adsMode)} className="px-5 py-2.5 rounded-xl bg-[#38bdf8] hover:bg-[#60a5fa] text-[#0b1220] font-bold">{t('save')}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
