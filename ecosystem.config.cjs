/**
 * PM2 ecosystem for Satva Organics Angular SSR.
 *
 * Usage (from repo root):
 *   cd satva-angular && npm ci && npm run build
 *   pm2 start ecosystem.config.cjs
 *   pm2 save && pm2 startup
 */
module.exports = {
  apps: [
    {
      name: 'satva-ssr',
      cwd: './satva-angular',
      script: 'dist/satva-angular/server/server.mjs',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
      error_file: './logs/satva-ssr-error.log',
      out_file: './logs/satva-ssr-out.log',
      merge_logs: true,
      time: true,
    },
  ],
};
