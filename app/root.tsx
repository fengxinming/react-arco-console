import './styles/tailwindcss.css';
import './styles/app.styl';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import type { Route } from './+types/root';
import AppProviders from '~/components/AppProviders';
import _ErrorBoundary from '~/components/ErrorBoundary';
import _HydrateFallback from '~/components/HydrateFallback';
import NavigationProgress from '~/components/NavigationProgress';
import { useLayoutEffect } from 'react';
import { useSettingsStore } from './store';

// 组件实现收在公共组件目录；这里保持本地具名导出，框架的 props 注入 HOC 才能生效。
export const HydrateFallback = _HydrateFallback;

export const ErrorBoundary = _ErrorBoundary;

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    useSettingsStore.persist.rehydrate();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
      {/* <Test /> */}
    </html>
  );
}

export default function App() {
  return (
    <AppProviders>
      <NavigationProgress />
      <Outlet />
    </AppProviders>
  );
}
