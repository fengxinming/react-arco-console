import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import mockData from "vite-plugin-mock-data";
import { defineConfig } from "vite";
import { vitePluginForArco } from '@arco-plugins/vite-react';
import {resolve,dirname} from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    mockData({ routes: "./mock" }),
    vitePluginForArco({
      // theme: '@arco-themes/react-console'
    }),
    tailwindcss(),
    reactRouter(),
  ],
  ssr: {
    noExternal: ["@arco-design/web-react"],
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      'dayjs/locale/en': resolve(
        __dirname,
        "app/locales/dayjs-locale-en.ts"
      ),
      'dayjs/locale/zh-cn': resolve(
        __dirname,
        "app/locales/dayjs-locale-zh-CN.ts"
      )
    },
  }
});
