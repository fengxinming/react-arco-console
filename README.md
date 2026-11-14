# react-arco-console

基于 React 19 + React Router 8 Framework Mode（SPA，`ssr: false`）+ Arco Design 的中后台管理模板，界面参考 [Arco Design Pro](https://react-pro.arco.design/)。

路由、菜单、权限、Tab、面包屑全部由同一份菜单配置派生，内置 Mock 数据，clone 后 `pnpm install && pnpm dev` 即可跑通，可作为新项目的起点。

## 技术栈

| 类别 | 选型 | 说明 |
|------|------|------|
| 运行时 | React 19 | |
| 路由 | `react-router` 8 + `@react-router/dev` | framework mode，`ssr: false` |
| 构建 | Vite 8 + TypeScript | `~/*` → `./app/*`（`tsconfig.json` paths） |
| UI | `@arco-design/web-react` + `@arco-themes/react-console` | 主题由 `@arco-plugins/vite-react` 注入 |
| 样式 | Stylus（CSS Modules）+ Tailwind CSS 4 | 页面样式就近 `style.module.styl`；Less 供 Arco 主题编译 |
| 状态 | Zustand 5 + `@tanstack/react-query` 5 | 客户端状态 / 服务端状态分开 |
| 请求 | axios | `app/commons/request.ts` 统一封装拦截 |
| i18n | i18next + react-i18next | zh-CN / en-US |
| 图表 | `@ant-design/charts` | |
| Mock | `vite-plugin-mock-data` | `mock/` 目录 + axios adapter |
| 质量 | oxlint / oxfmt | `.oxlintrc.json` / `.oxfmtrc.json`（本项目不用 eslint） |

## 环境要求

- **Node.js 24**（`Dockerfile` 基础镜像为 `node:24-alpine`，本地建议同版本大版本）
- **pnpm**；`pnpm-workspace.yaml` 设了 `lockfile: false`，仓库**不提交 lock 文件**
- `.npmrc` 指向华为云 npm 镜像，需要换源改这里

## 快速开始

```bash
pnpm install
pnpm dev          # http://localhost:5173，端口以终端输出为准
```

登录密码统一为 `admin`：账号填 `user` 是普通权限（所有资源仅 `read`），其他任意账号为 admin 全量权限（`mock/user.ts`）。`/` 会重定向到 `/dashboard/workplace`，未登录统一跳 `/login`。

生产预览：

```bash
pnpm build && pnpm start   # react-router-serve，默认 3000，可用 PORT 指定
```

> `pnpm start` 读的是 `build/` 产物，**任何源码改动都要重新 `pnpm build` 才生效**；开发期用 `pnpm dev` 热更新。

## 脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 开发服务器（HMR） |
| `pnpm build` | 生产构建，产出 `build/client` + `build/server` |
| `pnpm start` | 运行生产构建 |
| `pnpm typecheck` | `react-router typegen` + `tsc` |
| `pnpm lint` | oxlint |
| `pnpm format` / `pnpm format:check` | oxfmt 格式化 / 检查 |
| `pnpm deps` | 删除 `node_modules` 后重装（会清空依赖目录，谨慎） |

## 目录结构

```
app/
├── api/                    # 纯请求函数（不含 hooks），按业务分文件
├── commons/                # request(axios封装) / auth(权限判定) / layout(菜单过滤·trail)
│                          # html(主题·语言写 DOM) / queryClient / types
├── components/             # AppProviders / AppMenu / PermissionWrapper / NavigationProgress
│                          # HydrateFallback / ErrorBoundary（两个全局页面各自带 style.styl）
├── config/                 # menu.tsx（菜单+权限单一数据源）/ settings.ts / types.ts
├── hooks/api/              # react-query hooks（useAuth / useUser / useSearchTable / useNotice / useMonitor）
├── layouts/ConsoleLayout/  # HeaderBar / SiderNav / TabBar / BreadcrumbNav / Footer / SettingDrawer
├── locales/                # zh.ts / en.ts + dayjs locale 补丁（勿删，见 vite alias）
├── routes/                 # 页面，目录名与菜单 path 对齐
│   ├── 403/ 404/           # 后台内联 403 / 后台 catch-all 404
│   └── exception/500/      # 菜单里的 500 展示页
├── store/                  # user.ts / layout.ts(useLayoutStore + useSettingsStore) / types.ts / index.ts
├── styles/                 # tailwindcss.css / app.styl（全局 + nprogress 覆盖）
├── i18n.ts                 # 全局 i18next 实例
├── settings.json           # 默认布局设置（抽屉"复制配置"的 JSON 可直接粘回）
├── root.tsx                # Layout / App / clientLoader(rehydrate) / 两个全局组件的薄转发
└── routes.ts               # 由 menu 配置生成的路由表 + 后台 catch-all
mock/                       # vite-plugin-mock-data 接口模拟
public/                     # 静态资源
```

## 核心机制

### 菜单驱动路由

`app/config/menu.tsx` 是唯一数据源，`app/routes.ts` 遍历生成路由表；侧边栏 / 顶部菜单 / 面包屑 / TabBar / 权限过滤全部由它派生。**加页面不需要手写路由。**

| 字段 | 作用 |
|------|------|
| `path` | 路由路径，同时是菜单 / Tab 的 key |
| `name` | i18n key，菜单标题、Tab 标题、面包屑共用 |
| `icon` | 分类节点必填 |
| `children` | 有则为分类，**不生成路由** |
| `view` | 叶子节点页面文件（相对 `app/`），只有它为路由注册提供依据 |
| `visible` | `false` 不进导航 |
| `per` / `perAny` | 所需权限；`perAny: true` 满足其一即可，否则需全部满足 |

`routes.ts` 另外在 `layout()` 下注册 `route('*', 'routes/404/index.tsx')` 作为后台兜底，`index()` 指向首页重定向；`login` / `register` 在布局之外。

### 权限链路

登录 `POST /api/login` 只返回 token → user store 仅持久化 token → `ConsoleLayout` 的 `clientLoader` 用 token 拉 `/user/info` 写回 `user / permissions` → `store/index.ts` 订阅 `permissions` 变化 → `rebuildMenu` 按菜单 `per` 过滤出 `permissionMenu` → 供 `AppMenu`、`findMenuTrail` 使用。组件级用 `<PermissionWrapper per={[...]} backup={...}>`。

判定规则在 `commons/auth.ts`：`per` 缺省恒通过，资源动作 `['*']` 通配（admin），`perAny` 控制「任一 / 全部」。`ConsoleLayout` 里三层守卫：未登录跳 `/login`；用户数据未回填时骨架屏；`menuTrail` 为空时渲染内联 `Exception403`。

### SPA 模式与路由变化监听（重要）

`react-router.config.ts` 是 `ssr: false`，即 SPA Mode。**它与 SSR Framework Mode 的 loader 重验证规则不同**：

| 模式 | GET 导航时 active loader |
|------|--------------------------|
| Framework Mode with SSR | 默认 opt-out，每次导航重新验证 |
| SPA Mode / Data Mode | 默认 opt-in，仅动态 params / search 变化或自定义 `shouldRevalidate` 才重跑 |

因此无 path 的 `layout()` 父路由 `clientLoader` 只在首屏 hydration 跑一次，**不能当路由变化监听用**。本项目在 `ConsoleLayout` 导出 `clientMiddleware`（数组导出），每次客户端导航都执行：

- 在 `await next()` **之后**调 `setCurrentHref(request.url)`，驱动 `menuTrail / tabs / activeKey`、面包屑与 403 判断；
- 放在 `next()` 之后是为了等 `clientLoader` 的登录态自助与 `rebuildMenu` 完成，避免 `permissionMenu` 为空导致首帧误判 403；整个动作仍在组件渲染之前；
- `request.url` 是绝对地址，正好匹配 store 里的 `new URL(v)`；
- 挂在 `layout()` 上覆盖所有后台子路由，`login` / `register` 在布局外不受影响。

不要在 `ConsoleLayout` 里用 `useLocation` + `useEffect` 做这件事：布局组件订阅 router state 后，叠加 store 更新会造成重复渲染。

### 状态分层

- 跨页面共享态（用户 / 主题 / 菜单 / tabs / 布局设置）进 Zustand；页面级服务端数据用 react-query（`api/` 写纯函数，`hooks/api/` 写 hook）。
- `useSettingsStore` 配 `skipHydration: true`，由 `root.tsx` 的 `clientLoader` 调 `persist.rehydrate()` 一次性还原，保证主题 / 语言的 DOM 副作用在首屏渲染前就绪。
- `useUserStore` 用 `partialize` 只持久化 token，用户资料与权限刷新后靠 `clientLoader` 补拉，避免落地脏数据。

### 布局与滚动

- 根 `.layout` = `100vh` + `overflow: hidden`，整页不滚；中间横行 `min-height: 0`；右侧 `layout-content-wrapper` 是**唯一滚动容器**；左侧 Sider 框架固定，菜单只在 `.menu-wrapper` 内滚。左右两个独立滚动域，顶栏与左栏框架不随内容滚动。
- 显隐用根容器状态类（`classnames` 拼 `hide-navbar / hide-sider / hide-footer`）+ 高特异性后代选择器控制，**组件常驻不卸载**，保留菜单展开态 / 折叠态等局部状态；高特异性用于对抗 Arco CSS chunk 加载顺序反转时覆盖业务样式。
- 折叠把手贴在 Sider 右缘凸出（梯形 `clip-path`），`IconLeft` 常驻、`is-collapsed` 时旋转 180°，纯样式切换方向。

### 加载页 / 错误页

| 场景 | 组件 | 说明 |
|------|------|------|
| 首屏 hydration | `components/HydrateFallback` | 科技感 SVG 动画，跟随系统明暗，支持 `prefers-reduced-motion` |
| 根级错误 / 布局外路径 | `components/ErrorBoundary` | 全屏分栏设计，按状态码分派 404 / 403 / 500；异常摘要常驻，DEV 堆栈放限高自滚动面板；单独包一层 `AppProviders`，按钮用原生 `href="/"` 不依赖 Router context |
| 后台未知 URL | `routes/404` | `route('*')` 挂在 layout 下，保留顶栏侧栏，Arco `Result` + 两个 i18n 按钮 |
| 已登录但无权限 | `routes/403` | `ConsoleLayout` 内联（`menuTrail` 为空） |
| 500 展示页 | `routes/exception/500` | 菜单 `/exception/500` |

> **root 导出坑**：`HydrateFallback` / `ErrorBoundary` 的实现收在 `app/components/`，但 `root.tsx` 必须保留**本地具名导出**做薄转发（`export const ErrorBoundary = _ErrorBoundary`），不能写成 `export { default as ErrorBoundary } from ...`。框架靠 HOC 注入 props，Vite 只包装路由模块内本地声明的具名导出，纯 re-export 会让 `error` 变成 `undefined`。

### Mock 数据

`mock/*.ts` 导出 `METHOD /api/xxx` → 静态值或函数。`vite.config.ts` 里 `mockData({ routes: './mock', buildMock: true })`，`app/commons/request.ts` 用 `createMockAdapter()` 作为 axios adapter，所以 `request()` 在 dev 与构建产物里都走本地 mock，无需后端。接真实接口时替换 adapter 与 `baseURL` 即可。

- `ssr.noExternal` 含 `virtual:mock-routes`：该虚拟模块由插件注入。若把 `ssr` 改回 `true`，必须保证它不被 externalize，否则 Node ESM 报 `Received protocol 'virtual:'`。
- `resolve.alias` 把 dayjs 的 `en` / `zh-cn` locale 指向 `app/locales/dayjs-locale-*.ts` 补丁，**勿删**。

### i18n

`app/i18n.ts` 全局初始化，resources 来自扁平 key 的 `locales/zh.ts` / `en.ts`。所有可见文案走 `t()`，**禁止硬编码中英文**；菜单 `name`、Tab `title` 存的都是 key。新增文案两个语言文件同步补。语言切换由 settings store + `commons/html.ts` 写 DOM，Arco 组件 locale 由 `AppProviders` 的 `ConfigProvider` 提供。

### 导航进度条

`NavigationProgress` 用 `useNavigation()` + nprogress，`app.styl` 把进度条颜色改为主色变量 `rgb(var(--primary-6))`。组件**卸载时显式 `NProgress.done()`**：导航抛错时 state 不会回到 idle，错误边界接管又会卸载本组件，nprogress 挂在全局 DOM 上的递归 trickle 定时器不收会一直涨。

## 配置说明

| 文件 | 作用 |
|------|------|
| `react-router.config.ts` | `ssr: false`（SPA Mode） |
| `app/settings.json` | 默认 `navbar / menu / footer / colorWeak / themeColor / menuWidth / navMode`；抽屉里改动写入 zustand persist |
| `vite.config.ts` | mock / Arco 主题 / tailwind / reactRouter / devtoolsJson 插件，`ssr.noExternal` 与 dayjs alias |
| `tsconfig.json` | `~/*` → `./app/*`，`strict: true` |
| `.oxlintrc.json` / `.oxfmtrc.json` | lint / 格式规则；`.vscode/settings.json` 配了保存时自动 fix（`source.fixAll.oxc`） |
| `.npmrc` / `pnpm-workspace.yaml` | 镜像源 / 不生成 lock 文件 |

## 部署

```bash
pnpm build          # build/client + build/server
pnpm start          # react-router-serve ./build/server/index.js
```

`Dockerfile` 是脚手架自带的多阶段构建（`node:24-alpine`），但内部用的是 `npm ci`。仓库刻意不提交 lock 文件，**直接 `docker build` 会因缺少 `package-lock.json` 失败**；两种处理：先生成并提交 `package-lock.json`，或把 Dockerfile 的安装步骤改成 `pnpm install`（配合 corepack）。若交给纯静态托管，只发布 `build/client` 并把未知路径回退到 `index.html`。

## 新增页面 SOP

1. `app/config/menu.tsx` 加叶子项（`path / name / view / per`）；分类只做分组，不写 `view`
2. `app/routes/<path>/index.tsx` 写页面；样式放同目录 `style.module.styl`，类型抽 `types.ts`
3. `app/locales/zh.ts` + `en.ts` 同步补文案
4. `mock/` 加接口 → `app/api/` 加请求函数 → `app/hooks/api/` 加 query hook
5. `pnpm typecheck && pnpm lint && pnpm format:check`
6. dev 验证布局 / i18n / 控制台无报错；要验 `pnpm start` 必须先 `pnpm build`

## 开发约定与避坑清单

| 场景 | 约定 |
|------|------|
| 监听路由变化 | 用 `clientMiddleware`，不要用 `clientLoader` 或布局组件的 `useLocation` |
| SSR 开关 | 改 `ssr: true` 前先处理 `virtual:mock-routes` 的 `noExternal`，并重新确认重验证规则 |
| Stylus 变量 | `calc()` 内嵌变量必须用插值（`min-height 'calc(100vh - %s)' % $nav-size-height`），直接写 `$var` 会原样输出；当前各异常页已统一用字面量 `calc(100vh - 168px)` 规避 |
| 覆盖 Arco 样式 | 用 `.layout.hide-x :global(.arco-...)` 抬特异性，不要依赖 import / chunk 加载顺序 |
| 类型定义 | `interface` / `type` 一律收进 `types.ts`，实现文件不内联 |
| 组件显隐 | 用状态类切样式，不条件卸载整棵 Layout 子树 |
| 文案 | 全走 `t()`，zh / en 同步 |
| 构建产物 | `npm start` 读 `build/`，改代码后必须重新构建 |
| 依赖版本 | 不要随意升降 `package.json` 中的版本 |
