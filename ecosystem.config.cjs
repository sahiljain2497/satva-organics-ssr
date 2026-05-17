/**
 * PM2 ecosystem for Satva Organics Angular SSR.
 *
 * Usage:
 *   cd satva-angular && npm ci && npm run build
 *   pm2 start ecosystem.config.cjs
 *   pm2 save && pm2 startup
 */
const path = require('node:path');

const appRoot = __dirname;

module.exports = {
  apps: [
    {
      name: 'satva-ssr',
      cwd: appRoot,
      script: path.join(appRoot, 'dist/satva-angular/server/server.mjs'),
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PM2: 'true',
        PORT: 4000,
      },
      error_file: './logs/satva-ssr-error.log',
      out_file: './logs/satva-ssr-out.log',
      merge_logs: true,
      time: true,
    },
  ],
};
