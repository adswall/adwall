import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: '#0b1220',
                ink: '#e2e8f0',
                muted: '#9aa7b7',
                brand: '#38bdf8',
                card: '#0f172a',
                line: '#1e293b',
                accent: '#60a5fa',
            },
        },
    },
    plugins: [],
};
export default config;
