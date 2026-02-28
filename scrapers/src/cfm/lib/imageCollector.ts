/**
 * Image collector for CFM lesson banner images.
 * Extracts and converts IIIF URLs to optimized size for web display.
 */

import { Page } from '@playwright/test';

/**
 * Convert IIIF image URL to optimized size for web display.
 * Transforms size parameter from dynamic values to fixed 1200px width.
 * IIIF pattern: /imgs/{id}/full/{size}/0/default
 *
 * @param url - IIIF image URL from churchofjesuschrist.org
 * @returns URL with size parameter set to 1200px width, proportional height
 */
export function convertToOptimizedSize(url: string): string {
  if (!url.includes('churchofjesuschrist.org/imgs')) {
    return url;
  }

  const decodedUrl = decodeURIComponent(url);
  const pattern = /(https?:\/\/[^/]+\/imgs\/[^/]+\/full\/)([^/]+)(\/0\/default.*)/;
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const match = decodedUrl.match(pattern);

  if (match) {
    const base = match[1];
    const suffix = match[3];
    return `${base}1200,${suffix}`;
  }

  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const originalMatch = url.match(pattern);
  if (originalMatch) {
    const base = originalMatch[1];
    const suffix = originalMatch[3];
    return `${base}1200,${suffix}`;
  }

  return url;
}

/**
 * Extract banner image URL from lesson page main content.
 * Searches for first IIIF image meeting size criteria (>200x100px).
 *
 * @param page - Playwright page instance
 * @returns IIIF URL if found, null otherwise
 */
export async function extractBannerImageUrl(page: Page): Promise<string | null> {
  try {
    const iiifUrl = await page.evaluate(() => {
      const images = Array.from(
        document.querySelectorAll('main img, article img, [role="main"] img')
      );

      for (const img of images) {
        const src = img.getAttribute('src') ?? img.getAttribute('data-src') ?? '';

        if (src.includes('churchofjesuschrist.org/imgs')) {
          const rect = img.getBoundingClientRect();
          if (rect.width > 200 && rect.height > 100) {
            return src.startsWith('//') ? `https:${src}` : src;
          }
        }
      }
      return null;
    });

    return iiifUrl;
  } catch {
    return null;
  }
}

export interface ImageCollectorResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

/**
 * Collect banner image URL from a CFM lesson page.
 *
 * @param page - Playwright page instance loaded with lesson content
 * @returns Result object containing IIIF URL or error message
 */
export async function collectImage(page: Page): Promise<ImageCollectorResult> {
  try {
    const iiifUrl = await extractBannerImageUrl(page);
    if (!iiifUrl) {
      return { success: false, error: 'Could not find banner image with IIIF URL' };
    }

    const optimizedUrl = convertToOptimizedSize(iiifUrl);
    console.log(`    IIIF URL: ${optimizedUrl}`);

    return { success: true, imageUrl: optimizedUrl };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message };
  }
}
