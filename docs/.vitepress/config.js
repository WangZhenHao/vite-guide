import { defineConfig } from 'vitepress';

// refer https://vitepress.vuejs.org/config/introduction for details
export default defineConfig({
  base: '/vite-guide/',
  outDir: '../dist',
  lang: 'en-US',
  title: 'vite源码解读',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档仓库', link: 'https://github.com/WangZhenHao/vite-guide' },
      { text: 'vite地址', link: 'https://github.com/vitejs/vite' }
    ],

    sidebar: [
      {
        text: '准备工作',
        items: [
          { text: '环境搭建', link: '/start/env' }
        ],
      }
    ],
  },
});
