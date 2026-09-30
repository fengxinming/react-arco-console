import { Menu } from '@arco-design/web-react';
import { useLocation, useNavigate } from 'react-router';
import { useLayoutStore } from '~/store';
import type { MenuBranch, MenuLeaf, MenuRoute } from '~/config/types';
import type { AppMenuProps, MenuMode } from './types';
import i18n from '~/i18n';

function renderNodes(list: MenuRoute[], mode: MenuMode): React.ReactNode {
  return list.map((item) => {
    if (item.visible === false) {
      return null;
    }
    const titleDom = (
      <>
        {mode === 'vertical' && (item.icon ?? <span className="w-[12px] h-[18px] inline-block" />)}
        <span>{i18n.t(item.name)}</span>
      </>
    );

    const { children } = item as MenuBranch;
    if (children) {
      return (
        <Menu.SubMenu key={item.name} title={titleDom}>
          {renderNodes(children, mode)}
        </Menu.SubMenu>
      );
    }
    const { path } = item as MenuLeaf;
    return <Menu.Item key={path}>{titleDom}</Menu.Item>;
  });
}

/**
 * 公共菜单组件，SiderNav（vertical）和 HeaderBar/Logo（horizontal）共用。
 * 统一递归渲染 + i18n + icon，避免两处逻辑漂移。
 */
export default function AppMenu({
  mode = 'vertical',
  collapse,
  openKeys,
  onOpenKeysChange,
  className,
  menus: externalMenus,
}: AppMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const permissionMenus = useLayoutStore((s) => s.permissionMenu);
  const menus = externalMenus ?? permissionMenus;

  return (
    <Menu
      className={className}
      mode={mode}
      collapse={collapse}
      selectedKeys={[location.pathname]}
      openKeys={openKeys}
      onClickMenuItem={(k) => navigate(k)}
      onClickSubMenu={(_, keys) => onOpenKeysChange?.(keys)}
    >
      {renderNodes(menus, mode)}
    </Menu>
  );
}
