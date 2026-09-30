import { menuRoutes } from '~/config/menu';
import type { MenuBranch, MenuLeaf, MenuRoute } from '~/config/types';
import auth from './auth';
import type { PermMap } from './types';

// 按用户权限过滤菜单：无 per 的恒可见；有则交给 authentication 判定。
// 父级 branch 过滤后若无可见子项则整体隐藏。
export function filterMenuByPerm(menus: MenuRoute[], permissions: PermMap = {}): MenuRoute[] {
  const result: MenuRoute[] = [];
  for (const item of menus) {
    const { per, perAny } = item;
    if (per && !auth({ per, perAny }, permissions)) {
      continue;
    }
    const { children } = item as MenuBranch;
    if (children) {
      const filteredChildren = filterMenuByPerm(children, permissions);
      if (filteredChildren.length) {
        result.push({ ...item, children: filteredChildren } as MenuBranch);
      }
    } else {
      result.push(item);
    }
  }
  return result;
}

// 从菜单树中查找当前路径对应的菜单链路（从根到叶子），用于 TabBar / 面包屑 / SiderNav 展开。
export function findMenuTrail(pathname: string, menus: MenuRoute[] = menuRoutes) {
  const trail: MenuRoute[] = [];
  const walk = (list: MenuRoute[], ancestors: MenuRoute[]): boolean => {
    for (const r of list) {
      const { path } = r as MenuLeaf;
      if (path === pathname) {
        trail.push(...ancestors, r);
        return true;
      }
      const { children } = r as MenuBranch;
      if (children && walk(children, ancestors.concat(r))) {
        return true;
      }
    }
    return false;
  };
  walk(menus, []);
  return trail;
}
