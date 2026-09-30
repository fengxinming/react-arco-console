import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LayoutUiState, NavMode, SettingsState, TabsState } from './types';
import type { PermMap } from '~/commons/types';
import { menuRoutes } from '~/config/menu';
import { filterMenuByPerm } from '~/commons/layout';
// 默认配置来自 settings.json，与 react-pro.arco.design 一致：
// 抽屉里"复制配置"得到的 JSON 可直接粘回本文件，从而真正作用于项目。
import defaultSettings from '../settings.json';

export const useLayoutStore = create<LayoutUiState>((set) => ({
  collapsed: false,
  settingOpen: false,
  menuTrail: [],
  // 初始为空：菜单仅由 rebuildMenu 在「获取/变更权限」后填充，不在无权限时预先计算
  permissionMenu: [],

  setCollapsed: (v) => set({ collapsed: v }),
  toggleCollapsed: () => set((s) => ({ collapsed: !s.collapsed })),
  openSetting: () => set({ settingOpen: true }),
  closeSetting: () => set({ settingOpen: false }),
  setMenuTrail: (v) => set({ menuTrail: v }),
  // 获取/变更权限后重算可用菜单，避免每渲染 useMemo
  rebuildMenu: (permissions: PermMap) =>
    set({ permissionMenu: filterMenuByPerm(menuRoutes, permissions) }),
}));

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      themeColor: defaultSettings.themeColor,
      colorWeak: defaultSettings.colorWeak,
      navbar: defaultSettings.navbar,
      menuWidth: defaultSettings.menuWidth,
      footer: defaultSettings.footer,
      menu: defaultSettings.menu,
      navMode: defaultSettings.navMode as NavMode,
      theme: 'light',
      lang: 'zh-CN',
      setSettings: (partial) => set(partial),
      toggleDark: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'react-arco-console-settings',
      // Avoid accessing `localStorage` during SSR prerender (SPA mode still
      // server-renders `/` to emit index.html). Hydration happens on the client.
      skipHydration: true,
    },
  ),
);

const HOME = '/dashboard/workplace';

export const useTabsStore = create<TabsState>((set, get) => ({
  tabs: [{ key: HOME, title: 'menu.dashboard.workplace', closable: false }],
  activeKey: HOME,

  // 设置活跃 tab:不在列表就加进去,返回 key
  setActive: (key) => {
    const s = get();
    if (key === s.activeKey) {
      return false;
    }
    set({ activeKey: key });
    return true;
  },

  addTab: (key: string, title: string) => {
    set((s) => {
      const exists = s.tabs.some((t) => t.key === key);
      const tabs = exists ? s.tabs : s.tabs.concat({ key, title });
      return { tabs, activeKey: key };
    });
  },

  // 删除 tab:删的是当前页就直接算下一个活跃(右边补上/否则左边/否则 HOME),返回新 activeKey
  removeTab: (key) => {
    const s = get();
    const idx = s.tabs.findIndex((t) => t.key === key);
    if (idx === -1) {
      return s.activeKey;
    }
    const tabs = s.tabs.filter((t) => t.key !== key);
    const activeKey =
      s.activeKey === key ? (tabs[idx]?.key ?? tabs[idx - 1]?.key ?? HOME) : s.activeKey;
    set({ tabs, activeKey });
    return activeKey;
  },
}));
