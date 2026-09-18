// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import decap from 'astro-decap';

// https://astro.build/config
export default defineConfig({
  output: "static",
  prefetch: true,
  compressHTML: true,
  site: 'https://lehongphat.com', // Thêm tên miền của bạn
  integrations: [
    decap({
      cmsConfig: {
        backend: {
          name: 'github',
          repo: 'LeHongPhat/minimal-astro-portfolio', // Đổi thành repo mới
          branch: 'main',
          base_url: 'https://decap-proxy-lehongphat.lehongphat2009.workers.dev', // Worker proxy cũ
          auth_endpoint: '/auth',
        },
        media_folder: 'public/images',
        public_folder: '/images',
        collections: [
          {
            label: 'Bài viết Blog',
            name: 'blog',
            folder: 'src/content/blog', // Đúng thư mục template đang dùng
            create: true,
            slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
            fields: [
              { label: 'Tiêu đề', name: 'title', widget: 'string' },
              { label: 'Mô tả', name: 'description', widget: 'text' },
              { label: 'Ngày đăng', name: 'publishedAt', widget: 'datetime' }, // Template dùng publishedAt
              { label: 'Bản nháp', name: 'draft', widget: 'boolean', required: false, default: false },
              { label: 'Nội dung', name: 'body', widget: 'markdown' },
            ],
          },
          // Bạn có thể thêm các collection khác (notes, projects...) sau nếu muốn
        ],
      },
    }),
  ],
  adapter: cloudflare(), // Thêm adapter để deploy lên Cloudflare Pages
}); 