import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import vm from 'node:vm';
import ts from 'typescript';

const SITE_URL = (process.env.SITE_URL || 'https://satvaorganic.org').replace(/\/$/, '');

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const publicDir = path.join(projectRoot, 'public');

const STATIC_PATHS = [
  '/',
  '/blogs',
  '/contact',
  '/himachal-pradesh',
  '/jammu-kashmir',
  '/uttar-pradesh',
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function safeXml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function toLastmod(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function loadTsExports(tsFilePath) {
  const code = fs.readFileSync(tsFilePath, 'utf8');
  const out = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: tsFilePath,
  });
  const mod = { exports: {} };
  const dir = path.dirname(tsFilePath);
  const sandbox = {
    module: mod,
    exports: mod.exports,
    require: (id) => {
      const resolved = id.startsWith('.')
        ? path.resolve(dir, id.replace(/\.js$/, '.ts'))
        : id;
      if (resolved.includes('blog-post.model')) {
        return loadTsExports(path.join(dir, 'blog-post.model.ts'));
      }
      throw new Error(`Unexpected require() in ${tsFilePath}: ${id}`);
    },
    console,
    process,
  };
  vm.runInNewContext(out.outputText, sandbox, { filename: tsFilePath });
  return mod.exports;
}

function main() {
  ensureDir(publicDir);

  const blogsDataPath = path.join(projectRoot, 'src/app/blogs/blogs-en.data.ts');
  const { BLOGS_EN } = loadTsExports(blogsDataPath);

  const urls = [];

  for (const routePath of STATIC_PATHS) {
    urls.push({
      loc: routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${routePath}`,
      lastmod: null,
    });
  }

  for (const blog of BLOGS_EN ?? []) {
    if (!blog?.slug) continue;
    urls.push({
      loc: `${SITE_URL}/blogs/${blog.slug}`,
      lastmod: toLastmod(blog.date),
    });
  }

  const seen = new Set();
  const uniqueUrls = [];
  for (const u of urls) {
    if (seen.has(u.loc)) continue;
    seen.add(u.loc);
    uniqueUrls.push(u);
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    uniqueUrls
      .map((u) => {
        const lastmod = u.lastmod ? `<lastmod>${safeXml(u.lastmod)}</lastmod>` : '';
        return `  <url><loc>${safeXml(u.loc)}</loc>${lastmod}</url>`;
      })
      .join('\n') +
    `\n</urlset>\n`;

  const robots = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');

  console.log(`[sitemap] Wrote ${uniqueUrls.length} URLs to public/sitemap.xml`);
  console.log(`[sitemap] Wrote public/robots.txt`);
}

main();
