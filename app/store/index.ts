import { setColorWeak, setLang, setTheme, setThemeColor } from '~/commons/html';
import { useUserStore } from './user';
import { useLayoutStore, useSettingsStore } from './layout';

export * from './user';
export * from './layout';
export * from './types';

useSettingsStore.subscribe(({ theme, colorWeak, themeColor, lang }, prevState) => {
  if (theme !== prevState.theme) {
    setTheme(theme);
    setThemeColor(themeColor, theme);
  }

  if (themeColor !== prevState.themeColor) {
    setThemeColor(themeColor, theme);
  }

  if (colorWeak !== prevState.colorWeak) {
    setColorWeak(colorWeak);
  }

  if (lang !== prevState.lang) {
    setLang(lang);
  }
});

// 权限变化 → 重建可用菜单。user store 不再直接调 layout store，跨 store 副作用集中在此订阅；
// 引用比较确保 setToken 等未动 permissions 的 set 不会触发重算。
useUserStore.subscribe(({ permissions }, prev) => {
  if (permissions !== prev.permissions) {
    useLayoutStore.getState().rebuildMenu(permissions);
  }
});
