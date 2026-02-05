"use client";

import { useTranslations } from 'next-intl';
import ContentSection from '@/components/ContentSection';
import SuperWall from '@/components/SuperWall';
import { Link } from '@/navigation';

export default function Home() {
    const t = useTranslations('App');

    const openSettings = (e: any) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-consent'));
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0b1220]/70 border-b border-white/10">
                <div className="max-w-[1100px] mx-auto p-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 text-ink no-underline hover:text-brand transition">
                        <span className="text-2xl">🧱</span>
                        <span className="font-bold text-lg">{t('title')}</span>
                    </Link>
                    <nav className="flex gap-4 text-sm font-semibold opacity-80">
                        <button onClick={openSettings} className="hover:text-brand transition">{t('cookieSettings')}</button>
                    </nav>
                </div>
            </header>

            <main className="flex-1 max-w-[1100px] mx-auto p-4 w-full">
                <section className="my-8 text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
                        {t('heroTitle')}
                    </h1>
                    <p className="text-muted text-lg">{t('heroDesc')}</p>
                </section>

                {/* Standard Ad Slot */}
                <div className="my-8 p-4 border border-dashed border-white/10 rounded-xl bg-[#0f172a] flex items-center justify-center min-h-[120px] text-xs text-muted">
                    <div className="text-center">
                        <span>Adaptive Ad Slot</span>
                        <ins className="adsbygoogle"
                            style={{ display: 'block', width: '100%', minWidth: '300px', height: '100px' }}
                            data-ad-client="ca-pub-9411950027978678"
                            data-ad-slot="PASTE_YOUR_AD_SLOT_ID"
                            data-ad-format="auto"
                            data-full-width-responsive="true"></ins>
                    </div>
                </div>

                <ContentSection />

                <SuperWall />

            </main>

            <footer className="border-t border-white/10 mt-12 py-8 text-center text-sm text-muted">
                <p>{t('footerRights')} · <Link href="/privacy" className="hover:text-brand">{t('footerPrivacy')}</Link> · <button onClick={openSettings} className="hover:text-brand">{t('cookieSettings')}</button></p>
            </footer>
        </div>
    );
}
