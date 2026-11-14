import { index, route, layout } from '@react-router/dev/routes';
import type { RouteConfig, RouteConfigEntry } from '@react-router/dev/routes';
import { menuRoutes } from './config/menu';
import type { MenuBranch, MenuLeaf, MenuRoute } from './config/types';

function buildMenuRoutes(menus: MenuRoute[], routes: RouteConfigEntry[]): RouteConfigEntry[] {
  for (const menu of menus) {
    const { children } = menu as MenuBranch;
    if (!children) {
      const { path, view } = menu as MenuLeaf;
      if (view) {
        routes.push(route(path.slice(1), view));
      }
      continue;
    }
    buildMenuRoutes(children, routes);
  }
  return routes;
}

export default [
  route('login', 'routes/login/index.tsx'),
  route('register', 'routes/register/index.tsx'),
  index('routes/home/index.tsx'),
  layout(
    'layouts/ConsoleLayout/index.tsx',
    buildMenuRoutes(menuRoutes, [route('*', 'routes/404/index.tsx')]),
  ),
] satisfies RouteConfig;
