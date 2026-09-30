import {
  IconDashboard,
  IconList,
  IconEdit,
  IconUser,
  IconBug,
  IconApps,
  IconFile,
  IconSettings,
} from '@arco-design/web-react/icon';
import type { MenuRoute } from './types';

export const menuRoutes: MenuRoute[] = [
  {
    path: '/dashboard',
    name: 'menu.dashboard',
    icon: <IconDashboard />,
    children: [
      {
        path: '/dashboard/workplace',
        name: 'menu.dashboard.workplace',
        view: 'routes/dashboard/workplace/index.tsx',
      },
      {
        path: '/dashboard/monitor',
        name: 'menu.dashboard.monitor',
        view: 'routes/dashboard/monitor/index.tsx',
        per: [{ resource: 'menu.dashboard.monitor', actions: ['write'] }],
      },
    ],
  },
  {
    path: '/visualization',
    name: 'menu.visualization',
    icon: <IconApps />,
    children: [
      {
        path: '/visualization/data-analysis',
        name: 'menu.visualization.dataAnalysis',
        view: 'routes/visualization/data-analysis/index.tsx',
        per: [{ resource: 'menu.visualization.dataAnalysis', actions: ['read'] }],
      },
      {
        path: '/visualization/multi-dimension-data-analysis',
        name: 'menu.visualization.multiDimensionDataAnalysis',
        view: 'routes/visualization/multi-dimension/index.tsx',
        per: [
          { resource: 'menu.visualization.dataAnalysis', actions: ['read', 'write'] },
          { resource: 'menu.visualization.multiDimensionDataAnalysis', actions: ['write'] },
        ],
      },
    ],
  },
  {
    path: '/list',
    name: 'menu.list',
    icon: <IconList />,
    children: [
      {
        path: '/list/search-table',
        name: 'menu.list.searchTable',
        view: 'routes/list/search-table/index.tsx',
      },
      { path: '/list/card', name: 'menu.list.cardList', view: 'routes/list/card/index.tsx' },
    ],
  },
  {
    path: '/form',
    name: 'menu.form',
    icon: <IconEdit />,
    children: [
      {
        path: '/form/group',
        name: 'menu.form.group',
        view: 'routes/form/group/index.tsx',
        per: [{ resource: 'menu.form.group', actions: ['read', 'write'] }],
      },
      {
        path: '/form/step',
        name: 'menu.form.step',
        view: 'routes/form/step/index.tsx',
        per: [{ resource: 'menu.form.step', actions: ['read'] }],
      },
    ],
  },
  {
    path: '/profile',
    name: 'menu.profile',
    icon: <IconUser />,
    children: [
      {
        path: '/profile/basic',
        name: 'menu.profile.basic',
        view: 'routes/profile/basic/index.tsx',
      },
    ],
  },
  {
    path: '/result',
    name: 'menu.result',
    icon: <IconFile />,
    children: [
      {
        path: '/result/success',
        name: 'menu.result.success',
        view: 'routes/result/success/index.tsx',
      },
      { path: '/result/error', name: 'menu.result.error', view: 'routes/result/error/index.tsx' },
    ],
  },
  {
    path: '/exception',
    name: 'menu.exception',
    icon: <IconBug />,

    children: [
      {
        path: '/exception/403',
        name: 'menu.exception.403',
        view: 'routes/exception/403/index.tsx',
      },
      {
        path: '/exception/404',
        name: 'menu.exception.404',
        view: 'routes/exception/404/index.tsx',
      },
      {
        path: '/exception/500',
        name: 'menu.exception.500',
        view: 'routes/exception/500/index.tsx',
      },
    ],
  },
  {
    path: '/user',
    name: 'menu.user',
    icon: <IconSettings />,
    children: [
      { path: '/user/info', name: 'menu.user.info', view: 'routes/user/info/index.tsx' },
      { path: '/user/setting', name: 'menu.user.setting', view: 'routes/user/setting/index.tsx' },
    ],
  },
];
