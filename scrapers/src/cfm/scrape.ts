/**
 * CFM Lesson Scraper - Collects images and excerpts from Come Follow Me lesson pages.
 *
 * This script is kept for reference and future use. It was used to populate
 * the image and excerpt fields in weeks.json.
 *
 * Usage:
 *   pnpm run cfm [options]
 *   or from monorepo root: pnpm --filter @soltana/scrapers cfm [options]
 *
 * Options:
 *   --images      Collect banner images only
 *   --excerpts    Collect excerpts only
 *   --all         Collect both images and excerpts (default)
 *   --week N      Process specific week only (1-52)
 *   --dry-run     Preview without writing files
 *   --fix-excerpts  Fix spacing in existing excerpts without re-scraping
 *   --headless    Run browser in headless mode (default: true)
 *   --visible     Run browser in visible mode for debugging
 */

import * as fs from 'fs';
import {
  launchBrowser,
  createPage,
  navigateToLesson,
  closeBrowser,
  getWeeksDataPath,
} from './lib/navigation.js';
import { collectImage } from './lib/imageCollector.js';
import { collectExcerpt, fixExistingExcerpt } from './lib/excerptCollector.js';

interface CfmLesson {
  title: string;
  link: string;
  reading: string;
  excerpt?: string;
  image?: string;
}

interface Week {
  week: number;
  startDate: string;
  endDate: string;
  dateLabel: string;
  cfm: CfmLesson;
  chapters: string[];
}

interface CliOptions {
  collectImages: boolean;
  collectExcerpts: boolean;
  fixExcerpts: boolean;
  specificWeek: number | null;
  dryRun: boolean;
  headless: boolean;
}

function parseArgs(): CliOptions {
  const args = process.argv.slice(2);

  const options: CliOptions = {
    collectImages: false,
    collectExcerpts: false,
    fixExcerpts: false,
    specificWeek: null,
    dryRun: false,
    headless: true,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--images':
        options.collectImages = true;
        break;
      case '--excerpts':
        options.collectExcerpts = true;
        break;
      case '--all':
        options.collectImages = true;
        options.collectExcerpts = true;
        break;
      case '--fix-excerpts':
        options.fixExcerpts = true;
        break;
      case '--week': {
        const weekNum = parseInt(args[++i], 10);
        if (isNaN(weekNum) || weekNum < 1 || weekNum > 52) {
          console.error('Invalid week number. Must be between 1 and 52.');
          process.exit(1);
        }
        options.specificWeek = weekNum;
        break;
      }
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--headless':
        options.headless = true;
        break;
      case '--visible':
        options.headless = false;
        break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
        break;
      default:
        console.error(`Unknown option: ${arg}`);
        printHelp();
        process.exit(1);
    }
  }

  // Default to collecting both if neither specified
  if (!options.collectImages && !options.collectExcerpts && !options.fixExcerpts) {
    options.collectImages = true;
    options.collectExcerpts = true;
  }

  return options;
}

function printHelp(): void {
  console.log(`
CFM Lesson Scraper - Collects images and excerpts from Come Follow Me lessons

Usage:
  pnpm run cfm [options]

Options:
  --images        Collect banner images only
  --excerpts      Collect excerpts only
  --all           Collect both images and excerpts (default)
  --week N        Process specific week only (1-52)
  --dry-run       Preview without writing files
  --fix-excerpts  Fix spacing in existing excerpts without re-scraping
  --headless      Run browser in headless mode (default)
  --visible       Run browser in visible mode for debugging
  --help, -h      Show this help message

Examples:
  pnpm run cfm                    # Collect both for all weeks
  pnpm run cfm --images           # Images only
  pnpm run cfm --excerpts         # Excerpts only
  pnpm run cfm --week 2 --dry-run # Test week 2
  pnpm run cfm --fix-excerpts     # Fix existing excerpts
`);
}

function fixExistingExcerpts(weeks: Week[], options: CliOptions): void {
  console.log('\n=== Fixing Existing Excerpts ===\n');

  let fixedCount = 0;

  for (const week of weeks) {
    if (options.specificWeek && week.week !== options.specificWeek) {
      continue;
    }

    if (!week.cfm.excerpt) {
      console.log(`Week ${week.week}: No excerpt to fix`);
      continue;
    }

    const original = week.cfm.excerpt;
    const fixed = fixExistingExcerpt(original);

    if (original !== fixed) {
      console.log(`Week ${week.week}: Fixed spacing issues`);
      if (!options.dryRun) {
        week.cfm.excerpt = fixed;
      }
      fixedCount++;
    } else {
      console.log(`Week ${week.week}: No changes needed`);
    }
  }

  console.log(`\nFixed ${fixedCount} excerpts`);
}

async function scrapeWeeks(weeks: Week[], options: CliOptions): Promise<void> {
  console.log('\n=== Starting CFM Lesson Scraper ===\n');
  console.log(
    `Collecting: ${options.collectImages ? 'images' : ''} ${options.collectExcerpts ? 'excerpts' : ''}`
  );
  console.log(`Dry run: ${options.dryRun}`);
  console.log(`Headless: ${options.headless}`);
  if (options.specificWeek) {
    console.log(`Processing week: ${options.specificWeek}`);
  }
  console.log();

  await launchBrowser({ headless: options.headless });

  let successCount = 0;
  let errorCount = 0;

  // Filter weeks to process
  const weeksToProcess = weeks.filter(
    (week) => !options.specificWeek || week.week === options.specificWeek
  );

  if (options.dryRun) {
    for (const week of weeksToProcess) {
      console.log(`\nWeek ${week.week}: ${week.cfm.title}`);
      console.log(`  URL: ${week.cfm.link}`);
      console.log('  [DRY RUN] Would process this week');
    }
    return;
  }

  // Process weeks concurrently in batches
  const BATCH_SIZE = 5; // Process 5 weeks at a time
  const batches: Week[][] = [];

  for (let i = 0; i < weeksToProcess.length; i += BATCH_SIZE) {
    batches.push(weeksToProcess.slice(i, i + BATCH_SIZE));
  }

  for (const batch of batches) {
    const promises = batch.map(async (week) => {
      const page = await createPage();

      try {
        console.log(`\nWeek ${week.week}: ${week.cfm.title}`);
        await navigateToLesson(page, week.cfm.link);

        // Collect image
        if (options.collectImages) {
          console.log(`  [Week ${week.week}] Collecting image...`);
          const imageResult = await collectImage(page);

          if (imageResult.success && imageResult.imageUrl) {
            week.cfm.image = imageResult.imageUrl;
            console.log(`    [ok] [Week ${week.week}] Image URL collected`);
          } else {
            console.log(`    [fail] [Week ${week.week}] Image failed: ${imageResult.error}`);
            return { success: false };
          }
        }

        // Collect excerpt
        if (options.collectExcerpts) {
          console.log(`  [Week ${week.week}] Collecting excerpt...`);
          const excerptResult = await collectExcerpt(page);

          if (excerptResult.success && excerptResult.excerpt) {
            week.cfm.excerpt = excerptResult.excerpt;
            console.log(
              `    [ok] [Week ${week.week}] Excerpt collected (${excerptResult.excerpt.length} chars)`
            );
          } else {
            console.log(`    [fail] [Week ${week.week}] Excerpt failed: ${excerptResult.error}`);
            return { success: false };
          }
        }

        return { success: true };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.log(`  [fail] [Week ${week.week}] Error: ${message}`);
        return { success: false };
      } finally {
        await page.close();
      }
    });

    // Wait for batch to complete
    const results = await Promise.all(promises);
    successCount += results.filter((r) => r.success).length;
    errorCount += results.filter((r) => !r.success).length;

    // Small delay between batches to be polite
    if (batches.indexOf(batch) < batches.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  await closeBrowser();

  console.log('\n=== Scraping Complete ===');
  console.log(`Successful: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  const options = parseArgs();
  const weeksPath = getWeeksDataPath();

  console.log('Loading weeks data...');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const weeks: Week[] = JSON.parse(fs.readFileSync(weeksPath, 'utf-8'));
  console.log(`Loaded ${weeks.length} weeks`);

  if (options.fixExcerpts) {
    fixExistingExcerpts(weeks, options);
  } else {
    await scrapeWeeks(weeks, options);
  }

  // Save updated data
  if (!options.dryRun) {
    console.log('\nSaving updated weeks.json...');
    fs.writeFileSync(weeksPath, JSON.stringify(weeks, null, 2) + '\n');
    console.log('Done!');
  } else {
    console.log('\n[DRY RUN] No files were modified');
  }
}

main().catch((error: unknown) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
