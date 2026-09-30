import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  // Arco Design 组件非 SSR 安全（官方 Arco Pro 同为纯客户端 SPA），
  // 关闭构建期预渲染，避免服务端渲染组件时崩溃。
  prerender: false,
} satisfies Config;
