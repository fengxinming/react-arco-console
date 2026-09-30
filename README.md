# react-arco-console

基于 React Router 8 Framework 模式（SPA，`ssr: false`）+ Arco Design 的中后台管理模板。界面与功能参考 [Arco Design Pro](https://react-pro.arco.design/)。

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | React 19 + React Router 8（framework 模式，`ssr: false`） |
| 构建 | Vite 8 |
| UI | `@arco-design/web-react` + 主题 `@arco-themes/react-console`，样式 Stylus / Less module + Tailwind |
| 状态 | Zustand（客户端状态）+ `@tanstack/react-query`（服务端状态） |
| 请求 | axios（`app/commons/request.ts` 统一封装拦截） |
| i18n | i18next + react-i18next |
| 图表 | `@ant-design/charts` |
| Mock | `vite-plugin-mock-data`（`mock/` 目录） |
| 质量 | TypeScript、oxlint、oxfmt |

## 快速开始

```bash
pnpm install
pnpm dev        # 默认 http://localhost:5173，终端输出为准
```

登录密码统一为 `admin`：账号填 `user` 登录为普通权限，其他任意账号为 admin 全量权限（mock `user.ts`）。

## 脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 开发服务器（HMR） |
| `pnpm build` | 生产构建（`build/client` + `build/server`） |
| `pnpm start` | 运行生产构建（react-router-serve） |
| `pnpm typecheck` | 路由类型生成 + tsc 检查 |
| `pnpm lint` / `pnpm format` | oxlint / oxfmt |

## 目录结构

```
app/
├── api/                # 纯请求函数（不含 hooks）
├── commons/            # 工具层：request(axios封装) / auth(权限判断) / layout(菜单过滤·trail) / html(主题落DOM) / queryClient
├── components/         # 全局组件：AppProviders / AppEffects / AppMenu / NavigationProgress / PermissionWrapper
├── config/             # menu.tsx（菜单+权限单一数据源）/ settings.ts / types.ts
├── hooks/api/          # react-query hooks（useAuth / useUser / useSearchTable / useNotice / useMonitor）
├── layouts/ConsoleLayout/   # 后台布局：HeaderBar / SiderNav / TabBar / BreadcrumbNav / SettingDrawer
├── locales/            # i18n 文案（zh / en）+ dayjs locale SSR 补丁（勿删）
├── routes/             # 页面，目录命名与菜单 path 对齐（如 list/search-table/）
├── store/              # Zustand：user / layout(菜单·tabs) / settings(主题·布局设置)
├── root.tsx            # 根布局 + clientLoader（persist 配置还原、登录态恢复）
└── routes.ts           # 由 menu 配置生成的路由表
mock/                   # vite-plugin-mock-data 接口模拟
```

## 核心机制

**菜单驱动路由**：`app/config/menu.tsx` 是唯一数据源——菜单项含 `path / name(i18n key) / icon / view(页面文件) / visible(是否进左侧导航) / per(所需权限)`。`app/routes.ts` 遍历该配置生成路由，侧边栏 / 顶部菜单 / 面包屑 / TabBar 全部由它派生。**加页面不需要手写路由。**

**权限链路**：登录接口（mock `/api/login`）下发 `permissions` → Zustand user store → `commons/layout.ts` 按菜单 `per` 字段过滤可见菜单 → 布局守卫拦截越权路径；组件级用 `<PermissionWrapper per={[...]} backup={...}>` 控制。权限判断在 `commons/auth.ts`。

**状态分层**：跨页面共享态（用户 / 主题 / 菜单 / tabs）进 Zustand；页面级服务端数据用 react-query（`api/` 写纯函数，`hooks/api/` 写 hook），不塞 Zustand。

**导航进度条**：`components/NavigationProgress` 基于 nprogress + `useNavigation()`，颜色跟随主题色（`app.styl` 覆盖 `--primary-6`）。

## 部署

项目自带多阶段 `Dockerfile`（node:24-alpine，build → react-router-serve）：

```bash
docker build -t react-arco-console .
docker run -p 3000:3000 react-arco-console
```

本地不用 Docker 时，`pnpm build` 后 `pnpm start` 直接跑生产构建。

## 新增页面 SOP

1. `app/config/menu.tsx` 加菜单项（`path / name / icon / view / per`）
2. `app/routes/<path>/index.tsx` 写页面；样式用同目录 `style.module.styl`，类型抽 `types.ts`
3. `app/locales/zh.ts` + `en.ts` 补文案（禁止硬编码中英文）
4. `mock/` 加接口 → `app/api/` 加请求函数 → `app/hooks/api/` 加 query hook
5. `pnpm typecheck`，浏览器验证布局 / i18n / 控制台无报错
