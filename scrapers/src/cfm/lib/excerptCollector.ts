/**
 * Excerpt collector for CFM lesson introductions.
 * Handles text extraction with proper spacing around anchor tags and scripture references.
 */

import { Page } from '@playwright/test';

/**
 * Clean excerpt text by handling anchor tags and formatting issues.
 * Fixes missing spaces between words and scripture references.
 */
export function cleanExcerptText(html: string): string {
  let text = html;

  // Replace anchor tags with their text content, adding spaces around them
  text = text.replace(/<a[^>]*>([^<]*)<\/a>/g, ' $1 ');

  // Replace other inline tags that might cause spacing issues
  text = text.replace(/<(em|i|strong|b|span)[^>]*>([^<]*)<\/\1>/g, ' $2 ');

  // Remove any remaining HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&rsquo;/g, '\u2019'); // Right single quote
  text = text.replace(/&lsquo;/g, '\u2018'); // Left single quote
  text = text.replace(/&rdquo;/g, '\u201D'); // Right double quote
  text = text.replace(/&ldquo;/g, '\u201C'); // Left double quote
  text = text.replace(/&mdash;/g, '\u2014'); // Em dash
  text = text.replace(/&ndash;/g, '\u2013'); // En dash

  // Fix spacing issues with "see" references (e.g., "seeGenesis" -> "see Genesis")
  text = text.replace(/\(see([A-Z])/g, '(see $1');
  text = text.replace(/see([A-Z][a-z]+\s+\d)/g, 'see $1');

  // Fix spacing issues with scripture references after words
  // Pattern: word immediately followed by book name (e.g., "thereforeGenesis")
  text = text.replace(/([a-z])([A-Z][a-z]+\s+\d+[:\d-]*)/g, '$1 $2');

  // Fix spacing after closing parenthesis followed by capital letter
  text = text.replace(/\)([A-Z])/g, ') $1');

  // Fix spacing before opening parenthesis
  text = text.replace(/([a-z])\(/g, '$1 (');

  // Fix specific common issues
  text = text.replace(/therebeforethis/gi, 'there before this');
  text = text.replace(/Andwhydid/gi, 'And why did');

  // Normalize multiple spaces to single space
  text = text.replace(/\s+/g, ' ');

  // Trim leading/trailing whitespace
  text = text.trim();

  return text;
}

/**
 * Extract the introduction paragraph from a CFM lesson page.
 * Looks for the first substantial paragraph after the title.
 */
export async function extractExcerpt(page: Page): Promise<string | null> {
  try {
    const excerpt = await page.evaluate(() => {
      // Common selectors for the intro paragraph
      const selectors = [
        'article p:first-of-type',
        '.body-block p:first-of-type',
        '[class*="content"] p:first-of-type',
        'main p:first-of-type',
        'section p:first-of-type',
      ];

      for (const selector of selectors) {
        const elements = Array.from(document.querySelectorAll(selector));
        for (const el of elements) {
          // Get the HTML to preserve structure for cleaning
          const html = el.innerHTML;
          const text = el.textContent.trim();

          // Skip very short paragraphs (navigation, labels, etc.)
          if (text.length > 100) {
            return html;
          }
        }
      }

      // Fallback: Find the first paragraph with substantial content
      const allParagraphs = Array.from(document.querySelectorAll('p'));
      for (const p of allParagraphs) {
        const html = p.innerHTML;
        const text = p.textContent.trim();

        // Skip paragraphs that are too short or appear to be headers/nav
        if (
          text.length > 100 &&
          !p.closest('header') &&
          !p.closest('nav') &&
          !p.closest('footer')
        ) {
          return html;
        }
      }

      return null;
    });

    if (excerpt) {
      return cleanExcerptText(excerpt);
    }

    return null;
  } catch (error) {
    console.error('    Error extracting excerpt:', error);
    return null;
  }
}

export interface ExcerptCollectorResult {
  success: boolean;
  excerpt?: string;
  error?: string;
}

/**
 * Collect excerpt from a CFM lesson page.
 */
export async function collectExcerpt(page: Page): Promise<ExcerptCollectorResult> {
  try {
    const excerpt = await extractExcerpt(page);

    if (!excerpt) {
      return { success: false, error: 'Could not find introduction paragraph' };
    }

    // Validate excerpt quality
    if (excerpt.length < 50) {
      return { success: false, error: 'Excerpt too short' };
    }

    console.log(`    Excerpt: ${excerpt.substring(0, 80)}...`);
    return { success: true, excerpt };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message };
  }
}

/**
 * Re-cleans excerpt text to fix spacing issues.
 */
export function fixExistingExcerpt(excerpt: string): string {
  let fixed = excerpt;

  // Fix spacing issues with "see" references
  fixed = fixed.replace(/\(see([A-Z])/g, '(see $1');
  fixed = fixed.replace(/see([A-Z][a-z]+\s+\d)/g, 'see $1');

  // Fix spacing issues with scripture references after words
  fixed = fixed.replace(/([a-z])([A-Z][a-z]+\s+\d+[:\d-]*)/g, '$1 $2');

  // Fix spacing after closing parenthesis
  fixed = fixed.replace(/\)([A-Z])/g, ') $1');

  // Fix spacing before opening parenthesis
  fixed = fixed.replace(/([a-z])\(/g, '$1 (');

  // Fix specific common issues
  fixed = fixed.replace(/therebeforethis/gi, 'there before this');
  fixed = fixed.replace(/Andwhydid/gi, 'And why did');

  // Normalize whitespace
  fixed = fixed.replace(/\s+/g, ' ').trim();

  return fixed;
}
