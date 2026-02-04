import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, Bebas_Neue } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';

import { ThemeProvider } from 'next-themes';

import { ConvexClientProvider } from '@/components/providers/convex-provider';
import { ClerkClientProvider } from '@/components/providers/clerk-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ComprehensiveSiteNavigationSchema } from '@/components/seo/site-navigation-schema';
import { BackToTopButton } from '@/components/ui/back-to-top-button';
import '@/app/globals.css';
import { Toaster } from '@/registry/new-york-v4/ui/sonner';

// Plus Jakarta Sans - Modern, friendly display font with character
const plusJakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-display',
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap',
});

// Inter - Clean, highly readable body text
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-body',
    weight: ['400', '500', '600'],
    display: 'swap',
});

// Bebas Neue - Bold industrial display font for hero headlines
const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    variable: '--font-industrial',
    weight: '400',
    display: 'swap',
});

const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

const SITE_URL = 'https://tradesmanfinance.co.uk';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'Tradesman Finance UK | Equipment Finance & Business Loans',
        template: '%s | Tradesman Finance UK',
    },
    description: 'Specialist equipment finance and business loans for UK tradesmen. Get funding for electricians, plumbers, builders and more. Quick decisions, competitive rates.',
    keywords: 'tradesman finance, equipment finance, business loans, trade finance UK, tradesman business loans, equipment leasing UK',
    authors: [{ name: 'Tradesman Finance UK' }],
    creator: 'Tradesman Finance UK',
    publisher: 'Tradesman Finance UK',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_GB',
        url: SITE_URL,
        siteName: 'Tradesman Finance UK',
        title: 'Tradesman Finance UK | Equipment Finance & Business Loans',
        description: 'Specialist equipment finance and business loans for UK tradesmen. Quick decisions, competitive rates, £25k-£1m available.',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Tradesman Finance UK - Equipment Finance for Tradesmen',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tradesman Finance UK | Equipment Finance & Business Loans',
        description: 'Specialist equipment finance and business loans for UK tradesmen. Quick decisions, competitive rates.',
        images: ['/images/og-image.jpg'],
    },
    alternates: {
        canonical: SITE_URL,
    },
    icons: {
        icon: [
            { url: '/icon.svg', type: 'image/svg+xml' },
        ],
        apple: '/apple-icon.png',
    },
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html suppressHydrationWarning lang='en'>
            <head>
                {/* Preconnect to critical third-party origins for faster resource loading */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* DNS prefetch for analytics and tracking (if used) */}
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
                <link rel="dns-prefetch" href="https://www.google-analytics.com" />

                {/* Viewport optimization for mobile performance */}
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

                {/* Theme color for browser chrome */}
                <meta name="theme-color" content="#1f2937" media="(prefers-color-scheme: dark)" />
                <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />

                {/* Prevent content-visibility issues */}
                <meta name="format-detection" content="telephone=no" />
            </head>
            <body
                className={`${plusJakarta.variable} ${inter.variable} ${bebasNeue.variable} ${geistMono.variable} font-body bg-background text-foreground overscroll-none antialiased`}>
                {/* Organization JSON-LD for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            '@id': `${SITE_URL}/#organization`,
                            name: 'Tradesman Finance UK',
                            url: SITE_URL,
                            logo: `${SITE_URL}/images/logo.png`,
                            description: 'Specialist equipment finance and business loans for UK tradesmen. We provide funding for electricians, plumbers, builders and more.',
                            contactPoint: {
                                '@type': 'ContactPoint',
                                telephone: '+44-800-123-4567',
                                contactType: 'customer service',
                                areaServed: 'GB',
                                availableLanguage: 'English',
                            },
                            sameAs: [],
                            address: {
                                '@type': 'PostalAddress',
                                addressCountry: 'GB',
                            },
                        }),
                    }}
                />
                {/* WebSite JSON-LD for SearchAction (sitelinks search box) */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            '@id': `${SITE_URL}/#website`,
                            name: 'Tradesman Finance UK',
                            url: SITE_URL,
                            description: 'Specialist equipment finance and business loans for UK tradesmen.',
                            publisher: {
                                '@id': `${SITE_URL}/#organization`,
                            },
                            inLanguage: 'en-GB',
                            potentialAction: {
                                '@type': 'SearchAction',
                                target: {
                                    '@type': 'EntryPoint',
                                    urlTemplate: `${SITE_URL}/trades/locations?search={search_term_string}`,
                                },
                                'query-input': 'required name=search_term_string',
                            },
                        }),
                    }}
                />
                {/* SiteNavigationElement JSON-LD for navigation structure */}
                <ComprehensiveSiteNavigationSchema baseUrl={SITE_URL} />
                <ClerkClientProvider>
                    <ConvexClientProvider>
                        <ThemeProvider attribute='class' defaultTheme='light'>
                            <div className="relative flex min-h-screen flex-col">
                                <SiteHeader />
                                <main className="flex-1">{children}</main>
                                <SiteFooter />
                            </div>
                            <BackToTopButton />
                            <Toaster />
                        </ThemeProvider>
                    </ConvexClientProvider>
                </ClerkClientProvider>

                {/* CallPage Widget */}
                <Script id="callpage-widget" strategy="afterInteractive">
                    {`
                        var loadBabel = function(url, callback) {
                            var script = document.createElement('script');
                            script.async = true;
                            if (script.readyState) {
                                script.onreadystatechange = function() {
                                    if (script.readyState == 'loaded' || script.readyState == 'complete') {
                                        script.onreadystatechange = null;
                                        callback(window, document);
                                    }
                                };
                            } else {
                                script.onload = function() {
                                    callback(window, document);
                                };
                            }
                            script.src = url;
                            document.head.appendChild(script);
                        };

                        var getCookie = function(cname) {
                            var objToday = new Date();
                            var version = objToday.toISOString().split('T')[0].split('-').join('');
                            var name = cname + '=';
                            var decodedCookie = decodeURIComponent(document.cookie);
                            var cookieArray = decodedCookie.split(';');
                            for (var i = 0; i < cookieArray.length; i++) {
                                var cookie = cookieArray[i];
                                cookie = cookie.trim();
                                if (cookie.indexOf(name) == 0) {
                                    return cookie.substring(name.length, cookie.length);
                                }
                            }
                            return version;
                        };

                        var loadWidget = function(window, document) {
                            var __cp = {"id":"6kvpZV1h25hyidbQql4wBxi4YSPLVA5eJSx0kMzQigc","version":"1.1"};
                            var cp = document.createElement('script');
                            cp.type = 'text/javascript';
                            cp.async = true;
                            cp.src = "++cdn-widget.callpage.io+build+js+callpage.js".replace(/[+]/g, '/').replace(/[=]/g, '.') + '?v=' + getCookie('callpage-widget-version');
                            var s = document.getElementsByTagName('script')[0];
                            s.parentNode.insertBefore(cp, s);
                            if (window.callpage) {
                                alert('You could have only 1 CallPage code on your website!');
                            } else {
                                window.callpage = function(method) {
                                    if (method == '__getQueue') {
                                        return this.methods;
                                    } else if (method) {
                                        if (typeof window.callpage.execute === 'function') {
                                            return window.callpage.execute.apply(this, arguments);
                                        } else {
                                            (this.methods = this.methods || []).push({arguments: arguments});
                                        }
                                    }
                                };
                                window.callpage.__cp = __cp;
                                window.callpage('api.button.autoshow');
                            }
                        };

                        loadBabel('https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.12.1/polyfill.min.js', function() {
                            return loadWidget(window, document);
                        });
                    `}
                </Script>
            </body>
        </html>
    );
};

export default Layout;
