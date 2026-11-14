import { Outlet, type MiddlewareFunction } from 'react-router';
import { Navigate } from 'react-router';
import { Layout, Skeleton } from '@arco-design/web-react';
import cs from 'classnames';
import HeaderBar from './HeaderBar';
import SiderNav from './SiderNav';
import BreadcrumbNav from './BreadcrumbNav';
import TabBar from './TabBar';
import Footer from './Footer';
import SettingDrawer from './SettingDrawer';
import { useSettingsStore, useLayoutStore, useUserStore } from '~/store';
import Exception403 from '~/routes/403';
import styles from './style.module.styl';
import { fetchUser } from '~/api/user';

export async function clientLoader() {
  // 登录态自助：token 存在且 store 尚无用户数据，则拉取一次写回 store；
  // 后续渲染全部从 store 读取，避免刷新/路由切换重复请求 /user/info。
  const { token, user, setUser } = useUserStore.getState();
  if (token && !user) {
    const full = await fetchUser();
    setUser(full);
  }
  // return Promise.reject(new Error('错误'));
  return null;
}

// 路由变化同步放在客户端导航中间件里：它在 dataStrategy 阶段执行，
// 早于 completeNavigation / 组件渲染，布局组件不必订阅 location 而反复重渲染。
// 等 next() 返回后再写，确保 clientLoader 的登录态自助与 permissionMenu 重算已完成。
export const clientMiddleware: MiddlewareFunction[] = [
  async ({ request }, next) => {
    await next();
    useLayoutStore.getState().setCurrentHref(request.url);
  },
];

export default function ConsoleLayout() {
  const token = useUserStore((s) => s.token);
  const user = useUserStore((s) => s.user);
  const navMode = useSettingsStore((s) => s.navMode);
  const showNavbar = useSettingsStore((s) => s.navbar);
  const menu = useSettingsStore((s) => s.menu);
  const footer = useSettingsStore((s) => s.footer);
  const settingOpen = useLayoutStore((s) => s.settingOpen);
  const closeSetting = useLayoutStore((s) => s.closeSetting);
  const menuTrail = useLayoutStore((s) => s.menuTrail);

  // 鉴权守卫：未登录统一跳转登录页（login/register 在本布局之外，不会形成回环）
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 登录后刷新：用户数据写回 store 前显示骨架屏，完成后渲染（无二次渲染跳变）
  if (!user) {
    return (
      <Layout className={styles.layout}>
        <Layout.Content style={{ padding: 24 }}>
          <Skeleton animation className="min-h-screen" />
        </Layout.Content>
      </Layout>
    );
  }

  // 权限守卫：menuTrail 为空说明当前路径不在有权限的菜单内，渲染 403
  const hasAccess = menuTrail.length > 0;

  const showMenu = navMode === 'inline' && menu;

  // 显示开关不再决定组件是否挂载，统一由根容器的状态类驱动 CSS 显隐。
  // 组件常驻可避免切换设置时卸载/重建整棵子树，保留 Sider 的菜单展开态、
  // 折叠态以及顶栏各入口的局部状态；隐藏元素不生成盒子，无需再做 padding 补偿。
  const layoutClassName = cs(
    styles.layout,
    !showNavbar && styles['hide-navbar'],
    !showMenu && styles['hide-sider'],
    !footer && styles['hide-footer'],
  );

  return (
    <Layout className={layoutClassName}>
      <Layout.Header className={styles['layout-navbar']}>
        <HeaderBar />
      </Layout.Header>
      <Layout hasSider className={styles['layout-body']}>
        <SiderNav />
        <Layout className={styles['layout-content']}>
          <Layout.Content className={styles['layout-content-wrapper']}>
            <TabBar />
            <BreadcrumbNav />
            {hasAccess ? <Outlet /> : <Exception403 />}
          </Layout.Content>
          <Footer />
        </Layout>
      </Layout>
      <SettingDrawer visible={settingOpen} onClose={closeSetting} />
    </Layout>
  );
}
