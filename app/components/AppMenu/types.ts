import type { MenuRoute } from '~/config/types';

export type MenuMode = 'vertical' | 'horizontal' | 'pop' | 'popButton';

export interface AppMenuProps {
  /** 排列模式：vertical=侧边，horizontal=顶部 */
  mode?: MenuMode;
  /** 折叠状态（vertical 模式） */
  collapse?: boolean;
  /** 展开的子菜单 key（vertical 模式） */
  openKeys?: string[];
  /** 展开子菜单回调 */
  onOpenKeysChange?: (keys: string[]) => void;
  className?: string;
  /** 菜单数据源，缺省用 layout store 的 permissionMenu（按权限过滤后） */
  menus?: MenuRoute[];
}
