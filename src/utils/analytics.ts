// Google Analytics utility functions

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
    dataLayer?: unknown[]
  }
}

// Get Google Analytics ID from environment variable
// In Vite, use VITE_ prefix for public env vars
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''

/**
 * Initialize Google Analytics
 * Should be called once when the app loads
 */
export function initGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') {
    return
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer?.push(arguments)
  }

  // Set initial timestamp
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  })
}

/**
 * Track a page view
 * @param path - The path of the page
 * @param title - Optional page title
 */
export function trackPageView(path: string, title?: string) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) {
    return
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title,
  })
}

/**
 * Track a custom event
 * @param eventName - Name of the event
 * @param eventParams - Additional event parameters
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) {
    return
  }

  window.gtag('event', eventName, eventParams)
}

/**
 * Check if Google Analytics is enabled
 */
export function isGoogleAnalyticsEnabled(): boolean {
  return !!GA_MEASUREMENT_ID
}

