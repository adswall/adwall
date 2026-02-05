import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Script from 'next/script';
import ConsentModal from '@/components/ConsentModal';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'Metadata' });
    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            canonical: `https://adwall.net/${locale === 'en' ? '' : locale + '/'}`,
            languages: {
                'en': 'https://adwall.net/',
                'fr': 'https://adwall.net/fr/',
            }
        }
    };
}

export default async function RootLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <head>
                <script dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'functionality_storage': 'granted'
            });
          `}} />
                <Script
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9411950027978678"
                    crossOrigin="anonymous"
                    strategy="lazyOnload"
                />
            </head>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>
                    <ConsentModal />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
