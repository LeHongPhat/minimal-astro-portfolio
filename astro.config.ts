// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: "static",
  prefetch: true,
  compressHTML: true,
  site: 'https://lehongphat.com',
  adapter: cloudflare(),
});