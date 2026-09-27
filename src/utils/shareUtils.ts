/**
 * Utility functions for public URL resolution and device connectivity.
 */

export const PUBLIC_APP_URL = 'https://ais-pre-ovf6slpthc75fethtyfkiv-129721295228.asia-east1.run.app';
export const OFFICIAL_WEBSITE_URL = 'https://www.kiterobotics.in';

/**
 * Returns the public URL that ANYONE can open on ANY device without requiring
 * Google AI Studio developer authentication.
 */
export function getPublicShareUrl(): string {
  if (typeof window === 'undefined') {
    return PUBLIC_APP_URL;
  }

  const currentHref = window.location.href;
  const currentOrigin = window.location.origin;

  // If running inside Google Cloud Run dev container (ais-dev-...),
  // replace with public preview (ais-pre-...) so other devices can open it freely.
  if (currentOrigin.includes('ais-dev-')) {
    return currentHref.replace('ais-dev-', 'ais-pre-');
  }

  // If on localhost or private container, return PUBLIC_APP_URL
  if (currentOrigin.includes('localhost') || currentOrigin.includes('127.0.0.1')) {
    return PUBLIC_APP_URL;
  }

  return currentHref;
}

/**
 * Generates a high-contrast QR code image URL for instant camera scanning on iOS and Android.
 */
export function getQrCodeImageUrl(url: string, size = 260): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    url
  )}&bgcolor=020617&color=38bdf8&margin=12&format=svg`;
}

/**
 * Safe clipboard copy with fallback
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below
    }
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}
