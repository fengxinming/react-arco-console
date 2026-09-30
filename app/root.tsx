import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import AppProviders from '~/components/AppProviders';
import NavigationProgress from '~/components/NavigationProgress';
import AppEffects from './components/AppEffects';
import './global.css';
import './app.styl';
import { useSettingsStore, useUserStore } from './store';
import { setColorWeak, setLang, setTheme, setThemeColor } from './commons/html';
import { fetchUser } from '~/api/user';

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
    </html>
  );
}

export async function clientLoader() {
  useSettingsStore.persist.onHydrate(({ theme, colorWeak, themeColor, lang }) => {
    setTheme(theme);
    setColorWeak(colorWeak);
    setThemeColor(themeColor, theme);
    setLang(lang);
  });
  // 还原 localstorage 中的配置
  useSettingsStore.persist.rehydrate();

  // 登录态自助：token 存在且 store 尚无用户数据，则拉取一次写回 store；
  // 后续渲染全部从 store 读取，避免刷新/路由切换重复请求 /user/info。
  const { token, user, setUser } = useUserStore.getState();
  if (token && !user) {
    const full = await fetchUser();
    setUser(full);
  }
}

export default function App() {
  return (
    <AppProviders>
      <NavigationProgress />
      <AppEffects />
      <Outlet />
    </AppProviders>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
