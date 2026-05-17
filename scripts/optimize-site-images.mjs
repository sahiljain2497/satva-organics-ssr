/**
 * Generate responsive WebP variants for home/header images.
 *
 * Usage:
 *   node scripts/optimize-site-images.mjs
 *
 * Sources: scripts/sources/ (or git-restored originals)
 * Outputs: public/
 *
 * Requires: npm install (sharp is a devDependency)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const sourcesDir = path.join(projectRoot, 'scripts', 'sources');
const publicDir = path.join(projectRoot, 'public');
const QUALITY = 80;

const VARIANTS = [
  {
    base: 'logo_icon',
    source: 'logo.png',
    widths: [120, 160],
    prepare: async (sharp, inputPath, tmpPath) => {
      await sharp(inputPath)
        .resize(136, 88, { fit: 'inside', withoutEnlargement: true })
        .png()
        .toFile(tmpPath);
      return tmpPath;
    },
  },
  { base: '1kg', source: '1kg.webp', widths: [216, 400] },
  { base: '50kg', source: '50kg.webp', widths: [216, 400, 800] },
  { base: 'hero', source: 'hero.webp', widths: [400, 640, 1024] },
];

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function loadSharp() {
  try {
    return (await import('sharp')).default;
  } catch {
    console.error('sharp is not installed. Run: npm install');
    process.exit(1);
  }
}

async function generateVariants(sharp, { base, source, widths, prepare }) {
  const inputPath = path.join(sourcesDir, source);
  if (!fs.existsSync(inputPath)) {
    console.warn(`Skip ${base}: missing source ${source}`);
    return;
  }

  let processPath = inputPath;
  let tmpPath = null;

  if (prepare) {
    tmpPath = path.join(sourcesDir, `${base}-prepared.png`);
    processPath = await prepare(sharp, inputPath, tmpPath);
    const iconPng = path.join(publicDir, 'logo_icon.png');
    fs.copyFileSync(processPath, iconPng);
    console.log(`Wrote ${path.relative(projectRoot, iconPng)}`);
  }

  for (const width of widths) {
    const outName = `${base}-${width}w.webp`;
    const outPath = path.join(publicDir, outName);

    await sharp(processPath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 4 })
      .toFile(outPath);

    const size = fs.statSync(outPath).size;
    const meta = await sharp(outPath).metadata();
    console.log(
      `  ${outName}  ${meta.width}x${meta.height}  ${formatBytes(size)}`,
    );
  }

  if (tmpPath && fs.existsSync(tmpPath)) {
    fs.unlinkSync(tmpPath);
  }
}

async function main() {
  const sharp = await loadSharp();

  if (!fs.existsSync(sourcesDir)) {
    fs.mkdirSync(sourcesDir, { recursive: true });
    console.error(
      `No sources in ${sourcesDir}. Restore from git:\n` +
        '  git show HEAD:1kg.webp > scripts/sources/1kg.webp\n' +
        '  (and 50kg.webp, hero.webp, logo.png)',
    );
    process.exit(1);
  }

  fs.mkdirSync(publicDir, { recursive: true });

  console.log('Generating responsive WebP variants...\n');

  for (const spec of VARIANTS) {
    console.log(spec.base);
    await generateVariants(sharp, spec);
    console.log('');
  }

  for (const legacy of ['1kg.webp', '50kg.webp', 'hero.webp']) {
    const legacyPath = path.join(publicDir, legacy);
    if (fs.existsSync(legacyPath)) {
      fs.unlinkSync(legacyPath);
      console.log(`Removed legacy full-size ${legacy}`);
    }
  }

  console.log('Done. Variants written to public/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
