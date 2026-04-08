
/**
 * Web Analytics Utility for Cashlio Finance
 * Handles Google Analytics initialization and event tracking
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

/**
 * Initialize Google Analytics
 */
export const initGA = () => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
  });
};

/**
 * Track a page view
 */
export const trackPageView = (path: string) => {
  if (!GA_TRACKING_ID || !window.gtag) return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: path,
  });
};

/**
 * Track a custom event
 */
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (!GA_TRACKING_ID || !window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
