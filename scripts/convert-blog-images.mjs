/**
 * Convert PNG blog images under public/assets/blogs to WebP.
 *
 * Usage:
 *   node scripts/convert-blog-images.mjs              # convert only
 *   node scripts/convert-blog-images.mjs --update-refs # also patch blogs-*.data.ts
 *   node scripts/convert-blog-images.mjs --remove-png  # delete PNGs after success
 *
 * Requires: npm install (sharp is a devDependency)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const blogsDir = path.join(projectRoot, 'public', 'assets', 'blogs');
const QUALITY = 82;

const args = new Set(process.argv.slice(2));
const updateRefs = args.has('--update-refs');
const removePng = args.has('--remove-png');

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function loadSharp() {
  try {
    const sharp = (await import('sharp')).default;
    return sharp;
  } catch {
    console.error(
      'sharp is not installed. Run: npm install --save-dev sharp',
    );
    process.exit(1);
  }
}

function collectPngs(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    process.exit(1);
  }
  return fs
    .readdirSync(dir)
    .filter((name) => name.toLowerCase().endsWith('.png'))
    .map((name) => path.join(dir, name));
}

function updateBlogDataRefs() {
  const dataFiles = [
    path.join(projectRoot, 'src', 'app', 'blogs', 'blogs-en.data.ts'),
    path.join(projectRoot, 'src', 'app', 'blogs', 'blogs-hi.data.ts'),
  ];

  for (const file of dataFiles) {
    if (!fs.existsSync(file)) continue;
    const before = fs.readFileSync(file, 'utf8');
    const after = before.replaceAll(
      /(\/assets\/blogs\/[^'"]+)\.png/g,
      '$1.webp',
    );
    if (after !== before) {
      fs.writeFileSync(file, after);
      console.log(`Updated refs: ${path.relative(projectRoot, file)}`);
    }
  }
}

async function main() {
  const sharp = await loadSharp();
  const pngPaths = collectPngs(blogsDir);

  if (pngPaths.length === 0) {
    console.log('No PNG files found in public/assets/blogs');
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const pngPath of pngPaths) {
    const webpPath = pngPath.replace(/\.png$/i, '.webp');
    const before = fs.statSync(pngPath).size;

    await sharp(pngPath)
      .webp({ quality: QUALITY, effort: 4 })
      .toFile(webpPath);

    const after = fs.statSync(webpPath).size;
    totalBefore += before;
    totalAfter += after;

    const saved = ((1 - after / before) * 100).toFixed(1);
    console.log(
      `${path.basename(pngPath)} → ${path.basename(webpPath)}  ` +
        `${formatBytes(before)} → ${formatBytes(after)} (−${saved}%)`,
    );

    if (removePng) {
      fs.unlinkSync(pngPath);
    }
  }

  const totalSaved = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
  console.log(
    `\nTotal: ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)} (−${totalSaved}%)`,
  );

  if (removePng) {
    console.log(`Removed ${pngPaths.length} PNG file(s).`);
  } else {
    console.log('PNG originals kept. Re-run with --remove-png to delete them.');
  }

  if (updateRefs) {
    updateBlogDataRefs();
  } else {
    console.log(
      'Tip: run with --update-refs to patch blogs-en.data.ts and blogs-hi.data.ts',
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
