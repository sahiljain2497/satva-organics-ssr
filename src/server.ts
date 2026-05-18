import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');
const app = express();
const angularApp = new AngularNodeAppEngine({
  trustProxyHeaders: ['x-forwarded-for', 'x-forwarded-proto'],
});

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/** Redirect unknown HTML routes to the locale homepage (avoids Express "Cannot GET"). */
function homepageForRequest(url: string): string {
  const path = (url.split('?')[0] ?? '/').replace(/\/+$/, '') || '/';
  return path === '/hi' || path.startsWith('/hi/') ? '/hi/' : '/';
}

app.use((req, res) => {
  if (/\.[a-z0-9]+$/i.test(req.path)) {
    res.status(404).end();
    return;
  }
  res.redirect(302, homepageForRequest(req.url));
});

const isPM2 = process.env['PM2'] === 'true';
const isMain = isMainModule(import.meta.url);

if (isMain || isPM2) {
  const port = Number(process.env['PORT']) || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
