/**
 * Shared navigation utilities for CFM lesson scraping.
 * Handles browser initialization, page navigation, and cleanup.
 */

import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { execFileSync } from 'child_process';

let browser: Browser | null = null;
let context: BrowserContext | null = null;

/**
 * Find Brave browser executable path.
 * Checks common locations on Linux systems.
 */
function findBraveBinary(): string | null {
  const commonPaths = [
    '/usr/sbin/brave',
    '/usr/bin/brave',
    '/usr/bin/brave-browser',
    '/usr/local/bin/brave',
    '/usr/local/bin/brave-browser',
  ];

  try {
    const result = execFileSync('which', ['brave'], { encoding: 'utf-8' }).trim();
    if (result) return result;
  } catch {
    // which command failed, continue checking common paths
  }

  for (const browserPath of commonPaths) {
    if (fs.existsSync(browserPath)) {
      return browserPath;
    }
  }

  return null;
}

export interface LaunchOptions {
  headless?: boolean;
  slowMo?: number;
}

/**
 * Launch browser instance with Brave or Chromium.
 * Reuses existing browser if already launched.
 */
export async function launchBrowser(options: LaunchOptions = {}): Promise<Browser> {
  if (browser) return browser;

  const { headless = true, slowMo = 0 } = options;

  const bravePath = findBraveBinary();
  const launchOptions: Parameters<typeof chromium.launch>[0] = {
    headless,
    slowMo,
  };

  if (bravePath) {
    console.log(`Using Brave browser: ${bravePath}`);
    launchOptions.executablePath = bravePath;
  } else {
    console.log('Brave not found, using default Chromium');
  }

  browser = await chromium.launch(launchOptions);
  context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  return browser;
}

/**
 * Create a new page in the browser context.
 */
export async function createPage(): Promise<Page> {
  if (!context) {
    await launchBrowser();
  }
  if (!context) {
    throw new Error('Failed to create browser context');
  }
  return context.newPage();
}

/**
 * Navigate to a CFM lesson page and wait for content to load.
 */
export async function navigateToLesson(page: Page, url: string): Promise<void> {
  console.log(`  Navigating to: ${url}`);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  // Wait for main content to be visible
  try {
    await page.waitForSelector('article, main, [class*="content"]', { timeout: 10000 });
  } catch {
    // Content selector not found, continue anyway
  }
  // Additional wait for dynamic content
  await page.waitForTimeout(3000);
}

/**
 * Close the browser and cleanup resources.
 */
export async function closeBrowser(): Promise<void> {
  if (context) {
    await context.close();
    context = null;
  }
  if (browser) {
    await browser.close();
    browser = null;
  }
}

/**
 * Get the monorepo root directory.
 * Resolves from cfm/lib up 4 levels: cfm -> src -> scrapers -> root.
 */
export function getProjectRoot(): string {
  return path.resolve(import.meta.dirname, '../../../../');
}

/**
 * Get the path to weeks.json data file.
 */
export function getWeeksDataPath(): string {
  return path.join(getProjectRoot(), 'apps/web/src/study-plans/data/weeks.json');
}

/**
 * Get the path to the images directory.
 */
export function getImagesDir(): string {
  return path.join(getProjectRoot(), 'apps/web/public/assets/images');
}
