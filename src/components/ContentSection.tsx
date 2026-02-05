import { useTranslations } from 'next-intl';

export default function ContentSection() {
    const t = useTranslations('Content');

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <article className="col-span-2 bg-[#0f172a] border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-[#38bdf8]">What is AdWall?</h2>
                <p className="mb-4 text-slate-300">
                    AdWall is an interactive experiment exploring the aesthetics of digital advertising.
                    Inspired by the "Million Dollar Homepage" era, it re-imagines the banner ad not as an annoyance,
                    but as a tile in a massive, collaborative digital mosaic.
                </p>
                <p className="text-slate-300">
                    By enabling the <strong>SuperWall</strong>, you enter a vast 800vw canvas where algorithms determine layout,
                    but chance determines content. It serves as a transparent museum of current tracking and targeting technologies.
                </p>
            </article>

            <aside className="space-y-6">
                <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-2 text-[#60a5fa]">Tech Stack</h3>
                    <ul className="text-sm space-y-2 text-slate-400">
                        <li>• Next.js 14 (App Router)</li>
                        <li>• Tailwind CSS</li>
                        <li>• Google Consent Mode v2</li>
                        <li>• Virtualized Grid Logic</li>
                    </ul>
                </div>

                <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-2 text-[#60a5fa]">Privacy First</h3>
                    <p className="text-sm text-slate-400">
                        We default to "Safe Ads" (non-personalized). No tracking cookies are set unless you explicitly opt-in.
                    </p>
                </div>
            </aside>
        </div>
    );
}
