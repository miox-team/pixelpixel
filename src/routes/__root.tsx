import { HeadContent, Scripts, createRootRoute, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useEffect } from 'react'

import appCss from '../styles.css?url'
import { ThemeProvider } from '../contexts/ThemeContext'
import { initGoogleAnalytics, isGoogleAnalyticsEnabled, trackPageView } from '../utils/analytics'

const SITE_URL = 'https://pixelpixel.app'
const SITE_NAME = 'PixelPixel'
const SITE_DESCRIPTION =
  'Privacy-first image editor for the modern web. Blur plates, faces, and sensitive data without uploading a single byte. Client-side secure, zero latency, and completely free.'
const SITE_TITLE = 'PixelPixel - The privacy-first image editor for the modern web'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=5',
      },
      {
        name: 'description',
        content: SITE_DESCRIPTION,
      },
      {
        name: 'keywords',
        content:
          'image editor, pixelate, blur images, privacy, client-side, image processing, photo editor, pixel art, image anonymization, privacy tools',
      },
      {
        name: 'author',
        content: 'Miox',
      },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      {
        name: 'googlebot',
        content: 'index, follow',
      },
      {
        name: 'theme-color',
        content: '#000000',
      },
      {
        name: 'color-scheme',
        content: 'light dark',
      },
      // Open Graph / Facebook
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: SITE_URL,
      },
      {
        property: 'og:title',
        content: SITE_TITLE,
      },
      {
        property: 'og:description',
        content: SITE_DESCRIPTION,
      },
      {
        property: 'og:image',
        content: `${SITE_URL}/logo512.png`,
      },
      {
        property: 'og:image:width',
        content: '512',
      },
      {
        property: 'og:image:height',
        content: '512',
      },
      {
        property: 'og:image:alt',
        content: 'PixelPixel Logo - Privacy-first image editor',
      },
      {
        property: 'og:site_name',
        content: SITE_NAME,
      },
      {
        property: 'og:locale',
        content: 'en_US',
      },
      // Twitter Card
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:url',
        content: SITE_URL,
      },
      {
        name: 'twitter:title',
        content: SITE_TITLE,
      },
      {
        name: 'twitter:description',
        content: SITE_DESCRIPTION,
      },
      {
        name: 'twitter:image',
        content: `${SITE_URL}/logo512.png`,
      },
      {
        name: 'twitter:image:alt',
        content: 'PixelPixel Logo - Privacy-first image editor',
      },
      {
        name: 'twitter:creator',
        content: '@miox',
      },
      // Apple
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: SITE_NAME,
      },
      {
        title: SITE_TITLE,
      },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      ...(isGoogleAnalyticsEnabled()
        ? [
            {
              rel: 'preconnect',
              href: 'https://www.googletagmanager.com',
            },
            {
              rel: 'preconnect',
              href: 'https://www.google-analytics.com',
            },
          ]
        : []),
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'canonical',
        href: SITE_URL,
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/logo.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/logo192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        href: '/logo512.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '192x192',
        href: '/favicon.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '512x512',
        href: '/favicon.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
    scripts: isGoogleAnalyticsEnabled()
      ? [
          {
            src: `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID}`,
            async: true,
          },
        ]
      : [],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  // Initialize Google Analytics on mount
  useEffect(() => {
    if (isGoogleAnalyticsEnabled()) {
      initGoogleAnalytics()
    }
  }, [])

  // Track page views on route changes
  useEffect(() => {
    if (isGoogleAnalyticsEnabled()) {
      trackPageView(location.pathname, document.title)
    }
  }, [location.pathname])

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    author: {
      '@type': 'Organization',
      name: 'Miox',
      url: 'https://miox.io',
    },
    featureList: [
      'Client-side image processing',
      'Privacy-first design',
      'No data uploads',
      'Pixelate and blur images',
      'Batch processing',
      'Zero latency',
    ],
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
    screenshot: `${SITE_URL}/logo512.png`,
  }

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            <!-- Google Tag Manager -->

<!-- End Google Tag Manager -->
              (function() {
                const saved = localStorage.getItem('theme');
                if (saved === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  // Default to light theme
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
